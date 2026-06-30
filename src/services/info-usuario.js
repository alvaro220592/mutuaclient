import { get } from "./http";

export async function dadosUsuario() {
    return await get('/user/info-usuario')
}