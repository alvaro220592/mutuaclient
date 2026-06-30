import { get, metodoDelete, post } from "./http";

export function buscarSolicitadas() {
    return get('/doacoes/solicitadas')
}

export function buscarCategorias() {
    return get('/doacoes/categorias')
}

export function salvarSolicitada(corpoRequisicao) {
    return post('/doacoes/solicitadas/store', corpoRequisicao, true)
}

export function atualizarSolicitada(id, corpoRequisicao) {
    return post(`/doacoes/solicitadas/update/${id}`, corpoRequisicao, true)
}

// edição
export function buscarSolicitada(id) {
    return get(`/doacoes/solicitadas/edit/${id}`)
}

export function mudarStatusSolicitada(corpoRequisicao) {
    return post('/doacoes/solicitadas/mudar-status', corpoRequisicao, true)
}

export function excluirSolicitada(id) {
    return metodoDelete(`/doacoes/solicitadas/delete/${id}`, true)
}