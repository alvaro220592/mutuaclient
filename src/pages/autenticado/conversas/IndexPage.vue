<template>
    <div>
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
import { buscarConversasUsuario } from 'src/services/conversa'
import { notificarErro } from 'src/utils/notificacao'
import { truncar } from 'src/utils/strings'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const conversas = ref([])
const carregando = ref(false)

const trazerConversas = async () => {
    try {
        carregando.value = true
        const dados = await buscarConversasUsuario()
        conversas.value = dados.conversas
        // alert(JSON.stringify(dados))
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
    await trazerConversas()
})

</script>

<style lang="scss" scoped>
#conversas-container {
    height: 78.5vh;
    overflow-y: auto;
}
</style>