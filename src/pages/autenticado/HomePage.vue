<template>

    <div>
        <TituloPagina :titulo="`Olá, ${authStore.user?.name}!`" descricao="O que deseja acessar hoje?" />

        <div class="column q-gutter-md">
            <q-card flat v-for="modulo in listaModulos" :key="modulo.id" clickable
                @click="navegar(modulo.slug + '.index')" bordered>

                <q-card-section>
                    <div class="text-subtitle1">
                        <q-icon :name="modulo.icone" />
                        {{ modulo.slug }}
                    </div>

                    <div class="text-caption text-grey">
                        {{ modulo.descricao }}
                    </div>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from 'src/stores/auth'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import { modulos } from 'src/services/modulo';
import TituloPagina from 'src/components/TituloPagina.vue';
import { useQuasar } from 'quasar';

const $q = useQuasar()
const authStore = useAuthStore()
const router = useRouter()
const listaModulos = ref()

onMounted(() => {
    trazerModulos()
})

const trazerModulos = async () => {
    try {
        $q.loading.show({
            message: 'Carregando'
        })
        const dados = await modulos()
        listaModulos.value = dados.modulos || []
    } catch (error) {
        console.log(JSON.stringify(error))
    } finally {
        $q.loading.hide()
    }
}

const navegar = (rota) => {
    router.push({ name: rota }) // ou router.push({ name: 'doacoes.index' })
}

</script>

<style lang="scss" scoped></style>