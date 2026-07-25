<template>
    <div>

        <TituloPagina titulo="Doações"
            descricao="Navegue pelo mapa para ver todas as publicações ou pela lista para ver apenas as suas" />

        <!-- TIPO DE VISUALIZAÇÃO -->
        <div class="text-center q-mt-lg q-mb-md">
            <q-btn-toggle class="borda-toggle" :toggle-text-color="Dark.isActive ? 'dark' : ''"
                v-model="modoVisualizacao" :options="[
                    { label: 'Mapa', value: 'mapa', icon: 'map' },
                    { label: 'Minhas publicações', value: 'lista', icon: 'view_list' }
                ]" />
        </div>

        <div>
            <MapaWrapper v-if="modoVisualizacao == 'mapa'" />
            <ListaWrapper v-if="modoVisualizacao == 'lista'" />
        </div>

        <BotaoFlutuanteNovoCadastro nomeRota="doacoes.solicitadas.novo" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Dark } from 'quasar';
import MapaWrapper from './MapaWrapper.vue';
import ListaWrapper from './ListaWrapper.vue';
import TituloPagina from 'src/components/TituloPagina.vue';
import BotaoFlutuanteNovoCadastro from 'src/components/BotaoFlutuanteNovoCadastro.vue';

const modoVisualizacao = ref('mapa')

</script>

<style scoped>
.borda-toggle {
    border: 1px solid var(--q-primary);
}
</style>