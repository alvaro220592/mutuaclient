<template>
    <div>
        <!-- Página que solicita que o usuário aceite os termos de uso e política de privacidade -->


        <q-card class="q-pa-md" style="max-width: 450px; width: 100%;">

            <q-card-section class="text-center">

                <div class="text-h6 q-mb-md">
                    Antes de continuar
                </div>

                <div class="text-body1">
                    Para utilizar o Mútua, você precisa ler e aceitar
                    nossos Termos de Uso e nossa Política de Privacidade.
                </div>

            </q-card-section>


            <q-card-section class="q-gutter-sm">

                <q-btn outline color="" icon="description" label="Visualizar Termos de Uso" class="full-width" />

                <q-btn outline color="" icon="privacy_tip" label="Visualizar Política de Privacidade"
                    class="full-width" />

            </q-card-section>


            <q-card-section>

                <q-checkbox v-model="aceitou" label="Li e aceito os Termos de Uso e a Política de Privacidade" />

            </q-card-section>


            <q-card-actions vertical>

                <q-btn color="primary" label="Continuar" class="full-width" :disabled="!aceitou" />

            </q-card-actions>


        </q-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const aceitou = ref(false)

</script>

<style lang="scss" scoped></style>