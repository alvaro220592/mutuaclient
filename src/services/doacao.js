import { get, metodoDelete, post } from "./http";

export function buscarSolicitadas(pagina) {
    return get(`/doacoes/solicitadas?page=${pagina}`)
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
export function buscarDoacao(id) {
    return get(`/doacoes/buscar-doacao/${id}`)
}

export function mudarStatus(corpoRequisicao) {
    return post('/doacoes/mudar-status', corpoRequisicao, true)
}

export function excluir(id) {
    return metodoDelete(`/doacoes/delete/${id}`, true)
}