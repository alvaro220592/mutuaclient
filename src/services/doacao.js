import { get, metodoDelete, post } from "./http";

const removerValoresNulos = (objeto) => {
    return Object.fromEntries(
        Object.entries(objeto).filter(entrada => entrada[1] != null)
    )
}

export function buscarDoacoesLista(pagina, filtros = {}) {
    const filtrosValidos = removerValoresNulos(filtros)

    return get('/doacoes/lista?' + new URLSearchParams({
        page: pagina,
        ...filtrosValidos
    }))
}

export function buscarDoacoesMapa(filtros = {}) {
    const filtrosValidos = removerValoresNulos(filtros)

    return get('/doacoes/mapa?' + new URLSearchParams(filtrosValidos))
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