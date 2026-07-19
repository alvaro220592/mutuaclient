<template>
    <q-page class="flex flex-center q-pa-sm">

        <div class="box">
            <TituloPagina titulo="Usuários" />

            <div class="column q-gutter-md q-mb-md">
                <q-card flat>
                    <q-input outlined v-model="busca" icon="search" type="text" label="Buscar usuário"
                        @keyup="pesquisar">
                        <template v-slot:append>
                            <q-btn v-if="busca != ''" flat icon="close" @click="limparPesquisa" />
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </q-card>
            </div>

            <div v-if="carregando" class="q-gutter-md q-mb-md row justify-center">
                <q-spinner color="primary" size="3em" />
            </div>

            <q-infinite-scroll @load="buscarUsuarios" :offset="250" ref="scroll">
                <div class="column q-gutter-md">

                    <q-card flat bordered v-for="usuario in usuarios" :key="usuario.id">
                        <q-card-section class="row items-start no-wrap">

                            <div class="col">
                                <div class="row items-center q-gutter-sm">
                                    <div class="text-subtitle1">
                                        <strong>Nome:</strong> {{ usuario.name }}
                                    </div>
                                </div>

                                <div class="row items-center q-gutter-sm">
                                    <div class="text-subtitle1">
                                        <strong>E-mail:</strong> {{ usuario.email }}
                                    </div>
                                </div>

                                <div class="row items-center q-gutter-sm" v-if="usuario.telefone">
                                    <div class="text-subtitle1">
                                        <strong>Telefone:</strong> {{ usuario.telefone.telefone }}
                                    </div>
                                </div>

                                <div class="row items-center q-gutter-sm" v-if="usuario.endereco">
                                    <div class="text-subtitle1">
                                        <strong>Endereço:</strong> {{ usuario.endereco.logradouro }}, {{
                                            usuario.endereco.numero
                                        }}, {{
                                            usuario.endereco.cidade }} - {{ usuario.endereco.uf }}
                                    </div>
                                </div>
                            </div>

                        </q-card-section>
                    </q-card>
                </div>
            </q-infinite-scroll>
        </div>
    </q-page>
</template>

<script setup>

import { ref } from 'vue'

import TituloPagina from 'src/components/TituloPagina.vue'
import { get } from 'src/services/http'
import { debounce } from 'quasar'

// Lista exibida
const usuarios = ref([])

// Página atual
const pagina = ref(1)

// Indica se já carregou tudo
const terminou = ref(false)
const busca = ref('')
const scroll = ref(null)
const carregando = ref(false)

// Busca usuários
const buscarUsuarios = async (index, done) => {

    // Não existem mais páginas
    if (terminou.value) {
        done()
        return
    }

    try {
        carregando.value = true

        const data = await get(`/user/listarPaginados?page=${pagina.value}&busca=${busca.value}`)

        // Adiciona os novos registros
        usuarios.value.push(...data.usuarios.data)

        // Verifica se chegou na última página
        if (data.usuarios.current_page >= data.usuarios.last_page) {
            terminou.value = true
        } else {
            pagina.value++
        }

    } catch (e) {
        console.error(e)
    } finally {
        done()
        carregando.value = false
    }
}

// Usuário digita, pesquisar() limpa os dados, volta página para 1, reseta o infinite-scroll e ele chama buscarUsuarios()
const pesquisar = debounce(async () => {
    usuarios.value = []
    pagina.value = 1
    terminou.value = false

    await buscarUsuarios(1, () => { })
}, 500)

const limparPesquisa = () => {
    pesquisar()
    busca.value = ''
}

</script>

<style scoped></style>