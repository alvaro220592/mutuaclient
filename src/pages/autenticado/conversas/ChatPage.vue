<template>
    <q-layout view="lHh lpr lFf">

        <q-header bordered class="bg-dark">
            <q-toolbar class="justify-between">
                <!-- Botão Voltar: Devolve o usuário para a rota anterior (ex: /conversas) -->
                <q-btn flat round dense icon="arrow_back" @click="$router.back()" />

                <div class="text-center">
                    <span>{{ conversa.outros_usuarios?.[0]?.name }}</span>
                    <br>
                    <span v-if="detalhes" class="text-caption">{{ truncar(detalhes, 40) }}</span>
                </div>

                <!-- Botão de Opções Rápidas -->
                <q-btn flat round dense icon="more_vert">
                    <q-menu auto-close class="rounded-borders">
                        <q-list style="min-width: 180px">

                            <!-- Opção 1: Ver Perfil -->
                            <q-item clickable @click="verPerfil">
                                <q-item-section avatar>
                                    <q-icon name="person" color="primary" />
                                </q-item-section>
                                <q-item-section>Ver Perfil</q-item-section>
                            </q-item>

                            <!-- Opção 2: Limpar Conversa -->
                            <q-item clickable @click="limparHistorico">
                                <q-item-section avatar>
                                    <q-icon name="cleaning_services" color="warning" />
                                </q-item-section>
                                <q-item-section>Limpar histórico</q-item-section>
                            </q-item>

                            <q-item clickable @click="alternarTema">
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

                        </q-list>
                    </q-menu>
                </q-btn>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <q-page class="q-pa-md column justify-end" :class="Dark.isActive ? 'bg-grey-10' : 'bg-grey-4'">
                <!-- <q-chat-message label="Sunday, 19th" /> -->

                <q-chat-message v-for="mensagem in conversa.mensagens" :key="mensagem.id"
                    :name="mensagem.minha ? 'Eu' : mensagem.usuario.name" :text="[mensagem.mensagem]"
                    :sent="mensagem.minha" stamp="7 minutes ago" :bg-color="mensagem.minha ? 'purple-8' : ''"
                    :text-color="mensagem.minha ? 'white' : 'black'" />
            </q-page>
        </q-page-container>

        <q-footer class="q-pa-xs bg-dark" bordered>
            <q-toolbar>
                <q-input v-model="textoMensagem" outlined placeholder="Digite sua mensagem..." dense rounded
                    class="full-width campo-mensagem" @keyup.enter="enviarMsg">
                    <template v-slot:after>
                        <q-btn round flat icon="send" color="grey-1" @click="enviarMsg" />
                    </template>
                </q-input>
            </q-toolbar>
        </q-footer>
    </q-layout>

</template>

<script setup>
import { Dark } from 'quasar';
import { enviarMensagem, obterOuCriarConversa } from 'src/services/conversa';
import { armazenarTema } from 'src/services/storage';
import { notificarErro } from 'src/utils/notificacao';
import { truncar } from 'src/utils/strings';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { obterEcho } from 'src/services/echo'

const route = useRoute()

const textoMensagem = ref('')
const detalhes = ref('')

const conversa = ref({})

let canal = null

onMounted(async () => {
    const echo = await obterEcho()

    await abrirConversa()

    canal = echo
        .private(`conversa.${conversa.value.id}`)
        .listen('.mensagem.enviada', (evento) => {
            adicionarMensagemNoChat(evento.mensagem)
        })
})

onUnmounted(async () => {
    if (canal) {
        const echo = await obterEcho()
        echo.leave(`conversa.${conversa.value.id}`)
    }
})

const enviarMsg = async () => {
    try {
        const dados = await enviarMensagem(conversa.value.id, textoMensagem.value)
        adicionarMensagemNoChat(dados.mensagem)
        textoMensagem.value = ''
    } catch (e) {
        notificarErro(e.message)
    }
}

const adicionarMensagemNoChat = (mensagem) => {
    const existe = conversa.value.mensagens.some(
        item => item.id === mensagem.id
    )

    if (!existe) {
        conversa.value.mensagens.push(mensagem)
    }
}

const alternarTema = async () => {
    Dark.toggle()
    await armazenarTema(Dark.mode)
}

const abrirConversa = async () => {
    try {
        const dados = await obterOuCriarConversa(
            route.query.outroUsuarioId,
            route.query.moduloId,
            route.query.referenciaId,
            route.query.assunto,
        )

        conversa.value = dados.conversa
        detalhes.value = dados.conversa.detalhes

    } catch (e) {
        notificarErro(e.message)
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
</style>