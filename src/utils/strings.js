export const primeiraLetraMaiuscula = (texto) => {
    const resultado = texto.charAt(0).toUpperCase() + texto.slice(1)
    return resultado
}