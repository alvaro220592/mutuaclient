<template>
    <div>
        <div id="map" style="height:600px;"></div>

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

                <q-separator />

                <q-card-actions class="q-pa-md justify-center">
                    <q-btn outline icon="chat" label="Conversar" padding="8px 20px" unelevated rounded />
                </q-card-actions>

            </q-card>
        </q-dialog>
    </div>
</template>

<style>
.meu-marker {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 0 5px rgba(0, 0, 0, .4);
}

.solicitada {
    background: #f44336;
}

.oferecida {
    background: #1864d6;
}
</style>

<script setup>

import { ref, onMounted } from 'vue'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import * as L from 'leaflet';
import "leaflet.markercluster";

// const addressPoints = [{ "latitude": 24.27665104598939, "longitude": 90.0613180426463 }, { "latitude": 23.963130071089555, "longitude": 89.87057916521712 }, { "latitude": 22.272911852412985, "longitude": 89.45848811480407 }, { "latitude": 21.866012385536777, "longitude": 89.43066277411563 }, { "latitude": 26.28491343141951, "longitude": 88.71354215011813 }, { "latitude": 23.162752155209038, "longitude": 88.54135436621087 }, { "latitude": 24.2573244657501, "longitude": 90.27970685550626 }, { "latitude": 26.442446279249083, "longitude": 91.20560066432566 }, { "latitude": 25.679452203875805, "longitude": 88.88476199988779 }, { "latitude": 21.095985168577293, "longitude": 90.44412632170271 }, { "latitude": 24.856814305800896, "longitude": 90.72549594880569 }, { "latitude": 23.064712768865874, "longitude": 90.28167083116922 }, { "latitude": 25.02521932764587, "longitude": 91.46790539331087 }, { "latitude": 23.70655293414952, "longitude": 92.61094060533904 }, { "latitude": 26.55275823991079, "longitude": 88.37017314809907 }, { "latitude": 25.839040923731112, "longitude": 92.40095927365958 }, { "latitude": 20.830975982083782, "longitude": 89.36782296662591 }, { "latitude": 21.75616607527858, "longitude": 90.72407090877573 }, { "latitude": 26.497290443636544, "longitude": 88.83133298995432 }, { "latitude": 25.336414213103453, "longitude": 91.31577905635686 }, { "latitude": 25.39647120953694, "longitude": 90.49859739782069 }, { "latitude": 23.361544677731118, "longitude": 91.6243756141422 }, { "latitude": 24.03184605415212, "longitude": 89.35651092478864 }, { "latitude": 26.143582650241914, "longitude": 90.28684800427433 }, { "latitude": 21.089426301974807, "longitude": 90.77237354427304 }, { "latitude": 21.10140554509522, "longitude": 88.9210399276019 }, { "latitude": 24.67737587948087, "longitude": 91.54146120634202 }, { "latitude": 26.2468560125869, "longitude": 88.53148848381579 }, { "latitude": 25.306279541270065, "longitude": 88.90014593398952 }, { "latitude": 21.483114251046533, "longitude": 91.119852529669 }, { "latitude": 21.18566879771631, "longitude": 90.93921565682126 }, { "latitude": 24.171699889191757, "longitude": 89.7020472080285 }, { "latitude": 21.35868974598009, "longitude": 89.83209223175962 }, { "latitude": 25.03518224065723, "longitude": 91.74568846298308 }, { "latitude": 25.527789013040767, "longitude": 91.98854090721447 }, { "latitude": 25.40021453324199, "longitude": 91.9495660638841 }, { "latitude": 21.782882160567834, "longitude": 90.09472311925528 }, { "latitude": 21.39000802938769, "longitude": 88.25635548803851 }, { "latitude": 23.491412682228706, "longitude": 91.78379977947444 }, { "latitude": 21.61151940473219, "longitude": 90.36856525970418 }, { "latitude": 25.35783977505644, "longitude": 90.65028966335346 }, { "latitude": 23.85055747394872, "longitude": 90.11273822766347 }, { "latitude": 23.80952789505703, "longitude": 89.5680544957478 }, { "latitude": 22.066215516168874, "longitude": 92.37817232366218 }, { "latitude": 24.440110104036194, "longitude": 88.24851664643018 }, { "latitude": 21.940898625377034, "longitude": 91.67023629487596 }, { "latitude": 25.181594942892065, "longitude": 92.18991612753487 }, { "latitude": 25.34085020812168, "longitude": 89.64645579058008 }, { "latitude": 22.969035689300352, "longitude": 91.90004795949201 }, { "latitude": 23.170475381739237, "longitude": 92.64968371834638 }, { "latitude": 23.94729334316339, "longitude": 92.542202628237 }, { "latitude": 20.911728545052302, "longitude": 92.20631645330644 }, { "latitude": 24.963614522046097, "longitude": 90.48049652646873 }, { "latitude": 22.108981617165025, "longitude": 88.6271436308791 }, { "latitude": 25.54616553825699, "longitude": 88.99911967436688 }, { "latitude": 21.114267323208523, "longitude": 89.39320739606802 }, { "latitude": 26.30969399344272, "longitude": 92.35686517244322 }, { "latitude": 24.257734000074233, "longitude": 88.61389232472325 }, { "latitude": 21.013132458060483, "longitude": 88.70829047770336 }, { "latitude": 25.92752926189445, "longitude": 92.4328008277244 }, { "latitude": 24.35600940601517, "longitude": 90.22108564293598 }, { "latitude": 21.673678551662306, "longitude": 91.403075908786 }, { "latitude": 21.36830287524946, "longitude": 91.54543713368547 }, { "latitude": 23.280790414481785, "longitude": 90.50918094813089 }, { "latitude": 24.901883776269692, "longitude": 88.69789371448998 }, { "latitude": 22.080154034672784, "longitude": 90.13960281834441 }, { "latitude": 21.77417531347068, "longitude": 91.0508599400929 }, { "latitude": 24.477823647221022, "longitude": 88.72462730689585 }, { "latitude": 23.895514559664587, "longitude": 90.29104975923597 }, { "latitude": 24.45237897004337, "longitude": 89.65612086995456 }, { "latitude": 23.806323081698373, "longitude": 90.3038955778723 }, { "latitude": 26.196017413313026, "longitude": 89.66765405566422 }, { "latitude": 25.61134907395082, "longitude": 88.40796071474475 }, { "latitude": 25.958472883886458, "longitude": 90.59656855315279 }, { "latitude": 22.29449747532684, "longitude": 91.34700179030767 }, { "latitude": 22.69586088658269, "longitude": 88.70382353183456 }, { "latitude": 25.57878970020386, "longitude": 88.82806784519846 }, { "latitude": 22.839682889472694, "longitude": 91.36669767533844 }]

const initialMap = ref(null);
const mostrarModal = ref(false)
const doacaoSelecionada = ref({})

const props = defineProps({
    doacoes: {
        type: Object,
        required: true
    }
})

onMounted(() => {
    initialMap.value = L.map('map',
        {
            zoomControl: true,
            zoom: 1,
            zoomAnimation: false,
            fadeAnimation: true,
            markerZoomAnimation: true
        }
    ).setView([-23.617055, -46.954702], 12);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(initialMap.value);


    const markers = L.markerClusterGroup();

    props.doacoes.forEach((doacao) => {
        const regiao_usuario = doacao.usuario.regiao_usuario

        if (!regiao_usuario?.latitude || !regiao_usuario?.longitude) {
            return
        }

        const marker = L.marker(
            [regiao_usuario.latitude, regiao_usuario.longitude],
            {
                icon: L.divIcon({
                    className: '',
                    html: `
                <div class="meu-marker ${doacao.perfil.nome == 'oferecida'
                            ? 'oferecida'
                            : 'solicitada'
                        }">
                </div>
            `,
                    iconSize: [20, 20]
                })
            }
        )

        marker.on('click', () => {
            doacaoSelecionada.value = doacao
            mostrarModal.value = true
        })

        markers.addLayer(marker)
    })

    initialMap.value.addLayer(markers);
});

</script>