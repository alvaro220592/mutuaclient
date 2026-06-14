<template>
    <q-page class="flex flex-center q-pa-md">

        <div style="width: 100%; max-width: 380px;">

            <div class="text-h6 q-mb-sm text-center">
                Como você deseja participar?
            </div>

            <div class="text-body2 text-grey text-center q-mb-xl">
                Escolha se deseja oferecer ajuda ou cadastrar uma necessidade.
            </div>

            <div class="column q-gutter-md">

                <q-card clickable bordered @click="navegar('doacoes.oferecidas')">
                    <q-card-section>

                        <div class="text-subtitle1">
                            Quero ajudar
                        </div>

                        <div class="text-caption text-grey">
                            Oferecer doações, itens ou apoio.
                        </div>

                    </q-card-section>
                </q-card>

                <q-card clickable bordered @click="navegar('doacoes.solicitadas')">
                    <q-card-section>

                        <div class="text-subtitle1">
                            Preciso de ajuda
                        </div>

                        <div class="text-caption text-grey">
                            Criar uma solicitação de apoio.
                        </div>

                    </q-card-section>
                </q-card>

                <q-card clickable bordered @click="navegar('home')">
                    <q-card-section>

                        <div class="text-subtitle1">
                            Área ADMIN
                        </div>

                        <div class="text-caption text-grey">
                            Listagem e mapeamento dos registros
                        </div>

                    </q-card-section>
                </q-card>

                <LinkBasico nomeRota="home" titulo="Voltar" />

            </div>

        </div>

    </q-page>
</template>

<script setup>
import LinkBasico from 'src/components/LinkBasico.vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const navegar = (rota) => {
    router.push({
        name: rota
    })
}
</script>