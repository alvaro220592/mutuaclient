<template>
    <div>
        <TituloPagina titulo="Insira os dados da doação" />

        <div class="column q-gutter-md">
            <q-select outlined v-model="perfilDoacaoSelecionado" :options="perfisDoacaoFiltrados"
                option-label="descricao" option-value="id" emit-value map-options use-input input-debounce="0"
                @filter="filtrarPerfisDoacao" behavior="dialog" clearable label="Deseja doar ou precisa de algo?" />

            <q-select outlined v-model="categoriaSelecionada" :options="categoriasFiltradas" option-label="nome"
                option-value="id" emit-value map-options use-input input-debounce="0" @filter="filtrarCategorias"
                behavior="dialog" clearable label="Do que se trata a doação?" />

            <q-input type="textarea" outlined v-model="detalhes"
                :label="`Detalhes (${categoriaOutrosSelecionada ? 'Obrigatório' : 'Opcional'})`" />

            <q-btn class="botao-primario" label="Salvar" @click.prevent="onSalvar" />
        </div>
    </div>
</template>

<style scoped></style>

<script setup>
import { useVerificarInfoUsuario } from 'src/composables/useVerificarInfoUsuario'
import { onMounted, ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import TituloPagina from 'src/components/TituloPagina.vue';
import { buscarCategorias, buscarDoacao, salvar, atualizar, buscarPerfisDoacao } from 'src/services/doacao';
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

const perfisDoacao = ref([])
const perfisDoacaoFiltrados = ref([])
const perfilDoacaoSelecionado = ref(null)

const { verificarInfoUsuario } = useVerificarInfoUsuario()

onMounted(async () => {
    verificarInfoUsuario()
    trazerCategorias()
    trazerPerfisDoacao()

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

const trazerPerfisDoacao = async () => {
    try {
        const dados = await buscarPerfisDoacao()

        perfisDoacao.value = dados.perfisDoacao.map(perfil => ({
            ...perfil,
            nome: perfil.nome.charAt(0).toUpperCase() + perfil.nome.slice(1)
        }))

        perfisDoacaoFiltrados.value = perfisDoacao.value

    } catch (erro) {
        notificarErro(JSON.stringify(erro))
    }
}

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
        perfilDoacaoSelecionado.value = dados.doacao.perfil_doacao_id
        categoriaSelecionada.value = dados.doacao.categoria_doacao_id
        detalhes.value = dados.doacao.detalhes

    } catch (error) {
        alert(JSON.stringify(error) ?? error)
    }
}

const onSalvar = async () => {
    try {
        const payload = {
            categoria_doacao_id: categoriaSelecionada.value,
            perfil_doacao_id: perfilDoacaoSelecionado.value,
            detalhes: detalhes.value,
        }

        if (modoEdicao.value) {
            await atualizar(route.params.id, payload, true)

        } else {
            await salvar(payload, true)
        }

        notificarSucesso('Salvo com sucesso')

        router.replace({ name: 'doacoes.index' })
    }
    catch (erro) {
        notificarErro(erro.message)
    }
}

</script>