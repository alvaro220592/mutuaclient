<template>
    <div>
        <div class="q-mb-md">
            <div class="text-h6">
                {{ doacao.usuario?.name }}
            </div>

            <div class="text-overline text-grey-7">
                Está {{ doacao.perfil_doacao_id === 1 ? 'oferecendo' : 'solicitando' }}
                {{ doacao.categoria?.nome.toLowerCase() }}
            </div>

            <div class="text-grey-7">
                {{ doacao.detalhes ?? 'Sem detalhes.' }}
            </div>
        </div>

        <q-separator class="q-my-lg" />

        <div class="q-mb-md">
            <div class="text-subtitle2 text-weight-medium q-mb-md">
                Contato
            </div>

            <q-list dense>
                <q-item>
                    <q-item-section avatar>
                        <q-icon name="person" color="primary" />
                    </q-item-section>

                    <q-item-section>
                        {{ doacao.usuario?.name ?? 'Não informado' }}
                    </q-item-section>
                </q-item>

                <q-item>
                    <q-item-section avatar>
                        <q-icon name="phone" color="primary" />
                    </q-item-section>

                    <q-item-section>
                        {{ doacao.usuario?.telefone?.telefone ?? 'Não informado' }}
                    </q-item-section>
                </q-item>

                <q-item>
                    <q-item-section avatar>
                        <q-icon name="mail" color="primary" />
                    </q-item-section>

                    <q-item-section>
                        {{ doacao.usuario?.email ?? 'Não informado' }}
                    </q-item-section>
                </q-item>
            </q-list>
        </div>

        <div v-if="mostrarBotaoIrParaChat" class="q-mt-lg text-center">
            <!-- <q-btn outline icon="chat" label="Conversar" padding="8px 20px" unelevated rounded @click="irParaChat" /> -->
            <q-btn color="primary" icon="chat" label="Conversar" unelevated @click="irParaChat" />
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
    doacao: {
        type: Object,
        required: true
    },

    mostrarBotaoIrParaChat: {
        type: Boolean,
        default: false
    },
})

const irParaChat = () => {
    const query = {
        outroUsuarioId: props.doacao.usuario.id,
        moduloId: props.doacao.append_modulo_id,
        referenciaId: props.doacao.id,
        assunto: `Doação de ${props.doacao.categoria.nome} ${props.doacao.perfil.nome} por ${props.doacao.usuario.name}`
    }

    router.push({
        name: 'conversas.chat',
        query
    })
}

</script>

<style lang="scss" scoped></style>