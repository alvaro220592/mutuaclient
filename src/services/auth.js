// Serviço feito para autenticação

import { post } from './http'

import { removeToken, getToken } from 'src/services/storage'

export function login(corpoRequisicao) {
    return post('/auth/login', corpoRequisicao, false)
}

export function recuperarSenha(corpoRequisicao) {
    return post('/auth/recuperar-senha', corpoRequisicao, false)
}

export function cadastrar(corpoRequisicao) {
    return post('/auth/cadastrar', corpoRequisicao, false)
}

export function redefinirSenha(corpoRequisicao) {
    return post('/auth/redefinir-senha', corpoRequisicao, false)
}

export function logout() {
    removeToken()
}

export async function usuarioAutenticado() {
    const token = await getToken()
    return !!token
}