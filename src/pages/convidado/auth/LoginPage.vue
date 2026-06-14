<template>
    <q-page class="flex flex-center q-pa-md">

        <div class="login-box">

            <!-- TÍTULO -->
            <div class="text-h6 q-mb-lg text-center">
                Insira seus dados para entrar
            </div>

            <!-- FORM -->
            <div class="column q-gutter-md">

                <q-input outlined v-model="email" label="E-mail" />

                <q-input outlined v-model="password" label="Senha" type="password" />

                <q-btn color="primary" label="Entrar" @click.prevent="onLoginNormal" :loading="carregando"
                    :disable="carregando" />

                <!-- Separador -->
                <div class="row items-center">
                    <div class="col"><q-separator /></div>
                    <div class="q-px-sm text-caption text-grey-6">ou</div>
                    <div class="col"><q-separator /></div>
                </div>

                <q-btn color="white" text-color="black"
                    icon="img:https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    label="Entrar com Google" @click.prevent="onLoginGoogle" />

                <!-- ações secundárias -->
                <div class="column q-gutter-sm q-mt-md">

                    <q-btn flat no-caps color="primary" label="Cadastrar" :to="{ name: 'cadastrar' }" />

                    <q-btn flat no-caps color="primary" label="Esqueci minha senha" :to="{ name: 'recuperar-senha' }" />

                    <q-btn flat no-caps color="primary" label="Voltar para tela inicial" :to="{ name: 'boas-vindas' }" />

                </div>

            </div>

        </div>

    </q-page>
</template>

<style scoped>
.login-box {
    width: 100%;
    max-width: 380px;
}
</style>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar'

const $q = useQuasar()
const email = ref('alvaro220592@gmail.com')
const password = ref('password')
const carregando = ref(false)

import { login } from 'src/services/auth'
import { loginGoogle, loginGoogleBackend } from 'src/services/google-auth'
import { useRouter } from 'vue-router'
import { setToken } from 'src/services/storage'
import { useAuthStore } from 'src/stores/auth';

const router = useRouter()
const authStore = useAuthStore()

const onLoginNormal = async () => {
    try {
        carregando.value = true

        const data = await login(email.value, password.value)

        await setToken(data.token)


        authStore.setAuth(data.user, data.token)

        router.replace('/app')

    } catch (err) {
        $q.notify({
            type: 'negative',
            message: err.message || 'Erro inesperado',
            position: 'top-right'
        })
    } finally {
        carregando.value = false
    }
}

const onLoginGoogle = async () => {
    try {
        const user = await loginGoogle()

        const idToken = user.idToken

        const data = await loginGoogleBackend(idToken)

        await setToken(data.token)

        authStore.setAuth(data.user, data.token)

        router.replace('/app')
    } catch (err) {
        console.error(err)
    }
}

</script>

<style lang=" scss" scoped></style>
