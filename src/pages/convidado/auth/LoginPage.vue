<template>
    <div>

        <titulo-pagina titulo="Login" descricao="Insira seus dados para entrar" />

        <!-- FORM -->
        <div class="column q-gutter-md">

            <q-input outlined v-model="email" label="E-mail" autocapitalize="off" />

            <q-input v-model="password" label="Senha" outlined :type="campoTipoSenha ? 'password' : 'text'">
                <template v-slot:append>
                    <q-icon :name="campoTipoSenha ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                        @click="campoTipoSenha = !campoTipoSenha" />
                </template>
            </q-input>

            <q-btn class="botao-primario" label="Entrar" @click.prevent="onLoginNormal" />

            <separador-horizontal detalhes="ou" />

            <q-btn outline icon="img:https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                label="Entrar com Google" @click.prevent="onLoginGoogle" />

            <!-- ações secundárias -->
            <div class="column q-gutter-sm q-mt-md">

                <q-btn flat no-caps label="Criar conta" :to="{ name: 'cadastrar' }" />

                <q-btn flat no-caps label="Esqueci minha senha" :to="{ name: 'recuperar-senha' }" />

            </div>
        </div>
    </div>
</template>

<style scoped></style>

<script setup>
import { ref } from 'vue';
import { login } from 'src/services/auth'
import { loginGoogle, loginGoogleBackend } from 'src/services/google-auth'
import { useRouter } from 'vue-router'
import { armazenarToken } from 'src/services/storage'
import { useAuthStore } from 'src/stores/auth';
import TituloPagina from 'src/components/TituloPagina.vue';
import SeparadorHorizontal from 'src/components/SeparadorHorizontal.vue';
import { notificarErro } from 'src/utils/notificacao';
import { iniciarEcho } from 'src/services/echo';
import { useQuasar } from 'quasar';

const router = useRouter()
const authStore = useAuthStore()
const $q = useQuasar()

const email = ref('alvaro220592@gmail.com')
// const email = ref('joao_teste@mail.com')
const password = ref('password')
const campoTipoSenha = ref(true)

const onLoginNormal = async () => {
    try {
        $q.loading.show({
            message: 'Carregando'
        })

        const data = await login({
            email: email.value,
            password: password.value,
        })
        await armazenarToken(data.token)
        await iniciarEcho()
        authStore.setAuth(data.user, data.token)
        router.replace('/app')

    } catch (err) {
        notificarErro(err.message || 'Erro inesperado')
    } finally {
        $q.loading.hide()
    }
}

const onLoginGoogle = async () => {
    try {
        $q.loading.show({
            message: 'Carregando'
        })

        const user = await loginGoogle()
        const idToken = user.idToken
        const data = await loginGoogleBackend(idToken)
        await armazenarToken(data.token)
        await iniciarEcho()
        authStore.setAuth(data.user, data.token)
        router.replace('/app')

    } catch (err) {
        console.error(err)
    } finally {
        $q.loading.hide()
    }
}

</script>

<style lang=" scss" scoped></style>
