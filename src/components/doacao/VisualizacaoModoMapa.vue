<template>
    <div>
        <div class="mapa-container">

            <q-card flat bordered class="legenda q-pa-sm">
                <div class="row items-center no-wrap q-gutter-sm">
                    <q-icon name="circle" size="12px" class="solicitada-legenda" />
                    <span class="text-caption">Solicitadas</span>
                </div>

                <div class="row items-center no-wrap q-gutter-sm q-mt-xs">
                    <q-icon name="circle" size="12px" class="oferecida-legenda" />
                    <span class="text-caption">Oferecidas</span>
                </div>
            </q-card>

            <div ref="mapContainer" id="map" style="height: 100vh; width: 100%;"></div>

        </div>


        <q-dialog v-model="mostrarModal" position="bottom">
            <q-card style="
                border-top-left-radius: 22px;
                border-top-right-radius: 22px;
                min-height: 40vh;
            ">
                <q-card-section>
                    <div class="text-overline text-grey-7">
                        {{ doacaoSelecionada.perfil_doacao_id === 1 ? 'OFERECE' : 'SOLICITA' }}
                    </div>

                    <div class="text-h6 text-weight-bold">
                        {{ doacaoSelecionada.categoria?.nome ?? 'Sem categoria' }}
                    </div>

                    <div class="text-body1 q-mt-sm">
                        {{ doacaoSelecionada.detalhes ?? 'Sem detalhes.' }}
                    </div>
                </q-card-section>

                <q-separator />

                <q-card-section>
                    <div class="text-subtitle2 text-weight-medium q-mb-md">
                        Contato
                    </div>

                    <q-list dense>
                        <q-item>
                            <q-item-section avatar>
                                <q-icon name="phone" color="primary" />
                            </q-item-section>

                            <q-item-section>
                                {{ doacaoSelecionada.usuario.telefone?.telefone ?? 'Não informado' }}
                            </q-item-section>
                        </q-item>

                        <q-item>
                            <q-item-section avatar>
                                <q-icon name="mail" color="primary" />
                            </q-item-section>

                            <q-item-section>
                                {{ doacaoSelecionada.usuario.email }}
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-card-section>

                <!-- O botão de conversar só aparece se a doação sendo exibida não for do usuário logado -->
                <q-card-actions v-if="doacaoSelecionada.usuario.id != authStore.user.id" class="q-pa-md justify-center">
                    <q-btn outline icon="chat" label="Conversar" padding="8px 20px" unelevated rounded
                        @click="irParaChat" />
                </q-card-actions>

            </q-card>
        </q-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'

import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

const router = useRouter()
const authStore = useAuthStore()

// Referência direta para a DIV do mapa
const mapContainer = ref(null)

const initialMap = ref(null)
const mostrarModal = ref(false)
const doacaoSelecionada = ref({})

const LRef = ref(null)
const markersRef = ref(null)

const props = defineProps({
    doacoes: {
        type: Array,
        required: true
    },
    moduloId: {
        type: Number,
        required: false
    },
    latitudeUsuario: {
        type: String,
        required: false
    },
    longitudeUsuario: {
        type: String,
        required: false
    },
})

const carregarMarcadores = () => {
    if (!markersRef.value || !LRef.value) return

    const L = LRef.value
    markersRef.value.clearLayers()

    props.doacoes.forEach((doacao) => {
        const regiao_usuario = doacao.usuario?.regiao_usuario
        if (!regiao_usuario?.latitude || !regiao_usuario?.longitude) return

        const marker = L.marker(
            [
                Number(regiao_usuario.latitude),
                Number(regiao_usuario.longitude)
            ],
            {
                icon: L.divIcon({
                    className: '',
                    html: `
                        <div class="meu-marker ${doacao.perfil?.nome === 'oferecida'
                            ? 'oferecida-mapa'
                            : 'solicitada-mapa'
                        }"></div>
                    `,
                    iconSize: [20, 20]
                })
            }
        )

        marker.on('click', () => {
            doacaoSelecionada.value = doacao
            mostrarModal.value = true
        })

        markersRef.value.addLayer(marker)
    })
}

const destruirMapa = () => {
    if (initialMap.value) {
        initialMap.value.off()
        initialMap.value.remove()
        initialMap.value = null
    }
}

onMounted(async () => {
    await nextTick()

    // 1. Garante que se já existir uma instância (ex: HMR do Vite), ela seja destruída
    if (mapContainer.value && mapContainer.value._leaflet_id) {
        mapContainer.value._leaflet_id = null
    }
    destruirMapa()

    // 2. Importação Dinâmica do Leaflet e do Cluster
    const LeafletModule = await import('leaflet')
    LRef.value = LeafletModule.default || LeafletModule
    await import('leaflet.markercluster')

    const L = LRef.value

    markersRef.value = L.markerClusterGroup({
        chunkedLoading: true,
        removeOutsideVisibleBounds: true
    })

    // 3. Passamos a referência da DIV em vez da string id 'map'
    if (!mapContainer.value) return

    initialMap.value = L.map(mapContainer.value, {
        zoomControl: true,
        zoom: 1,
        zoomAnimation: false,
        fadeAnimation: true,
        markerZoomAnimation: true
    })

    const lat = Number(props.latitudeUsuario) || -23.617055
    const lng = Number(props.longitudeUsuario) || -46.954702
    initialMap.value.setView([lat, lng], 12)

    L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
    ).addTo(initialMap.value)

    initialMap.value.addLayer(markersRef.value)
    carregarMarcadores()
})

watch(
    () => props.doacoes,
    () => {
        carregarMarcadores()
    },
    { deep: true }
)

const irParaChat = () => {
    router.push({
        name: 'conversas.chat',
        query: {
            outroUsuarioId: doacaoSelecionada.value.usuario.id,
            moduloId: props.moduloId,
            referenciaId: doacaoSelecionada.value.id,
            assunto: `Doação de ${doacaoSelecionada.value.categoria.nome} ${doacaoSelecionada.value.perfil.nome} por ${doacaoSelecionada.value.usuario.name}`
        }
    })
}

onUnmounted(() => {
    destruirMapa()
})
</script>

<style>
.meu-marker {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 0 5px rgba(0, 0, 0, .4);
}

.mapa-container {
    position: relative;
}

#map {
    height: 600px;
}

.legenda {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 1000;
}

.solicitada-mapa {
    background: var(--cor-doacao-solicitada);
}

.oferecida-mapa {
    background: var(--cor-doacao-oferecida);
}

.solicitada-legenda {
    color: var(--cor-doacao-solicitada);
}

.oferecida-legenda {
    color: var(--cor-doacao-oferecida);
}
</style>