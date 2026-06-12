import { ref } from 'vue'
import { modulos } from 'src/services/modulos'

const listaModulos = ref([])
let carregando = false

export function useModulos() {

    const trazerModulos = async () => {

        if (carregando || listaModulos.value.length) {
            return
        }

        try {
            carregando = true

            const dados = await modulos()

            listaModulos.value = dados.modulos || []

        } catch (err) {
            console.error(JSON.stringify(err))

        } finally {
            carregando = false
        }
    }

    return {
        listaModulos,
        trazerModulos
    }
}