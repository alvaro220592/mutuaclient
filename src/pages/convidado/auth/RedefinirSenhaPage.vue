<template>
    <div>
        <titulo-pagina titulo="Redefinir senha" descricao="Digite o código de verificação e crie sua nova senha" />

        <!-- FORM -->
        <div class="column q-gutter-md">

            <q-input outlined v-model="email" label="E-mail" type="email" />

            <q-input outlined v-model="codigo_recuperacao" label="Código de 6 dígitos recebido no e-mail" type="tel"
                maxlength="6" />

            <q-input v-model="password" label="Nova senha" outlined :type="campoTipoSenhaSenha ? 'password' : 'text'">
                <template v-slot:append>
                    <q-icon :name="campoTipoSenhaSenha ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                        @click="campoTipoSenhaSenha = !campoTipoSenhaSenha" />
                </template>
            </q-input>

            <q-input v-model="password_confirmation" label="Confirme a nova senha" outlined
                :type="campoTipoSenhaConfirmacaoSenha ? 'password' : 'text'">
                <template v-slot:append>
                    <q-icon :name="campoTipoSenhaConfirmacaoSenha ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="campoTipoSenhaConfirmacaoSenha = !campoTipoSenhaConfirmacaoSenha" />
                </template>
            </q-input>

            <q-btn class="botao-primario" label="Salvar" @click.prevent="onRedefinirSenha" :loading="carregando"
                :disable="carregando" />

            <q-btn flat no-caps label="Voltar" :to="{ name: 'recuperar-senha' }" />

        </div>
    </div>
</template>

<style scoped></style>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'

import { redefinirSenha } from 'src/services/auth'
import TituloPagina from 'src/components/TituloPagina.vue';
import { notificarErro, notificarSucesso } from 'src/utils/notificacao';
import { carregandoBasico, ocultarCarregando } from 'src/utils/carregando';

const router = useRouter()
const route = useRoute()

const email = ref(route.query.email) // parâmetro que vem da função de envio de email em src/pages/convidado/auth/RecuperarSenhaPage.vue
const codigo_recuperacao = ref('')
const password = ref('')
const password_confirmation = ref('')
const carregando = ref(false)
const campoTipoSenhaSenha = ref(true)
const campoTipoSenhaConfirmacaoSenha = ref(true)

const onRedefinirSenha = async () => {
    try {
        carregandoBasico()

        await redefinirSenha({
            email: email.value,
            codigo_recuperacao: codigo_recuperacao.value,
            password: password.value,
            password_confirmation: password_confirmation.value,
        })

        notificarSucesso('Senha redefinida com sucesso')

        router.replace('/login')

    } catch (err) {
        notificarErro(err.message || 'Erro inesperado')
    } finally {
        ocultarCarregando()
    }
}

</script>

<style lang=" scss" scoped></style>
