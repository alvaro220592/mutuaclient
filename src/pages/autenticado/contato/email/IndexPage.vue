<template>
    <div>
        <titulo-pagina titulo="Contato" descricao="Envie uma mensagem à nossa equipe" />

        <!-- FORM -->
        <div class="column q-gutter-md">

            <q-input outlined v-model="mensagem" label="Insira sua mensagem" type="textarea" />

            <q-btn class="botao-primario" label="Enviar" @click.prevent="enviarEmail" />

        </div>
    </div>
</template>

<script setup>
import TituloPagina from 'src/components/TituloPagina.vue';
import { useRouter } from 'vue-router';
import { post } from 'src/services/http';
import { ref } from 'vue';
import { notificarErro, notificarSucesso } from 'src/utils/notificacao';
import { carregandoBasico, ocultarCarregando } from 'src/utils/carregando';

const router = useRouter()

const mensagem = ref('')

const enviarEmail = async () => {
    try {
        carregandoBasico()

        const dados = await post('/contato-usuario/email', { mensagem: mensagem.value }, true)

        notificarSucesso(dados.message || 'Mensagem enviada com sucesso')

        mensagem.value = ''

        router.replace({ name: 'home' })

    } catch (e) {
        notificarErro(e.message || 'Erro inesperado')

    } finally {
        ocultarCarregando()
    }
}

</script>

<style lang="scss" scoped></style>