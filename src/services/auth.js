// Serviço feito para autenticação

import { post } from './http'

import { removeToken, getToken } from 'src/services/storage'

export async function login(email, password) {
    return await post('/auth/login', { email, password }, false)
}

export async function recuperarSenha(email) {
    return await post('/auth/recuperar-senha', { email }, false)
}

export async function cadastrar(name, email, password, password_confirmation) {
    return await post('/auth/cadastrar', { name, email, password, password_confirmation }, false)
}

export async function redefinirSenha(email, codigo_recuperacao, password, password_confirmation) {
    return await post('/auth/redefinir-senha', { email, codigo_recuperacao, password, password_confirmation }, false)
}

export async function logout() {
    await removeToken()
}

export async function usuarioAutenticado() {
    const token = await getToken()
    return !!token
}