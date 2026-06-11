<template>
    <q-page class="flex flex-center q-pa-md">

        <div class="recover-box">

            <!-- TÍTULO -->
            <div class="text-h6 q-mb-lg text-center">
                Redefinir senha
            </div>

            <div class="text-body2 text-center q-mb-md text-grey-7">
                Informe seu e-mail para receber o link de recuperação
            </div>

            <!-- FORM -->
            <div class="column q-gutter-md">

                <q-input outlined v-model="email" label="E-mail" type="email" />

                <q-btn color="primary" label="Enviar link" @click.prevent="enviarEmailRecuperacao" :loading="carregando"
                    :disable="carregando" />

                <!-- ações secundárias -->
                <q-btn flat no-caps color="primary" label="Voltar para login" to="/login" />

            </div>

        </div>

    </q-page>
</template>

<style scoped>
.recover-box {
    width: 100%;
    max-width: 380px;
}
</style>

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
