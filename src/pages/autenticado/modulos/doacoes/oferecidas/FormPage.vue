<template>
    <div>
        Form oferecidas

        <br>

        <LinkBasico nomeRota="doacoes.oferecidas.index" icone="arrow_back" titulo="Voltar" />
    </div>
</template>

<script setup>
import LinkBasico from 'src/components/LinkBasico.vue';
import { dadosUsuario } from 'src/services/info-usuario';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

onMounted(() => {
    verificarInfoUsuario()
})

const verificarInfoUsuario = async () => {
    const dados = await dadosUsuario()

    if (!dados.usuario.endereco || !dados.usuario.telefone) {
        router.push({
            name: 'usuario.perfil',
            query: {
                returnTo: router.currentRoute.value.fullPath
            }
        })

        $q.notify({
            type: 'negative',
            message: 'Cadastre seu telefone e endereço para oferecer doações',
            position: 'top-right'
        })
    }
}

</script>

<style lang="scss" scoped></style>