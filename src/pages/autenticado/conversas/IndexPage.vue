<template>
    <div>
        <spinner-carregamento v-if="carregando" :carregando="carregando" />

        <div v-else>
            <!-- <q-list separator id="teste" v-if="conversas.length > 0">
                <q-item v-for="conversa in conversas" :key="conversa.id" clickable v-ripple>
                    <q-item-section>
                        <q-item-label class="bg-red-4">
                            {{ conversa.outros_usuarios[0].name }}
                        </q-item-label>

                        <q-item-label caption lines="1" class="bg-blue-4">
                            <div class="row  justify-between">
                                <span>
                                    {{ truncar(conversa.ultimaMensagem?.mensagem, 20) }}
                                </span>
                                <span>
                                    {{ conversa.ultimaMensagem?.dataAmigavel }}
                                </span>
                            </div>
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </q-list> -->

            <div v-if="conversas.length > 0" id="teste" class="q-gutter-md">
                <q-card bordered flat clickable v-ripple class="my-card" v-for="conversa in conversas"
                    :key="conversa.id" @click="irParaChat(conversa)">
                    <q-card-section>
                        <div class="text-weight-bold">{{ conversa.outros_usuarios[0].name }}</div>
                        <div class="text-caption">
                            <strong>Assunto:</strong> {{ conversa.assunto }}
                        </div>
                        <div class="text-caption">
                            <div class="row  justify-between">
                                <span>
                                    {{ truncar(conversa.ultimaMensagem?.mensagem, 20) }}
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
#teste {
    height: 78.5vh;
    overflow-y: auto;
}
</style>