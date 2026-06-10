<template>
    <div>
        <h1 class="text-h5 q-mb-lg">
            Insira seus dados para entrar
        </h1>

        <div class="column q-gutter-md">
            <q-input outlined v-model="name" label="Usuário" />

            <q-input outlined v-model="email" label="E-mail" />

            <q-input outlined v-model="password" label="Senha" type="password" />

            <q-input outlined v-model="password_confirmation" label="Confirmar senha" type="password" />

            <q-space class="q-mt-lg" />

            <q-btn color="primary" label="Cadastrar" @click.prevent="onCadastrar" />

            <q-btn color="white" icon="img:https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                label="Entrar com Google" text-color="black" @click.prevent="onLoginGoogle">
            </q-btn>

            <q-btn flat no-caps color="primary" label="Já tenho cadastro" to="/login" />

            <q-btn flat no-caps color="primary" label="Voltar para tela inicial" to="/" />
        </div>


    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar'

const $q = useQuasar()
const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')

import { cadastrar } from 'src/services/auth'
import { useRouter } from 'vue-router'
import { setToken } from 'src/services/storage'
import { useAuthStore } from 'src/stores/auth';
import { loginGoogle, loginGoogleBackend } from 'src/services/google-auth'

const router = useRouter()
const authStore = useAuthStore()

const onCadastrar = async () => {
    try {
        const data = await cadastrar(name.value, email.value, password.value, password_confirmation.value)

        await setToken(data.token)

        authStore.setAuth(data.user, data.token)

        router.replace('/app')

    } catch (err) {
        $q.notify({
            type: 'negative',
            message: err.message || 'Erro inesperado',
            position: 'top-right'
        })
    }
}

const onLoginGoogle = async () => {
    try {
        const user = await loginGoogle()

        const idToken = user.idToken

        console.log('ID TOKEN:', idToken)

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
