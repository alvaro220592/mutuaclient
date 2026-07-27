<template>
    <div>
        <SpinnerCarregamento v-if="carregando" :carregando="carregando" />

        <div v-else>
            <div class="row items-center justify-center q-col-gutter-sm">

                <div class="q-pt-md text-caption">
                    Se quiser, filtre os resultados nos campos abaixo
                </div>

                <div class="col-12">
                    <q-select dense outlined v-model="filtros.perfil" label="Perfil de doação" :options="perfisDoacao"
                        option-label="nome" option-value="id" emit-value map-options clearable
                        @update:model-value="aplicarFiltro" />
                </div>

                <div class="col-12">
                    <q-select dense outlined v-model="filtros.usuario" label="Usuário" :options="usuarios"
                        option-label="name" option-value="id" emit-value map-options clearable
                        @update:model-value="aplicarFiltro" />
                </div>
            </div>
        </div>

        <!-- BOTÃO LIMPAR FILTROS -->
        <div v-if="filtros.perfil !== null || filtros.usuario !== null" class="row justify-center q-mb-md">
            <q-btn @click="limparFiltros" dense outline label="Limpar filtros" />
        </div>

        <q-space class="q-my-md" />

        <VisualizacaoModoLista :areaAdmin="true" v-if="doacoes.length > 0" :doacoes="doacoes"
            :funcaoCarregarMais="carregarMais" @editar="editarDoacao" @alternar-status="alternarStatus"
            @excluir="mostrarConfirmacaoExclusao" />

        <NenhumRegistroEncontrado v-else />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { carregarDoacoesLista } from 'src/utils/doacoes'
import VisualizacaoModoLista from 'src/components/doacao/VisualizacaoModoLista.vue'
import { useDoacaoAcoes } from 'src/composables/useDoacaoAcoes'
import NenhumRegistroEncontrado from 'src/components/NenhumRegistroEncontrado.vue'
import { buscarDoacoesLista, buscarPerfisDoacao } from 'src/services/doacao'
import SpinnerCarregamento from 'src/components/SpinnerCarregamento.vue'
import { notificarErro } from 'src/utils/notificacao'
import { buscarUsuarios } from 'src/services/info-usuario'

const router = useRouter()

const carregando = ref(false)
const terminou = ref(false)
const pagina = ref(1)
const doacoes = ref([])
const perfisDoacao = ref([])
const usuarios = ref([])

// Cria uma instância do composable de ações.
const acoesDoacao = useDoacaoAcoes(doacoes)

//FILTROS
const filtros = ref({
    perfil: null,
    usuario: null,
    admin: true,
})

// Obtém as funções do composable.
const alternarStatus = acoesDoacao.alternarStatus
const mostrarConfirmacaoExclusao = acoesDoacao.mostrarConfirmacaoExclusao

const carregarMais = async () => {
    await carregarDoacoesLista({
        carregando,
        terminou,
        pagina,
        doacoes,
        filtros,
        buscar: buscarDoacoesLista,
    })
}

const aplicarFiltro = async () => {
    doacoes.value = []
    pagina.value = 1
    terminou.value = false

    await carregarMais()
}

const editarDoacao = function (doacao) {
    router.push({
        name: 'doacoes.editar',
        params: {
            id: doacao.id
        }
    })
}

const trazerPerfisDoacao = async () => {
    try {
        const dados = await buscarPerfisDoacao()

        perfisDoacao.value = dados.perfisDoacao.map(perfil => ({
            ...perfil,
            nome: perfil.nome.charAt(0).toUpperCase() + perfil.nome.slice(1)
        }))

    } catch (erro) {
        notificarErro(JSON.stringify(erro))
    }
}

const trazerUsuarios = async () => {
    try {
        const dados = await buscarUsuarios()
        usuarios.value = dados.usuarios

    } catch (erro) {
        notificarErro(JSON.stringify(erro))
    }
}

// limpar FILTROS
const limparFiltros = async () => {
    filtros.value = {
        perfil: null,
        usuario: null,
        admin: true,
    }

    doacoes.value = []
    pagina.value = 1
    terminou.value = false

    await carregarMais()
}

onMounted(async () => {
    await trazerPerfisDoacao()
    await trazerUsuarios()
    await carregarMais()
})
</script>