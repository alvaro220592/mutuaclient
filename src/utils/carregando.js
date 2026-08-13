import { Loading } from "quasar"

export const carregandoBasico = () => {
    Loading.show({
        message: 'Carregando'
    })
}

export const ocultarCarregando = () => {
    Loading.hide()
}