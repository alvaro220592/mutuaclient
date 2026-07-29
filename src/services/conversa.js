import { get, post } from './http'

export const obterConversa = async (usuarioId) => {
    return await get(`/conversa/${usuarioId}`)
}

export const criarConversa = async (usuarioId) => {
    return await post('/conversa', {
        usuario_id: usuarioId
    }, true)
}

export const obterOuCriarConversa = async (usuarioDoacaoId, moduloId, referenciaId) => {
    return await post('/conversa', {
        usuario_doacao_id: usuarioDoacaoId,
        modulo_id: moduloId,
        referencia_id: referenciaId,
    }, true)
}