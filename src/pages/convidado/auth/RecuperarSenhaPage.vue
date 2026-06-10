<template>
    <div>
        <h1 class="text-h6 q-mb-lg">
            Insira o e-mail para redefinir a senha
        </h1>

        <div class="column q-gutter-md">
            <q-input outlined v-model="email" label="E-mail" />

            <q-btn color="primary" label="Enviar" @click.prevent="enviarEmailRecuperacao" :loading="carregando"
                :disable="carregando" />

            <q-btn flat no-caps color="primary" label="Voltar" to="/login" />
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar'

const $q = useQuasar()
const email = ref('alvaro220592@gmail.com')
const carregando = ref(false)

import { recuperarSenha } from 'src/services/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const enviarEmailRecuperacao = async () => {
    try {
        carregando.value = true

        const data = await recuperarSenha(email.value)

        console.log(JSON.stringify(data))

        $q.notify({
            type: 'positive',
            message: 'O código de verificação foi enviado a você por e-mail',
            position: 'top-right'
        })

        router.replace({
            path: '/redefinir-senha',
            query: {
                email: email.value,
            },
        })

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
