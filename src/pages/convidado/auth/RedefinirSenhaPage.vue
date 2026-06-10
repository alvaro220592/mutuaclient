<template>
    <div>
        <h1 class="text-h6 q-mb-lg">
            Redefinia sua senha
        </h1>

        <div class="column q-gutter-md">
            <q-input outlined v-model="email" label="E-mail" />

            <q-input outlined v-model="codigo_recuperacao" type="tel" maxlength="6"
                label="Código de 6 dígitos recebido por e-mail" />

            <q-input outlined v-model="password" label="Nova senha" type="password" />

            <q-input outlined v-model="password_confirmation" label="Confirmar senha" type="password" />

            <q-btn color="primary" label="Salvar" @click.prevent="onRedefinirSenha" :loading="carregando"
                :disable="carregando" />

            <q-btn flat no-caps color="primary" label="Voltar" to="/recuperar-senha" />
        </div>

    </div>
</template>

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

const onRedefinirSenha = async () => {
    try {
        carregando.value = true

        const data = await redefinirSenha(email.value, codigo_recuperacao.value, password.value, password_confirmation.value)

        console.log(JSON.stringify(data))

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
