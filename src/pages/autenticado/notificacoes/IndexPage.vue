<template>
    <div>

        <q-infinite-scroll @load="onCarregarMais">
            <div class="column q-gutter-md">
                <q-card v-for="notificacao in notificacoes" :key="notificacao.id" flat bordered class="notificacao-card"
                    :class="{ 'notificacao-nao-lida': !notificacao.lida }">
                    <q-card-section class="row items-start no-wrap q-pa-md">

                        <div class="notificacao-icone flex flex-center"
                            :class="notificacao.lida ? 'bg-grey-2 text-grey-7' : 'bg-primary text-white'">
                            <q-icon :name="notificacao.lida ? 'notifications_none' : 'notifications'" size="22px" />
                        </div>

                        <div class="col q-ml-md">

                            <div class="row items-center justify-between no-wrap">
                                <div class="text-subtitle1 text-weight-medium">
                                    {{ notificacao.texto }}
                                </div>

                                <q-badge v-if="!notificacao.lida" rounded color="primary" class="q-ml-sm" />
                            </div>

                            <div class="text-caption text-grey-6 q-mt-xs">
                                {{ notificacao.tempo }}
                            </div>

                        </div>

                        <q-icon v-if="notificacao.link" name="chevron_right" color="grey-5" size="20px"
                            class="q-ml-sm" />

                    </q-card-section>
                </q-card>
            </div>
        </q-infinite-scroll>

        <!-- <q-inner-loading :showing="carregando" color="primary" label="Aguarde" label-style="font-size: 1.1em" /> -->
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNotificacoes } from 'src/composables/useNotificacoes'
import { notificarErro } from 'src/utils/notificacao'
import { carregandoBasico, ocultarCarregando } from 'src/utils/carregando'

const carregando = ref(false)
const terminou = ref(false)
const pagina = ref(1)
const porPagina = ref(10)

const {
    notificacoes,
    carregarNotificacoes,
} = useNotificacoes()

const onCarregarMais = async (_, done) => {
    try {
        carregandoBasico()

        await carregarNotificacoes({
            pagina,
            porPagina,
            carregando,
            terminou,
        })

        done(terminou.value)

    } catch (erro) {
        done()
        notificarErro(erro.message)

    } finally {
        ocultarCarregando()
    }
}

</script>