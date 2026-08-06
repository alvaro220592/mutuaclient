<template>
    <div>

        <titulo-pagina titulo="Mensagens" descricao="" />

        <spinner-carregamento v-if="carregando" :carregando="carregando" />

        <div v-else>
            <div v-if="conversas.length > 0" id="conversas-container" class="q-gutter-md">
                <q-card bordered flat clickable v-ripple class="my-card" v-for="conversa in conversas"
                    :key="conversa.id" @click="irParaChat(conversa)">
                    <q-card-section>
                        <div :class="!conversa.ultimaMensagem.minha && !conversa.ultimaMensagem.lida_em ? 'text-weight-bold' : ''"
                            class="q-mb-sm">
                            {{ conversa.outros_usuarios[0].name }}

                            <q-badge v-if="!conversa.ultimaMensagem.minha && !conversa.ultimaMensagem.lida_em" rounded
                                color="red" class="q-ml-sm" />
                        </div>
                        <div class="text-caption">
                            Assunto: {{ conversa.assunto }}
                        </div>
                        <div class="text-caption">
                            <div class="row  justify-between">
                                <span
                                    :class="!conversa.ultimaMensagem.minha && !conversa.ultimaMensagem.lida_em ? 'text-weight-bold' : ''">
                                    {{ truncar(conversa.ultimaMensagem?.mensagem, 30) }}
                                </span>
                                <span>
                                    {{ conversa.ultimaMensagem?.dataAmigavel }}
                                </span>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </div>

            <div v-else class="row justify-center">
                <span>
                    Você ainda não tem mensagens
                </span>
            </div>
        </div>
    </div>

</template>

<script setup>
import SpinnerCarregamento from 'src/components/SpinnerCarregamento.vue'
import TituloPagina from 'src/components/TituloPagina.vue'
import { buscarConversasUsuario } from 'src/services/conversa'
import { obterEcho } from 'src/services/echo'
import { useAuthStore } from 'src/stores/auth'
import { notificarErro } from 'src/utils/notificacao'
import { truncar } from 'src/utils/strings'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const conversas = ref([])
const carregando = ref(false)
let canal = null

const trazerConversas = async () => {
    try {
        carregando.value = true
        const dados = await buscarConversasUsuario()
        conversas.value = dados.conversas

    } catch (e) {
        notificarErro(e.message)
    } finally {
        carregando.value = false
    }
}

const irParaChat = (conversa) => {
    router.push({
        name: 'conversas.chat',
        query: {
            outroUsuarioId: conversa.outros_usuarios[0].id,
            moduloId: conversa.modulo_id,
            referenciaId: conversa.referencia_id,
            assunto: conversa.assunto
        }
    })
}

onMounted(async () => {
    const echo = await obterEcho()

    await trazerConversas()

    canal = echo
        .private(`usuario.${authStore.user.id}`)
        .listen('.mensagem.enviada', () => {
            trazerConversas()
        })
})

onUnmounted(async () => {
    if (canal) {
        const echo = await obterEcho()
        echo.leave(`usuario.${authStore.user.id}`)
    }
})

</script>

<style lang="scss" scoped>
#conversas-container {
    height: 78.5vh;
    overflow-y: auto;
}
</style>