<template>
    <q-layout view="lHh lpr lFf">

        <q-header bordered class="bg-dark">
            <q-toolbar class="justify-between">
                <!-- Botão Voltar: Devolve o usuário para a rota anterior (ex: /conversas) -->
                <q-btn flat round dense icon="arrow_back" @click="$router.back()" />

                <div class="text-center">
                    <span>João - Eletrodomésticos</span>
                    <br>
                    <span class="text-caption">dkfjlsdsdfjksd...</span>
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
                <q-chat-message label="Sunday, 19th" />

                <q-chat-message v-for="mensagem in conversa.mensagens" :key="mensagem.id"
                    :name="mensagem.minha ? 'Eu' : mensagem.user.name" :text="[mensagem.mensagem]"
                    :sent="mensagem.minha" stamp="7 minutes ago" :bg-color="mensagem.minha ? 'purple-8' : ''"
                    :text-color="mensagem.minha ? 'white' : 'black'" />
            </q-page>
        </q-page-container>

        <q-footer class="q-pa-xs bg-dark" bordered>
            <q-toolbar>
                <q-input v-model="texto" outlined placeholder="Digite sua mensagem..." dense rounded
                    class="full-width campo-mensagem" @keyup.enter="enviarMensagem">
                    <template v-slot:after>
                        <q-btn round flat icon="send" color="grey-1" @click="enviarMensagem" />
                    </template>
                </q-input>
            </q-toolbar>
        </q-footer>
    </q-layout>

</template>

<script setup>
import { Dark } from 'quasar';
import { obterOuCriarConversa } from 'src/services/conversa';
import { armazenarTema } from 'src/services/storage';
import { useAuthStore } from 'src/stores/auth';
import { notificarErro } from 'src/utils/notificacao';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore()

onMounted(() => {
    abrirConversa(authStore.user.id)
})

const texto = ref('')

const conversa = {
    mensagens: [
        {
            id: 1,
            user_id: 1,
            mensagem: 'Boa tarde. Ainda está disponível?',
            minha: true,
            user: {
                id: 1,
                name: 'Maria'
            }
        },

        {
            id: 2,
            user_id: 2,
            mensagem: 'Boa tarde. Sim, está.',
            minha: false,
            user: {
                id: 2,
                name: 'João'
            }
        },

        {
            id: 3,
            user_id: 1,
            mensagem: 'Onde eu posso pegar?',
            minha: true,
            user: {
                id: 1,
                name: 'Maria'
            }
        },

        {
            id: 4,
            user_id: 2,
            mensagem: 'Pode me encontrar em frente ao atacadão',
            minha: false,
            user: {
                id: 2,
                name: 'João'
            }
        },

        {
            id: 5,
            user_id: 1,
            mensagem: 'ok',
            minha: true,
            user: {
                id: 2,
                name: 'Maria'
            }
        },

        {
            id: 5,
            user_id: 2,
            mensagem: 'Pode me passar seu whats?',
            minha: false,
            user: {
                id: 1,
                name: 'João'
            }
        },

        {
            id: 6,
            user_id: 1,
            mensagem: 'Sim: 11 9999-9874',
            minha: true,
            user: {
                id: 2,
                name: 'Maria'
            }
        },

        {
            id: 7,
            user_id: 2,
            mensagem: 'Que horas vc pode ir lá?',
            minha: false,
            user: {
                id: 1,
                name: 'João'
            }
        }
    ]
}

const enviarMensagem = async () => {
    alert('msg')
}

const alternarTema = async () => {
    Dark.toggle()
    await armazenarTema(Dark.mode)
}

const abrirConversa = async () => {
    try {
        const dados = await obterOuCriarConversa(1, 1, 3) // dinamizar no redirecionamento pra essa página
        alert(JSON.stringify(dados))
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