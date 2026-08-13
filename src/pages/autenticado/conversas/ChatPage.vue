<template>
    <q-layout view="lHh lpr lFf">

        <q-header bordered class="bg-dark chat-header">
            <q-toolbar class="justify-between">
                <!-- Botão Voltar: Devolve o usuário para a rota anterior (ex: /conversas) -->
                <q-btn flat round dense icon="arrow_back" @click="$router.back()" />

                <div class="column items-center no-wrap">
                    <div class="text-subtitle1 text-weight-medium">
                        {{ conversa.outros_usuarios?.[0]?.name }}
                    </div>

                    <div v-if="conversa.assunto" class="text-caption text-grey-5 ellipsis cursor-pointer"
                        style="max-width: 100%;" @click="mostrarAssuntoConversa = true">
                        {{ conversa.assunto }}
                    </div>

                    <q-dialog v-model="mostrarAssuntoConversa">
                        <q-card style="min-width: 320px" flat bordered>
                            <q-card-section class="text-subtitle1">
                                Assunto
                            </q-card-section>

                            <q-card-section>
                                {{ conversa.assunto }}
                            </q-card-section>

                            <q-card-actions align="right">
                                <q-btn flat label="Fechar" v-close-popup />
                            </q-card-actions>
                        </q-card>
                    </q-dialog>
                </div>

                <!-- Botão de Opções Rápidas -->
                <q-btn flat round dense icon="more_vert">
                    <q-menu auto-close class="rounded-borders">
                        <q-list style="min-width: 180px">

                            <q-item class="text-primary" clickable @click="alternarTema">
                                <q-item-section avatar>
                                    <q-icon :name="Dark.isActive ? 'light_mode' : 'dark_mode'" />
                                </q-item-section>
                                <q-item-section>Alterar tema</q-item-section>
                            </q-item>

                            <q-separator />

                            <!-- Opção 3: Bloquear (Ação Crítica) -->
                            <q-item clickable @click="bloquearUsuario">
                                <q-item-section avatar>
                                    <q-icon name="block" color="negative" />
                                </q-item-section>
                                <q-item-section class="text-negative">Bloquear</q-item-section>
                            </q-item>

                            <!-- Opção 3: Bloquear (Ação Crítica) -->
                            <q-item clickable @click="denunciarAbuso">
                                <q-item-section avatar>
                                    <q-icon name="report" color="negative" />
                                </q-item-section>
                                <q-item-section class="text-negative">Denunciar</q-item-section>
                            </q-item>

                        </q-list>
                    </q-menu>
                </q-btn>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <q-page class="column no-wrap" :class="Dark.isActive ? 'chat-dark' : 'chat-light'">
                <q-scroll-area ref="scrollAreaRef" class="chat-scroll">
                    <q-chat-message class="q-mx-md" v-for="mensagem in conversa.mensagens" :key="mensagem.id"
                        :name="mensagem.minha ? 'Eu' : mensagem.usuario.name" :text="[mensagem.mensagem]"
                        :sent="mensagem.minha" :stamp="mensagem.dataAmigavel"
                        :bg-color="mensagem.minha ? 'purple-8' : ''" :text-color="mensagem.minha ? 'white' : 'black'" />
                </q-scroll-area>
            </q-page>
        </q-page-container>

        <q-footer class="q-pa-xs bg-dark chat-footer" bordered style="padding-bottom: env(safe-area-inset-bottom);">
            <q-toolbar>
                <q-input v-model="textoMensagem" outlined placeholder="Digite sua mensagem..." dense rounded
                    class="full-width campo-mensagem" @keyup.enter="enviarMsg">
                    <template v-slot:after>
                        <q-btn round flat icon="send" color="grey-1" @click="enviarMsg" />
                    </template>
                </q-input>
            </q-toolbar>
        </q-footer>

        <q-dialog v-model="mostrarAvisoInicialConversa">
            <q-card style="min-width: 320px" flat bordered>
                <q-card-section class="text-h6 text-center text-weight-medium">
                    Dicas de segurança
                </q-card-section>

                <q-card-section class="text-center">
                    Antes de iniciar a conversa, lembre-se:
                </q-card-section>

                <q-card-section>

                    <q-list class="q-gutter-y-sm">

                        <q-item class="bg-blue-1 text-blue-10 rounded-borders">
                            <q-item-section avatar>
                                <q-icon name="shield" />
                            </q-item-section>

                            <q-item-section>
                                Encontre-se, sempre que possível, em um local público.
                            </q-item-section>
                        </q-item>

                        <q-item class="bg-red-1 text-red-10 rounded-borders">
                            <q-item-section avatar>
                                <q-icon name="payments" />
                            </q-item-section>

                            <q-item-section>
                                Nunca envie dinheiro para receber uma doação.
                            </q-item-section>
                        </q-item>

                        <q-item class="bg-orange-1 text-orange-10 rounded-borders">
                            <q-item-section avatar>
                                <q-icon name="lock" />
                            </q-item-section>

                            <q-item-section>
                                Não compartilhe senhas, códigos de verificação ou dados bancários.
                            </q-item-section>
                        </q-item>

                        <q-item class="bg-green-1 text-green-10 rounded-borders">
                            <q-item-section avatar>
                                <q-icon name="favorite" />
                            </q-item-section>

                            <q-item-section>
                                Mantenha uma conversa respeitosa com o outro participante.
                            </q-item-section>
                        </q-item>

                    </q-list>

                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Entendi" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-layout>

</template>

<script setup>
import { Dark } from 'quasar';
import { enviarMensagem, obterOuCriarConversa } from 'src/services/conversa';
import { armazenarTema } from 'src/services/storage';
import { notificarErro } from 'src/utils/notificacao';
// import { truncar } from 'src/utils/strings';
import { nextTick, onMounted, onUnmounted, ref, useTemplateRef } from 'vue';
import { useRoute } from 'vue-router';
import { obterEcho } from 'src/services/echo'
import { carregandoBasico, ocultarCarregando } from 'src/utils/carregando';

const route = useRoute()

const textoMensagem = ref('')
const detalhes = ref('')
const conversa = ref({})
const scrollAreaRef = useTemplateRef('scrollAreaRef')
const mostrarAssuntoConversa = ref(false)
const mostrarAvisoInicialConversa = ref(false)

let canal = null

onMounted(async () => {
    const echo = await obterEcho()

    await abrirConversa()

    canal = echo
        .private(`conversa.${conversa.value.id}`)
        .listen('.mensagem.enviada', (evento) => {
            adicionarMensagemNoChat(evento.mensagem)
        })

    scroll()
})

onUnmounted(async () => {
    if (canal) {
        const echo = await obterEcho()
        echo.leave(`conversa.${conversa.value.id}`)
    }
})

function scroll() {
    scrollAreaRef.value.setScrollPosition('vertical', 100000)
}

const enviarMsg = async () => {
    try {
        const dados = await enviarMensagem(conversa.value.id, textoMensagem.value)
        adicionarMensagemNoChat(dados.mensagem)
        textoMensagem.value = ''
    } catch (e) {
        notificarErro(e.message)
    }
}

const adicionarMensagemNoChat = async (mensagem) => {
    const existe = conversa.value.mensagens.some(
        item => item.id === mensagem.id
    )

    if (!existe) {
        conversa.value.mensagens.push(mensagem)

        await nextTick()

        scroll()
    }
}

const alternarTema = async () => {
    Dark.toggle()
    await armazenarTema(Dark.mode)
}

const abrirConversa = async () => {
    try {
        carregandoBasico()

        const dados = await obterOuCriarConversa(
            route.query.outroUsuarioId,
            route.query.moduloId,
            route.query.referenciaId,
            route.query.assunto,
        )

        conversa.value = dados.conversa
        detalhes.value = dados.conversa.detalhes

        if (conversa.value.mensagens.length == 0) {
            mostrarAvisoInicialConversa.value = true
        }

    } catch (e) {
        notificarErro(e.message)

    } finally {
        ocultarCarregando()
    }
}

</script>

<style lang="scss" scoped>
.campo-mensagem {
    :deep(.q-field__control:before) {
        border-color: rgba(255, 255, 255, 0.47);
    }

    :deep(.q-field__label) {
        color: rgba(255, 255, 255, 0.7);
    }

    :deep(input) {
        color: white;
    }
}

.chat-light {
    background-color: #eeeeee;
    background-image: radial-gradient(#d0d0d0 1px, transparent 1px);
    background-size: 12px 12px;
}

.chat-dark {
    background-color: #212121;
    background-image: radial-gradient(#444 1px, transparent 1px);
    background-size: 12px 12px;
}

.chat-header {
    height: 50px;
}

.chat-scroll {
    height: calc(100vh - 110px);
}

.chat-footer {
    height: 60px;
}
</style>