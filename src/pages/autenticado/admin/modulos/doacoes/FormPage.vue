<template>

    <q-page class="flex flex-center q-pa-md">

        <div class="box">

            <TituloPagina titulo="Insira os dados da doação" />

            <div class="column q-gutter-md">
                <q-select outlined v-model="usuarioSelecionado" :options="usuariosFiltrados" option-label="name"
                    option-value="id" emit-value map-options use-input input-debounce="0" @filter="filtrarUsuarios"
                    behavior="dialog" clearable label="Selecione um usuario para atribuir" />

                <q-select outlined v-model="perfilDoacaoSelecionado" :options="perfisDoacaoFiltrados"
                    option-label="nome" option-value="id" emit-value map-options use-input input-debounce="0"
                    @filter="filtrarPerfisDoacao" behavior="dialog" clearable label="Selecione um perfil de doação" />

                <q-select outlined v-model="categoriaSelecionada" :options="categoriasFiltradas" option-label="nome"
                    option-value="id" emit-value map-options use-input input-debounce="0" @filter="filtrarCategorias"
                    behavior="dialog" clearable label="Selecione uma categoria" />

                <q-input type="textarea" outlined v-model="detalhes"
                    :label="`Detalhes (${categoriaOutrosSelecionada ? 'Obrigatório' : 'Opcional'})`" />

                <q-btn color="primary" label="Salvar" @click.prevent="onSalvar" />
            </div>
        </div>
    </q-page>

</template>

<style scoped></style>

<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import TituloPagina from 'src/components/TituloPagina.vue';
import { buscarCategorias, buscarDoacao, salvar, atualizar, buscarPerfisDoacao } from 'src/services/doacao';
import { buscarUsuarios } from 'src/services/info-usuario';

const router = useRouter()
const route = useRoute()
const $q = useQuasar()

const usuarios = ref([])
const usuariosFiltrados = ref([])
const usuarioSelecionado = ref(null)

const categorias = ref([])
const categoriasFiltradas = ref([])
const categoriaSelecionada = ref(null)

const perfisDoacao = ref([])
const perfisDoacaoFiltrados = ref([])
const perfilDoacaoSelecionado = ref(null)

const categoriaOutrosId = ref()
const categoriaOutrosSelecionada = ref(false)
const detalhes = ref(null)
const modoEdicao = computed(() => !!route.params.id)

onMounted(async () => {
    trazerCategorias()

    trazerUsuarios()

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

function filtrarUsuarios(val, update) {
    if (val === '') {
        update(() => {
            usuariosFiltrados.value = usuarios.value
        })
        return
    }

    update(() => {
        const termo = val.toLowerCase()

        usuariosFiltrados.value = usuarios.value.filter(usuario =>
            usuario.name.toLowerCase().includes(termo)
        )
    })
}

function filtrarPerfisDoacao(val, update) {
    if (val === '') {
        update(() => {
            perfisDoacaoFiltrados.value = perfisDoacao.value
        })
        return
    }

    update(() => {
        const termo = val.toLowerCase()

        perfisDoacaoFiltrados.value = perfisDoacao.value.filter(perfilDoacao =>
            perfilDoacao.nome.toLowerCase().includes(termo)
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
        $q.notify({
            type: 'negative',
            message: JSON.stringify(erro),
            position: 'top-right'
        })
    }
}

const trazerUsuarios = async () => {
    try {
        const dados = await buscarUsuarios()
        usuarios.value = dados.usuarios
        usuariosFiltrados.value = dados.usuarios

    } catch (erro) {
        $q.notify({
            type: 'negative',
            message: JSON.stringify(erro),
            position: 'top-right'
        })
    }
}

const trazerPerfisDoacao = async () => {
    try {
        const dados = await buscarPerfisDoacao()

        perfisDoacao.value = dados.perfisDoacao.map(perfil => ({
            ...perfil,
            nome: perfil.nome.charAt(0).toUpperCase() + perfil.nome.slice(1)
        }))

        perfisDoacaoFiltrados.value = perfisDoacao.value

    } catch (erro) {
        $q.notify({
            type: 'negative',
            message: JSON.stringify(erro),
            position: 'top-right'
        })
    }
}

const carregarDoacao = async (id) => {
    try {
        const dados = await buscarDoacao(id)
        categoriaSelecionada.value = dados.doacao.categoria_doacao_id
        perfilDoacaoSelecionado.value = dados.doacao.perfil_doacao_id
        usuarioSelecionado.value = dados.doacao.user_id
        detalhes.value = dados.doacao.detalhes

    } catch (error) {
        alert(JSON.stringify(error))
    }
}

const onSalvar = async () => {
    try {
        const payload = {
            user_id: usuarioSelecionado.value,
            categoria_doacao_id: categoriaSelecionada.value,
            perfil_doacao_id: perfilDoacaoSelecionado.value,
            detalhes: detalhes.value,
        }

        if (modoEdicao.value) {
            await atualizar(route.params.id, payload, true)

        } else {
            await salvar(payload, true)
        }

        $q.notify({
            type: 'positive',
            message: 'Doação salva com sucesso',
            position: 'top-right'
        })

        router.replace({ name: 'admin.doacoes.index' })
    }
    catch (erro) {
        $q.notify({
            type: 'negative',
            message: JSON.stringify(erro.message),
            position: 'top-right'
        })
    }
}

</script>