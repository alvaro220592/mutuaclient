<template>
    <q-page class="flex flex-center q-pa-md">

        <div class="box">

            <!-- TÍTULO -->
            <div class="text-h6 q-mb-lg text-center">
                Crie sua conta
            </div>

            <!-- FORM -->
            <div class="column q-gutter-md">

                <q-input outlined v-model="name" label="Usuário" />

                <q-input outlined v-model="email" label="E-mail" />

                <q-input v-model="password" outlined :type="campoTipoSenhaSenha ? 'password' : 'text'"
                    hint="Password with toggle">
                    <template v-slot:append>
                        <q-icon :name="campoTipoSenhaSenha ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                            @click="campoTipoSenhaSenha = !campoTipoSenhaSenha" />
                    </template>
                </q-input>

                <q-input v-model="password_confirmation" outlined
                    :type="campoTipoSenhaConfirmacaoSenha ? 'password' : 'text'" hint="Password with toggle">
                    <template v-slot:append>
                        <q-icon :name="campoTipoSenhaConfirmacaoSenha ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="campoTipoSenhaConfirmacaoSenha = !campoTipoSenhaConfirmacaoSenha" />
                    </template>
                </q-input>

                <q-btn color="primary" label="Cadastrar" @click.prevent="onCadastrar" />

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

                    <q-btn flat no-caps color="primary" label="Já tenho cadastro" :to="{ name: 'login' }" />

                    <q-btn flat no-caps color="primary" label="Voltar para tela inicial"
                        :to="{ name: 'boas-vindas' }" />

                </div>

            </div>

        </div>

    </q-page>
</template>

<style scoped></style>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar'

const $q = useQuasar()
const name = ref('alvaro')
const email = ref('alvaro220592@gmail.com')
const password = ref('password')
const password_confirmation = ref('password')

import { cadastrar } from 'src/services/auth'
import { useRouter } from 'vue-router'
import { setToken } from 'src/services/storage'
import { useAuthStore } from 'src/stores/auth';
import { loginGoogle, loginGoogleBackend } from 'src/services/google-auth'

const router = useRouter()
const authStore = useAuthStore()

const campoTipoSenhaSenha = ref(true)
const campoTipoSenhaConfirmacaoSenha = ref(true)

const onCadastrar = async () => {
    try {
        const data = await cadastrar({
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value,
        })

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
