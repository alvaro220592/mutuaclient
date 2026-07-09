<template>
    <q-page class="flex flex-center q-pa-md">

        <div class="box">

            <TituloPagina titulo="Meu perfil" descricao="Suas informações de conta" />

            <!-- FORM -->
            <div class="column q-gutter-md">

                <q-input outlined v-model="nome" label="Nome" />

                <q-input outlined v-model="telefone" label="Telefone" mask="(##) #####-####" />

                <q-input outlined v-model="cep" label="CEP" mask="#####-###" @update:model-value="onCepChange" />

                <q-input outlined v-model="logradouro" label="Logradouro" />

                <q-input outlined v-model="num_endereco" ref="campoNumero" label="Número" type="number" min="0" />

                <q-input outlined v-model="complemento" label="Complemento" />

                <q-input outlined v-model="cidade" label="Cidade" />

                <q-input outlined v-model="uf" label="Estado" />

                <!-- Separador -->
                <div class="row items-center">
                    <div class="col"><q-separator /></div>
                    <div class="q-px-sm text-caption text-grey-6">Se quiser mudar sua senha</div>
                    <div class="col"><q-separator /></div>
                </div>

                <q-input outlined v-model="novaSenha" label="Nova senha" type="password" />

                <q-input outlined v-model="confirmacaoSenha" label="Confirmar nova senha" type="password" />

                <q-btn color="primary" label="Salvar alterações" @click.prevent="salvar" :loading="carregando"
                    :disable="carregando" />

                <q-btn color="negative" label="Excluir minha conta" @click="excluirConta" />
            </div>
        </div>

    </q-page>
</template>

<style scoped></style>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { metodoDelete, post } from 'src/services/http'
import { dadosUsuario } from 'src/services/info-usuario'
import TituloPagina from 'src/components/TituloPagina.vue'
import { armazenarToken } from 'src/services/storage'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const $q = useQuasar()

const carregando = ref(false)
const campoNumero = ref(null)

const user = authStore.user
const end = user?.endereco
const tel = user?.telefone

const nome = ref(user?.name ?? '')
const telefone = ref(tel?.telefone ?? '')

const cep = ref(end?.cep ?? '')
const logradouro = ref(end?.logradouro ?? '')
const num_endereco = ref(end?.numero ?? '')
const complemento = ref(end?.complemento ?? '')
const cidade = ref(end?.cidade ?? '')
const uf = ref(end?.uf ?? '')

const novaSenha = ref('')
const confirmacaoSenha = ref('')

onMounted(() => {
    info()
})

const onCepChange = (valor) => {
    if (valor.length === 9) {
        buscaCep()
    }
}

const info = async () => {
    carregando.value = true

    try {
        const url = '/user/info-perfil'

        const dados = await dadosUsuario(url)

        nome.value = dados.usuario?.name
        telefone.value = dados.usuario.telefone?.telefone
        cep.value = dados.usuario.endereco?.cep
        logradouro.value = dados.usuario.endereco?.logradouro
        num_endereco.value = dados.usuario.endereco?.numero
        complemento.value = dados.usuario.endereco?.complemento
        cidade.value = dados.usuario.endereco?.cidade
        uf.value = dados.usuario.endereco?.uf

    } catch (err) {

        let mensagem = err.message || 'Erro inesperado'

        if (err.status === 422 && err.data?.errors) {
            mensagem = Object.values(err.data.errors)
                .flat()
                .join('\n')
        }

        $q.notify({
            type: 'negative',
            message: mensagem,
            position: 'top-right'
        })

    } finally {
        carregando.value = false
    }
}

const salvar = async () => {
    carregando.value = true

    try {
        const url = '/user/update'

        const body = {
            nome: nome.value,
            telefone: telefone.value,
            cep: cep.value,
            logradouro: logradouro.value,
            num_endereco: num_endereco.value,
            complemento: complemento.value,
            cidade: cidade.value,
            uf: uf.value,
            password: novaSenha.value,
            password_confirmation: confirmacaoSenha.value,
        }

        await post(url, body, true)

        /*
            aqui o usuário é redirecionado se tiver na seguinte situação:
            Foi entrar em alguma página que exigia informações
                de perfilque ainda não estavam cadastradas
            Então foi mandado pra esse formulário aqui para
                completar suas informações mas a rota que ele
                queria acessar fica salva na 'query' pra ele 
                não precisar fazer o caminho todo de volta pra lá quando salvar aqui
        */
        if (route.query.returnTo) {
            router.replace(route.query.returnTo)
        }

        else {
            router.replace({ name: 'home' })
            $q.notify({
                type: 'positive',
                message: 'Perfil atualizado com sucesso',
                position: 'top-right'
            })
        }


    } catch (err) {

        let mensagem = err.message || 'Erro inesperado'

        if (err.status === 422 && err.data?.errors) {
            mensagem = Object.values(err.data.errors)
                .flat()
                .join('\n')
        }

        $q.notify({
            type: 'negative',
            message: mensagem,
            position: 'top-right'
        })

    } finally {
        carregando.value = false
    }
}

const buscaCep = async () => {
    const req = await fetch(`http://viacep.com.br/ws/${cep.value}/json/`)
    const res = await req.json()

    logradouro.value = res.logradouro
    cidade.value = res.localidade
    uf.value = res.uf

    campoNumero.value.focus()
}

const excluirConta = () => {
    $q.dialog({
        title: 'Excluir conta',
        message: 'Esta ação não poderá ser desfeita.<br>Todas as suas doações, dados pessoais e histórico serão removidos permanentemente.',
        html: true,
        persistent: true,
        cancel: {
            label: 'Cancelar',
            flat: true
        },
        ok: {
            label: 'Excluir',
            color: 'negative'
        }
    }).onOk(async function () {
        try {
            const url = '/user/excluir-conta'

            await metodoDelete(url, true)

            await armazenarToken(null)

            authStore.setAuth(null, null)

            router.replace({ name: 'login' })

            $q.notify({
                type: 'positive',
                message: 'Conta excluída com sucesso',
                position: 'top-right'
            })
        }
        catch (erro) {
            $q.notify({
                type: 'negative',
                message: erro.message,
                position: 'top-right'
            })
        }
    })
}
</script>
