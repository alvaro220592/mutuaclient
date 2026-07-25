<template>
    <div>
        <VisualizacaoModoLista v-if="doacoes.length > 0" :doacoes="doacoes" :funcaoCarregarMais="carregarMais"
            @editar="editarDoacao" @alternar-status="alternarStatus" @excluir="mostrarConfirmacaoExclusao" />
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
import { buscarDoacoesSolicitadasLista } from 'src/services/doacao'

const router = useRouter()

const carregando = ref(false)
const terminou = ref(false)
const pagina = ref(1)
const doacoes = ref([])


// Cria uma instância do composable de ações.
const acoesDoacao = useDoacaoAcoes(doacoes)

// Obtém as funções do composable.
const alternarStatus = acoesDoacao.alternarStatus
const mostrarConfirmacaoExclusao = acoesDoacao.mostrarConfirmacaoExclusao

const carregarMais = async () => {
    await carregarDoacoesLista({
        carregando,
        terminou,
        pagina,
        doacoes,
        buscar: buscarDoacoesSolicitadasLista,
    })
}

const editarDoacao = function (doacao) {
    router.push({
        name: 'doacoes.oferecidas.editar',
        params: {
            id: doacao.id
        }
    })
}

onMounted(async () => {
    await carregarMais()
})
</script>