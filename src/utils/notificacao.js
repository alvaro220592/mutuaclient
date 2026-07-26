import { Notify } from 'quasar'

export const notificarSucesso = (message) => {
    Notify.create({
        type: 'positive',
        message,
        position: 'top-right',
        actions: [{ icon: 'close' }]
    })
}

export const notificarErro = (message) => {
    Notify.create({
        type: 'negative',
        message,
        position: 'top-right',
        actions: [{ icon: 'close' }]
    })
}