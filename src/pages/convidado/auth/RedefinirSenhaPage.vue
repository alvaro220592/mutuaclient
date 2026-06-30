<template>
    <q-page class="flex flex-center q-pa-md">

        <div class="box">

            <!-- TÍTULO -->
            <div class="text-h6 q-mb-sm text-center">
                Redefinir senha
            </div>

            <div class="text-body2 text-center text-grey-7 q-mb-md">
                Digite o código enviado por e-mail e sua nova senha
            </div>

            <!-- FORM -->
            <div class="column q-gutter-md">

                <q-input outlined v-model="email" label="E-mail" type="email" />

                <q-input outlined v-model="codigo_recuperacao" label="Código de 6 dígitos" type="tel" maxlength="6" />

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

                <q-btn color="primary" label="Salvar" @click.prevent="onRedefinirSenha" :loading="carregando"
                    :disable="carregando" />

                <q-btn flat no-caps color="primary" label="Voltar" :to="{ name: 'recuperar-senha' }" />

            </div>

        </div>

    </q-page>
</template>

<style scoped></style>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

import { redefinirSenha } from 'src/services/auth'

const router = useRouter()
const route = useRoute()

const $q = useQuasar()
const email = ref(route.query.email) // parâmetro que vem da função de envio de email em src/pages/convidado/auth/RecuperarSenhaPage.vue
const codigo_recuperacao = ref('')
const password = ref('')
const password_confirmation = ref('')
const carregando = ref(false)
const campoTipoSenhaSenha = ref(true)
const campoTipoSenhaConfirmacaoSenha = ref(true)

const onRedefinirSenha = async () => {
    try {
        carregando.value = true

        await redefinirSenha({
            email: email.value,
            codigo_recuperacao: codigo_recuperacao.value,
            password: password.value,
            password_confirmation: password_confirmation.value,
        })

        $q.notify({
            type: 'positive',
            message: 'Senha redefinida com sucesso',
            position: 'top-right'
        })

        router.replace('/login')

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

</script>

<style lang=" scss" scoped></style>
