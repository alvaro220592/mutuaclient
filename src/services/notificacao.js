import { get, post } from './http'

export const buscarNotificacoes = (pagina, porPagina) => {
    return get(`/notificacoes?pagina=${pagina}&porPagina=${porPagina}`)
}

export const marcarComoLidas = () => {
    return post('/notificacoes/marcar-como-lidas', {}, true)
}