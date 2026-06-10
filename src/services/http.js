import { getToken } from './storage'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

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
        throw {
            status: response.status,
            message: data?.message || 'Erro na requisição',
            data,
        }
    }

    return data
}

export async function post(url, body, auth) {
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
        throw {
            status: response.status,
            message: data?.message || 'Erro na requisição',
            data,
        }
    }

    return data
}