<template>
    <div>
        <titulo-pagina titulo="Redefinir senha" descricao="Informe seu e-mail para receber o link de recuperação" />

        <!-- FORM -->
        <div class="column q-gutter-md">

            <q-input outlined v-model="email" label="E-mail" type="email" />

            <q-btn color="primary" label="Enviar link" @click.prevent="enviarEmailRecuperacao" :loading="carregando"
                :disable="carregando" />

            <!-- ações secundárias -->
            <q-btn flat no-caps label="Voltar para login" :to="{ name: 'login' }" />

        </div>
    </div>
</template>

<style scoped></style>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar'

const $q = useQuasar()
const email = ref('')
const carregando = ref(false)

import { recuperarSenha } from 'src/services/auth'
import { useRouter } from 'vue-router'
import TituloPagina from 'src/components/TituloPagina.vue';

const router = useRouter()

const enviarEmailRecuperacao = async () => {
    try {
        carregando.value = true

        await recuperarSenha({ email: email.value })

        $q.notify({
            type: 'positive',
            message: 'O código de verificação foi enviado por e-mail',
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
