<template>
    <div>
        <titulo-pagina titulo="Contato" descricao="Envie uma mensagem à nossa equipe" />

        <!-- FORM -->
        <div class="column q-gutter-md">

            <q-input outlined v-model="mensagem" label="Insira sua mensagem" type="textarea" />

            <q-btn class="botao-primario" label="Enviar" @click.prevent="enviarEmail" :loading="carregando"
                :disable="carregando" />

        </div>
    </div>
</template>

<script setup>
import { useQuasar } from 'quasar';
import TituloPagina from 'src/components/TituloPagina.vue';
import { post } from 'src/services/http';
import { ref } from 'vue';

const carregando = ref(false)
const mensagem = ref('')
const $q = useQuasar()

const enviarEmail = async () => {
    try {
        carregando.value = true
        const dados = await post('/contato-usuario/email', { mensagem: mensagem.value }, true)

        $q.notify({
            type: 'positive',
            message: dados.message || 'Mensagem enviada com sucesso',
            position: 'top-right'
        })

        mensagem.value = ''

    } catch (e) {
        $q.notify({
            type: 'negative',
            message: e.message || 'Erro inesperado',
            position: 'top-right'
        })

    } finally {
        carregando.value = false
    }
}

</script>

<style lang="scss" scoped></style>