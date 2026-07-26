<template>
    <div>
        <TituloPagina titulo="Insira os dados da doação" />

        <div class="column q-gutter-md">
            <q-select outlined v-model="categoriaSelecionada" :options="categoriasFiltradas" option-label="nome"
                option-value="id" emit-value map-options use-input input-debounce="0" @filter="filtrarCategorias"
                behavior="dialog" clearable label="Selecione uma categoria" />

            <q-input type="textarea" outlined v-model="detalhes"
                :label="`Detalhes (${categoriaOutrosSelecionada ? 'Obrigatório' : 'Opcional'})`" />

            <q-btn class="botao-primario" label="Salvar" @click.prevent="salvar" />
        </div>
    </div>

</template>

<style scoped></style>

<script setup>
import { useVerificarInfoUsuario } from 'src/composables/useVerificarInfoUsuario'
import { onMounted, ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import TituloPagina from 'src/components/TituloPagina.vue';
import { buscarCategorias, buscarDoacao, salvarSolicitada, atualizarSolicitada } from 'src/services/doacao';
import { notificarErro, notificarSucesso } from 'src/utils/notificacao';

const router = useRouter()
const route = useRoute()

const categorias = ref([])
const categoriasFiltradas = ref([])
const categoriaSelecionada = ref(null)
const categoriaOutrosId = ref()
const categoriaOutrosSelecionada = ref(false)
const detalhes = ref(null)
const modoEdicao = computed(() => !!route.params.id)
const { verificarInfoUsuario } = useVerificarInfoUsuario()

onMounted(async () => {
    verificarInfoUsuario()
    trazerCategorias()

    if (modoEdicao.value) {
        await carregarDoacao(route.params.id)
    }
})

watch(categoriaSelecionada, (novoValor) => {
    if (novoValor == categoriaOutrosId.value) {
        categoriaOutrosSelecionada.value = true
    } else {
        categoriaOutrosSelecionada.value = false
    }
})

function filtrarCategorias(val, update) {
    if (val === '') {
        update(() => {
            categoriasFiltradas.value = categorias.value
        })
        return
    }

    update(() => {
        const termo = val.toLowerCase()

        categoriasFiltradas.value = categorias.value.filter(categoria =>
            categoria.nome.toLowerCase().includes(termo)
        )
    })
}

const trazerCategorias = async () => {
    try {
        const dados = await buscarCategorias()
        categorias.value = dados.categorias
        categoriasFiltradas.value = dados.categorias
        categoriaOutrosId.value = dados.categoriaOutrosId
    }
    catch (erro) {
        notificarErro(JSON.stringify(erro))
    }
}

const carregarDoacao = async (id) => {
    try {
        const dados = await buscarDoacao(id)
        categoriaSelecionada.value = dados.doacao.categoria_doacao_id
        detalhes.value = dados.doacao.detalhes

    } catch (error) {
        notificarErro(JSON.stringify(error))
    }
}

const salvar = async () => {
    try {
        const payload = {
            categoria_doacao_id: categoriaSelecionada.value,
            detalhes: detalhes.value,
        }

        if (modoEdicao.value) {
            await atualizarSolicitada(route.params.id, payload, true)

        } else {
            await salvarSolicitada(payload, true)
        }

        notificarSucesso('Doação salva com sucesso')

        router.replace({ name: 'doacoes.solicitadas.index' })
    }
    catch (erro) {
        notificarErro(erro.message)
    }
}

</script>