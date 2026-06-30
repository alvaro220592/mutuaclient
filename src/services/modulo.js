import { get } from "./http";

export async function modulos() {
    return await get('/modulos')
}