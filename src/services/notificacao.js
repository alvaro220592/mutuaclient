import { get, post } from './http'

export const buscarNotificacoes = (pagina, porPagina) => {
    return get(`/notificacoes?page=${pagina}&perPage=${porPagina}`)
}

export const marcarComoLidas = () => {
    return post('/notificacoes/marcar-como-lidas', {}, true)
}