<template>
    <div>
        Form oferecidas

        <br>

        <LinkBasico nomeRota="doacoes.oferecidas.index" icone="arrow_back" titulo="Voltar" />
    </div>
</template>

<script setup>
import LinkBasico from 'src/components/LinkBasico.vue';
import { dadosPerfilUsuario } from 'src/services/perfilUsuario';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

onMounted(() => {
    verificarInfoUsuario()
})

const verificarInfoUsuario = async () => {
    const dados = await dadosPerfilUsuario()

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