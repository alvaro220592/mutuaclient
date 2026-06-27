<template>

    <q-page class="flex flex-center q-pa-md">

        <div class="box">

            <TituloPagina titulo="Insira os dados da doação" :botaoVoltar="true" />


            <div class="column q-gutter-md">
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

<style scoped>
.box {
    width: 100%;
    max-width: 380px;
}
</style>

<script setup>
import { dadosPerfilUsuario } from 'src/services/perfilUsuario';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { get, post } from 'src/services/http';
import TituloPagina from 'src/components/TituloPagina.vue';

const router = useRouter()
const $q = useQuasar()

const categorias = ref([])
const categoriasFiltradas = ref([])
const categoriaSelecionada = ref(null)
const categoriaOutrosId = ref()
const categoriaOutrosSelecionada = ref(false)
const detalhes = ref(null)

onMounted(() => {
    verificarInfoUsuario()
    trazerCategorias()
})

watch(categoriaSelecionada, (novoValor) => {
    if (novoValor == categoriaOutrosId.value) {
        categoriaOutrosSelecionada.value = true
    } else {
        categoriaOutrosSelecionada.value = false
    }
})

const verificarInfoUsuario = async () => {
    const dados = await dadosPerfilUsuario()

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
        const dados = await get('/doacoes/categorias')
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

const onSalvar = async () => {
    try {
        await post('/doacoes/novo', {
            categoria_doacao_id: categoriaSelecionada.value,
            detalhes: detalhes.value,
            perfil_doacao_id: 2,
        }, true)

        $q.notify({
            type: 'positive',
            message: 'Doação salva com sucesso',
            position: 'top-right'
        })

        router.replace({ name: 'doacoes.solicitadas.index' })

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