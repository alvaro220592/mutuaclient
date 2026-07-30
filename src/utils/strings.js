export const primeiraLetraMaiuscula = (texto) => {
    const resultado = texto.charAt(0).toUpperCase() + texto.slice(1)
    return resultado
}

export const truncar = (texto, limite) => {
    if (!texto) return ''

    return texto.length > limite
        ? texto.substring(0, limite) + '...'
        : texto
}