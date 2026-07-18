<template>
    <TituloPagina titulo="Usuários" />

    <q-infinite-scroll @load="buscarUsuarios" :offset="250">
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

                        <div class="row items-center q-gutter-sm">
                            <div class="text-subtitle1">
                                <strong>Telefone:</strong> {{ usuario.telefone.telefone }}
                            </div>
                        </div>

                        <div class="row items-center q-gutter-sm" v-if="usuario.endereco">
                            <div class="text-subtitle1">
                                <strong>Endereço:</strong> {{ usuario.endereco.logradouro }}, {{ usuario.endereco.numero
                                }}, {{
                                    usuario.endereco.cidade }} - {{ usuario.endereco.uf }}
                            </div>
                        </div>
                    </div>

                </q-card-section>
            </q-card>
        </div>
    </q-infinite-scroll>
</template>

<script setup>

import { ref } from 'vue'

import TituloPagina from 'src/components/TituloPagina.vue'
import { get } from 'src/services/http'

// Lista exibida
const usuarios = ref([])

// Página atual
const pagina = ref(1)

// Indica se já carregou tudo
const terminou = ref(false)

// Busca usuários
const buscarUsuarios = async (index, done) => {

    // Não existem mais páginas
    if (terminou.value) {
        done()
        return
    }

    try {

        const data = await get(`/user/listarPaginados?page=${pagina.value}`)

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
    }
}

</script>

<style scoped></style>