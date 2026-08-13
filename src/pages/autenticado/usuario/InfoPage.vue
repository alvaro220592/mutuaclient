<template>
    <div>
        <TituloPagina titulo="Meu perfil" descricao="Suas informações de conta" />

        <!-- FORM -->
        <div class="column q-gutter-md">

            <q-input outlined v-model="nome" label="Nome" />

            <q-input outlined v-model="telefone" label="Telefone" mask="(##) #####-####" />

            <SeparadorHorizontalComDescricao detalhes="Região"
                descricao="Informe o CEP para identificar sua região. Apenas bairro, cidade e estado serão salvos." />

            <q-input outlined v-model="cep" ref="campoCep" label="CEP" mask="#####-###" inputmode="numeric"
                @update:model-value="onCepChange">
                <template v-slot:append v-if="cep">
                    <q-icon name="close" @click="limparCampoCep" />
                </template>
            </q-input>

            <q-card v-if="mostrarRegiao" class="q-pa-sm" flat style="border: 2px dashed #ccc">
                <div class="text-caption">
                    <q-icon name="location_on" color="red" />
                    Sua região
                </div>

                <div>
                    {{ bairro }}, {{ cidade }}/{{ uf }}
                </div>
            </q-card>

            <SeparadorHorizontal detalhes="Se quiser mudar sua senha" />

            <q-input v-model="novaSenha" label="Nova senha" outlined :type="campoTipoSenhaSenha ? 'password' : 'text'">
                <template v-slot:append>
                    <q-icon :name="campoTipoSenhaSenha ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                        @click="campoTipoSenhaSenha = !campoTipoSenhaSenha" />
                </template>
            </q-input>

            <q-input v-model="confirmacaoSenha" label="Confirmar nova senha" outlined
                :type="campoTipoSenhaConfirmacaoSenha ? 'password' : 'text'">
                <template v-slot:append>
                    <q-icon :name="campoTipoSenhaConfirmacaoSenha ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="campoTipoSenhaConfirmacaoSenha = !campoTipoSenhaConfirmacaoSenha" />
                </template>
            </q-input>

            <q-btn class="botao-primario" label="Salvar alterações" @click.prevent="salvar" />

            <q-btn outline label="Cancelar" :to="{ name: 'home' }" />

            <SeparadorHorizontal detalhes="ou" />

            <q-btn color="negative" icon="error_outline" label="Excluir minha conta" @click="excluirConta" />
        </div>
    </div>

</template>

<style scoped></style>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { get, metodoDelete, post } from 'src/services/http'
import { dadosUsuario } from 'src/services/info-usuario'
import TituloPagina from 'src/components/TituloPagina.vue'
import { armazenarToken } from 'src/services/storage'
import SeparadorHorizontal from 'src/components/SeparadorHorizontal.vue'
import SeparadorHorizontalComDescricao from 'src/components/SeparadorHorizontalComDescricao.vue'
import { notificarErro, notificarSucesso } from 'src/utils/notificacao'
import { carregandoBasico, ocultarCarregando } from 'src/utils/carregando'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const $q = useQuasar()

const campoCep = ref(null)
const user = authStore.user
const end = user?.endereco
const tel = user?.telefone

const nome = ref(user?.name ?? '')
const telefone = ref(tel?.telefone ?? '')

const cep = ref(end?.cep ?? '')
const bairro = ref(end?.bairro ?? '')
const cidade = ref(end?.cidade ?? '')
const uf = ref(end?.uf ?? '')

const novaSenha = ref('')
const confirmacaoSenha = ref('')

const campoTipoSenhaSenha = ref(true)
const campoTipoSenhaConfirmacaoSenha = ref(true)

const mostrarRegiao = computed(() => {
    return cidade.value && bairro.value && uf.value
})

onMounted(async () => {
    await info()
})

const onCepChange = (valor) => {
    if (valor.length === 9) {
        buscarRegiaoPeloCep()
    }
}

const info = async () => {


    try {
        carregandoBasico()

        const url = '/user/info-perfil'

        const dados = await dadosUsuario(url)

        nome.value = dados.usuario?.name
        telefone.value = dados.usuario.telefone?.telefone
        cep.value = dados.usuario.regiao_usuario?.cep
        bairro.value = dados.usuario.regiao_usuario?.bairro
        cidade.value = dados.usuario.regiao_usuario?.cidade
        uf.value = dados.usuario.regiao_usuario?.uf

    } catch (err) {

        let mensagem = err.message || 'Erro inesperado'

        if (err.status === 422 && err.data?.errors) {
            mensagem = Object.values(err.data.errors)
                .flat()
                .join('\n')
        }

        notificarErro(mensagem)

    } finally {
        ocultarCarregando()
    }
}

const salvar = async () => {
    try {
        carregandoBasico()

        const url = '/user/update'

        const body = {
            nome: nome.value,
            telefone: telefone.value,
            cep: cep.value,
            bairro: bairro.value,
            // logradouro: logradouro.value,
            // num_endereco: num_endereco.value,
            // complemento: complemento.value,
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
            notificarSucesso('Atualizado com sucesso')
        }


    } catch (err) {

        let mensagem = err.message || 'Erro inesperado'

        if (err.status === 422 && err.data?.errors) {
            mensagem = Object.values(err.data.errors)
                .flat()
                .join('\n')
        }

        notificarErro(mensagem)

    } finally {
        ocultarCarregando()
    }
}

const buscarRegiaoPeloCep = async () => {
    try {
        carregandoBasico()

        const dados = await get('/buscar-regiao-pelo-cep/' + cep.value)
        cidade.value = dados.localidade
        bairro.value = dados.bairro
        uf.value = dados.uf

    } catch (e) {
        notificarErro(e.message)
    } finally {
        ocultarCarregando()
    }
}

const limparCampoCep = () => {
    cep.value = ''
    cidade.value = ''
    bairro.value = ''
    uf.value = ''
    campoCep.value.focus()
}

const excluirConta = () => {
    $q.dialog({
        title: 'Excluir conta',
        message: 'Esta ação não poderá ser desfeita.<br>Todas as suas doações, dados pessoais e histórico serão removidos permanentemente.',
        html: true,
        persistent: true,
        cancel: {
            label: 'Cancelar',
            outline: true,
            color: 'primary',
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

            notificarSucesso('Conta excluída com sucesso')
        }
        catch (erro) {
            notificarErro(erro.message)
        }
    })
}
</script>
