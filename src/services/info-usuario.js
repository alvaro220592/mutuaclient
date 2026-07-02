import { get } from "./http";

export async function dadosUsuario() {
    return await get('/user/info-usuario')
}

export async function buscarUsuarios() {
    return await get('/user/todos')
}