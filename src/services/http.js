import { getToken, removeToken } from './storage'

import { routerInstance } from 'src/router'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function tratarErro(response, data, auth) {

    const erroLogin =
        response.status === 401 && auth === false

    if (erroLogin) {
        throw {
            status: 401,
            message: data?.message || 'Credenciais inválidas',
            data
        }
    }

    const tokenExpirado =
        response.status === 401 && auth === true

    if (tokenExpirado) {
        removeToken()
        routerInstance.push({ name: 'login' })

        throw {
            status: 401,
            message: 'Sessão expirada',
            data
        }
    }

    throw {
        status: response.status,
        message: data?.message || 'Erro inesperado',
        data
    }
}

export async function get(url) {

    const token = await getToken()

    const response = await fetch(`${API_BASE_URL}${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw tratarErro(response, data)
    }

    return data
}

export async function post(url, body = {}, auth = false) {

    let headers = {
        'Content-Type': 'application/json',
    }

    if (auth) {
        const token = await getToken()
        if (token) {
            headers.Authorization = `Bearer ${token}`
        }
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
        throw tratarErro(response, data)
    }

    return data
}

// não deu pra nomear como 'delete' pois é palavra reservada
export async function metodoDelete(url, auth = false) {

    let headers = {
        'Content-Type': 'application/json',
    }

    if (auth) {
        const token = await getToken()
        if (token) {
            headers.Authorization = `Bearer ${token}`
        }
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
        method: 'DELETE',
        headers,
    })

    const data = await response.json()

    if (!response.ok) {
        throw tratarErro(response, data)
    }

    return data
}