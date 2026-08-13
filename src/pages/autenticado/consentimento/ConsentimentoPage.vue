<template>
    <div>
        <!-- Página que solicita que o usuário aceite os termos de uso e política de privacidade -->

        <q-card class="q-pa-md" style="max-width: 450px; width: 100%;">
            <q-card-section class="text-center">
                <div class="text-h6 q-mb-md">
                    Antes de continuar
                </div>
                <div class="text-body1">
                    Para utilizar o Mútua, você precisa ler e aceitar
                    nossos Termos de Uso e nossa Política de Privacidade.
                </div>
            </q-card-section>

            <!-- Botões de exibição do dialog -->
            <q-card-section class="q-gutter-sm">
                <q-btn outline icon="description" @click="verTermosUso" label="Ver Termos de Uso" class="full-width" />

                <q-btn outline icon="privacy_tip" @click="verPoliticaPrivacidade" label="Ver Política de Privacidade"
                    class="full-width" />
            </q-card-section>

            <q-card-section>
                <q-checkbox color="positive" v-model="aceitou"
                    label="Li e aceito os Termos de Uso e a Política de Privacidade" />
            </q-card-section>

            <q-card-actions vertical>
                <q-btn class="botao-primario full-width" label="Continuar" :disabled="!aceitou" @click="aceitar" />
            </q-card-actions>
        </q-card>

        <ConsentimentoDialog v-model="mostrarDialog" :titulo="tituloDialog" :conteudo="conteudoDialog" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { get, post } from 'src/services/http.js';
import { useRouter } from 'vue-router';
import ConsentimentoDialog from './ConsentimentoDialog.vue';
import { notificarErro, notificarSucesso } from 'src/utils/notificacao.js';
import { useQuasar } from 'quasar';

const router = useRouter()
const $q = useQuasar()

const aceitou = ref(false)
const mostrarDialog = ref(false)
const tituloDialog = ref('')
const conteudoDialog = ref('')

const verTermosUso = async () => {
    try {
        $q.loading.show({
            message: 'Carregando'
        })

        const dados = await get('/termo-uso/atual')
        preencherDialog('Termos de Uso', dados.conteudo)

    } catch (e) {
        notificarErro(e.message || 'Erro inesperado. Entre em contato com a equipe do Mútua')

    } finally {
        $q.loading.hide()
    }
}

const verPoliticaPrivacidade = async () => {
    try {
        $q.loading.show({
            message: 'Carregando'
        })

        const dados = await get('/politica-privacidade/atual',)
        preencherDialog('Política de privacidade', dados.conteudo)

    } catch (e) {
        notificarErro(e.message || 'Erro inesperado. Entre em contato com a equipe do Mútua')

    } finally {
        $q.loading.hide()
    }
}

const preencherDialog = (titulo, conteudo) => {
    tituloDialog.value = titulo
    conteudoDialog.value = conteudo
    mostrarDialog.value = true
}

const aceitar = async () => {
    if (!aceitou.value) {
        return
    }

    try {
        $q.loading.show({
            message: 'Carregando'
        })

        const dados = await post('/consentimento/aceitar', null, true)

        notificarSucesso(dados.message || 'Aceito com sucesso')

        router.replace({ name: 'home' })

    } catch (e) {
        notificarErro(e.message || 'Erro inesperado. Entre em contato com a equipe do Mútua')

    } finally {
        $q.loading.hide()
    }
}

</script>

<style lang="scss" scoped></style>