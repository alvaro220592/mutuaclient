<template>
    <div>
        <titulo-pagina titulo="Recuperar senha" descricao="Informe seu e-mail para receber o código de recuperação" />

        <!-- FORM -->
        <div class="column q-gutter-md">

            <q-input outlined v-model="email" label="E-mail" type="email" autocapitalize="off" />

            <q-btn class="botao-primario" label="Enviar link" @click.prevent="enviarEmailRecuperacao" />

            <!-- ações secundárias -->
            <q-btn flat no-caps label="Voltar para o login" :to="{ name: 'login' }" />

        </div>
    </div>
</template>

<style scoped></style>

<script setup>

import { ref } from 'vue';
import { recuperarSenha } from 'src/services/auth'
import { useRouter } from 'vue-router'
import TituloPagina from 'src/components/TituloPagina.vue';
import { notificarErro, notificarSucesso } from 'src/utils/notificacao';
import { carregandoBasico, ocultarCarregando } from 'src/utils/carregando';

const email = ref('')
const router = useRouter()

const enviarEmailRecuperacao = async () => {
    try {
        carregandoBasico()

        await recuperarSenha({ email: email.value })

        notificarSucesso('O código de verificação foi enviado por e-mail')

        router.replace({
            path: '/redefinir-senha',
            query: {
                email: email.value,
            },
        })

    } catch (err) {
        notificarErro(err.message || 'Erro inesperado')

    } finally {
        ocultarCarregando()
    }
}

</script>

<style lang=" scss" scoped></style>
