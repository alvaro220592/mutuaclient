import { get } from "./http";

export async function dadosPerfilUsuario() {
    return await get('/user/info-perfil')
}