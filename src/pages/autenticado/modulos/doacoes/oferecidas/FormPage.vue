<template>

    <q-page class="flex flex-center q-pa-md">

        <div class="box">

            <TituloPagina titulo="Insira os dados da doação" />

            <div class="column q-gutter-md">
                <q-select outlined v-model="categoriaSelecionada" :options="categoriasFiltradas" option-label="nome"
                    option-value="id" emit-value map-options use-input input-debounce="0" @filter="filtrarCategorias"
                    behavior="dialog" clearable label="Selecione uma categoria" />

                <q-input type="textarea" outlined v-model="detalhes"
                    :label="`Detalhes (${categoriaOutrosSelecionada ? 'Obrigatório' : 'Opcional'})`" />

                <q-btn color="primary" label="Salvar" @click.prevent="salvar" />
            </div>
        </div>
    </q-page>

</template>

<style scoped></style>

<script setup>
import { dadosUsuario } from 'src/services/info-usuario';
import { onMounted, ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import TituloPagina from 'src/components/TituloPagina.vue';
import { buscarCategorias, buscarDoacao, salvarOferecida, atualizarOferecida } from 'src/services/doacao';

const router = useRouter()
const route = useRoute()
const $q = useQuasar()

const categorias = ref([])
const categoriasFiltradas = ref([])
const categoriaSelecionada = ref(null)
const categoriaOutrosId = ref()
const categoriaOutrosSelecionada = ref(false)
const detalhes = ref(null)
const modoEdicao = computed(() => !!route.params.id)

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

const verificarInfoUsuario = async () => {
    const dados = await dadosUsuario()

    if (!dados.usuario.endereco || !dados.usuario.telefone) {
        router.push({
            name: 'usuario.perfil',
            query: {
                returnTo: router.currentRoute.value.fullPath
            }
        })

        $q.notify({
            type: 'negative',
            message: 'Cadastre seu telefone e endereço para solicitar doações',
            position: 'top-right'
        })
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
        detalhes.value = dados.doacao.detalhes

    } catch (error) {
        alert(JSON.stringify(error))
    }
}

const salvar = async () => {
    try {
        const payload = {
            categoria_doacao_id: categoriaSelecionada.value,
            detalhes: detalhes.value,
        }

        if (modoEdicao.value) {
            await atualizarOferecida(route.params.id, payload, true)

        } else {
            await salvarOferecida(payload, true)
        }

        $q.notify({
            type: 'positive',
            message: 'Doação salva com sucesso',
            position: 'top-right'
        })

        router.replace({ name: 'doacoes.oferecidas.index' })
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