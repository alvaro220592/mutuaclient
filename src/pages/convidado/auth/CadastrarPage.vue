<template>
    <div>
        <titulo-pagina titulo="Criar conta" descricao="Insira os dados da nova conta" />

        <!-- FORM -->
        <div class="column q-gutter-md">

            <q-input outlined v-model="name" label="Usuário" />

            <q-input outlined v-model="email" label="E-mail" autocapitalize="off" />

            <q-input v-model="password" label="Senha" outlined :type="campoTipoSenhaSenha ? 'password' : 'text'">
                <template v-slot:append>
                    <q-icon :name="campoTipoSenhaSenha ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                        @click="campoTipoSenhaSenha = !campoTipoSenhaSenha" />
                </template>
            </q-input>

            <q-input v-model="password_confirmation" label="Confirme a senha" outlined
                :type="campoTipoSenhaConfirmacaoSenha ? 'password' : 'text'">
                <template v-slot:append>
                    <q-icon :name="campoTipoSenhaConfirmacaoSenha ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="campoTipoSenhaConfirmacaoSenha = !campoTipoSenhaConfirmacaoSenha" />
                </template>
            </q-input>

            <q-btn class="botao-primario" label="Criar conta" @click.prevent="onCadastrar" />

            <!-- Separador -->
            <div class="row items-center">
                <div class="col"><q-separator /></div>
                <div class="q-px-sm text-caption text-grey-6">ou</div>
                <div class="col"><q-separator /></div>
            </div>

            <q-btn outline icon="img:https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                label="Entrar com Google" @click.prevent="onLoginGoogle" />

            <!-- ações secundárias -->
            <div class="column q-gutter-sm q-mt-md">

                <q-btn flat no-caps label="Já tenho cadastro" :to="{ name: 'login' }" />
            </div>

        </div>
    </div>
</template>

<style scoped></style>

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
import { armazenarToken } from 'src/services/storage'
import { useAuthStore } from 'src/stores/auth';
import { loginGoogle, loginGoogleBackend } from 'src/services/google-auth'
import TituloPagina from 'src/components/TituloPagina.vue';

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

        await armazenarToken(data.token)

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

        await armazenarToken(data.token)

        authStore.setAuth(data.user, data.token)

        router.replace('/app')
    } catch (err) {
        console.error(err)
    }
}

</script>

<style lang=" scss" scoped></style>
