import { get, metodoDelete, post } from "./http";

// SOLICITADAS
export function buscarSolicitadas(pagina) {
    return get(`/doacoes/solicitadas?page=${pagina}`)
}

export function salvarSolicitada(corpoRequisicao) {
    return post('/doacoes/solicitadas/store', corpoRequisicao, true)
}

export function atualizarSolicitada(id, corpoRequisicao) {
    return post(`/doacoes/solicitadas/update/${id}`, corpoRequisicao, true)
}

// OFERECIDAS
export function buscarOferecidas(pagina) {
    return get(`/doacoes/oferecidas?page=${pagina}`)
}

export function salvarOferecida(corpoRequisicao) {
    return post('/doacoes/oferecidas/store', corpoRequisicao, true)
}

export function atualizarOferecida(id, corpoRequisicao) {
    return post(`/doacoes/oferecidas/update/${id}`, corpoRequisicao, true)
}

export function buscar(pagina, filtros = {}) {
    return get('/doacoes?' + new URLSearchParams({
        page: pagina,
        ...filtros
    }))
}

export function buscarDoacoesOferecidasMapa(filtros = {}) {
    return get('/doacoes/oferecidas/mapa?' + new URLSearchParams(filtros))
}

export function buscarDoacoesOferecidasLista(pagina) {
    return get(`/doacoes/oferecidas/lista?page=${pagina}`)
}

export function buscarDoacoesSolicitadasMapa(filtros = {}) {
    return get('/doacoes/solicitadas/mapa?' + new URLSearchParams(filtros))
}

export function buscarDoacoesSolicitadasLista(pagina) {
    return get(`/doacoes/solicitadas/lista?page=${pagina}`)
}

export function salvar(corpoRequisicao) {
    return post('/doacoes/store', corpoRequisicao, true)
}

export function atualizar(id, corpoRequisicao) {
    return post(`/doacoes/update/${id}`, corpoRequisicao, true)
}

// para edição
export function buscarDoacao(id) {
    return get(`/doacoes/buscar-doacao/${id}`)
}

export function mudarStatus(corpoRequisicao) {
    return post('/doacoes/mudar-status', corpoRequisicao, true)
}

export function excluir(id) {
    return metodoDelete(`/doacoes/delete/${id}`, true)
}

export function buscarCategorias() {
    return get('/doacoes/categorias')
}

export function buscarPerfisDoacao() {
    return get('/doacoes/perfis-doacao')
}