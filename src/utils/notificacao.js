import { Notify } from 'quasar'

export const notificarSucesso = (message) => {
    Notify.create({
        type: 'positive',
        message,
        position: 'top-right',
        classes: 'posicao-toast-abaixo-header',
        actions: [{ icon: 'close', color: 'white' }]
    })
}

export const notificarErro = (message) => {
    Notify.create({
        type: 'negative',
        message,
        position: 'top-right',
        classes: 'posicao-toast-abaixo-header',
        actions: [{ icon: 'close', color: 'white' }]
    })
}

export const notificacaoGeral = ({
    icone,
    mensagem,
    router,
    acoes = null,
    query = null
}) => {
    Notify.create({
        type: 'info',
        icon: icone,
        message: mensagem,
        position: 'top-right',
        timeout: 4000,
        classes: 'posicao-toast-abaixo-header',

        actions: acoes
            ? [
                {
                    label: acoes.label,
                    color: 'white',
                    handler: () => {
                        router.push({
                            name: acoes.rota,
                            query
                        })
                    }
                }
            ]
            : []
    })
}