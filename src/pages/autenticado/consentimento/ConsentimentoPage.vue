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
                <q-btn outline :disable="carregandoTermo" :loading="carregandoTermo" icon="description"
                    @click="verTermosUso" label="Ver Termos de Uso" class="full-width" />

                <q-btn outline :disable="carregandoPolitica" :loading="carregandoPolitica" icon="privacy_tip"
                    @click="verPoliticaPrivacidade" label="Ver Política de Privacidade" class="full-width" />
            </q-card-section>

            <q-card-section>
                <q-checkbox v-model="aceitou" label="Li e aceito os Termos de Uso e a Política de Privacidade" />
            </q-card-section>

            <q-card-actions vertical>
                <q-btn color="primary" label="Continuar" class="full-width" :disabled="!aceitou" @click="aceitar" />
            </q-card-actions>
        </q-card>

        <ConsentimentoDialog v-model="mostrarDialog" :titulo="tituloDialog" :conteudo="conteudoDialog" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { get, post } from 'src/services/http.js';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import ConsentimentoDialog from './ConsentimentoDialog.vue';

const $q = useQuasar()
const router = useRouter()

const aceitou = ref(false)
const mostrarDialog = ref(false)
const tituloDialog = ref('')
const conteudoDialog = ref('')
const carregandoTermo = ref(false)
const carregandoPolitica = ref(false)

const verTermosUso = async () => {
    try {
        carregandoTermo.value = true
        const dados = await get('/termo-uso/atual')
        preencherDialog('Termos de Uso', dados.conteudo)

    } catch (e) {
        $q.notify({
            type: 'negative',
            message: e.message || 'Erro inesperado. Entre em contato com a equipe do Mútua',
            position: 'top-right'
        })

    } finally {
        carregandoTermo.value = false
    }
}

const verPoliticaPrivacidade = async () => {
    try {
        carregandoPolitica.value = true
        const dados = await get('/politica-privacidade/atual',)
        preencherDialog('Política de privacidade', dados.conteudo)

    } catch (e) {
        $q.notify({
            type: 'negative',
            message: e.message || 'Erro inesperado. Entre em contato com a equipe do Mútua',
            position: 'top-right'
        })

    } finally {
        carregandoPolitica.value = false
    }
}

const preencherDialog = (titulo, conteudo) => {
    tituloDialog.value = titulo
    conteudoDialog.value = conteudo
    mostrarDialog.value = true
}

const aceitar = async () => {
    if (!aceitou.value) {
        alert('desmarcado')
        return
    }

    try {
        const dados = await post('/consentimento/aceitar', null, true)

        $q.notify({
            type: 'positive',
            message: dados.message || 'Aceito com sucesso',
            position: 'top-right'
        })

        router.replace({ name: 'home' })

    } catch (e) {
        $q.notify({
            type: 'negative',
            message: e.message || 'Erro inesperado. Entre em contato com a equipe do Mútua',
            position: 'top-right'
        })
    }
}

</script>

<style lang="scss" scoped></style>