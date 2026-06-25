<template>
    <div>
        Suas solicitações de doação aqui

        <br>
        <LinkBasico nomeRota="doacoes.solicitadas.novo" icone="add" titulo="Nova" />
        <br>
        <LinkBasico nomeRota="doacoes.opcoes" icone="arrow_back" titulo="Voltar" />
    </div>
</template>

<script setup>
import LinkBasico from 'src/components/LinkBasico.vue';

</script>

<style lang="scss" scoped></style>