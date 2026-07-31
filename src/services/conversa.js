import { get, post } from './http'

export const buscarConversasUsuario = async () => {
    return await get(`/conversa/todas-usuario-logado`)
}

export const obterConversa = async (usuarioId) => {
    return await get(`/conversa/${usuarioId}`)
}

export const criarConversa = async (usuarioId) => {
    return await post('/conversa', {
        usuario_id: usuarioId
    }, true)
}

export const obterOuCriarConversa = async (outroUsuarioId, moduloId, referenciaId, assunto) => {
    return await post('/conversa', {
        outro_usuario_id: outroUsuarioId,
        modulo_id: moduloId,
        referencia_id: referenciaId,
        assunto: assunto,
    }, true)
}

export const enviarMensagem = async (conversaId, textoMensagem) => {
    return await post('/conversa/enviar-mensagem', {
        conversa_id: conversaId,
        mensagem: textoMensagem,
    }, true)
}