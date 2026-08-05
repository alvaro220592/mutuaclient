export const carregarDoacoesMapa = async ({
    carregando,
    filtros,
    categoriasDoacao,
    perfisDoacao,
    doacoes,
    latitudeInicial,
    longitudeInicial,
    moduloId,
    buscar
}) => {

    try {
        carregando.value = true

        const dados = await buscar(filtros.value)

        categoriasDoacao.value = dados.categoriasDoacao

        perfisDoacao.value = dados.perfisDoacao.map(perfil => ({
            ...perfil,
            nome: perfil.nome.charAt(0).toUpperCase() + perfil.nome.slice(1) + 's'
        }))

        doacoes.value = dados.doacoes
        moduloId.value = dados.moduloId
        latitudeInicial.value = dados.usuario.regiao_usuario?.latitude ?? '-23.5510589'
        longitudeInicial.value = dados.usuario.regiao_usuario?.longitude ?? '-46.6548426'

    } catch (e) {
        alert(e)
        alert(JSON.stringify(e))

    } finally {
        carregando.value = false
    }
}

export const carregarDoacoesLista = async ({
    carregando,
    terminou,
    pagina,
    doacoes,
    filtros,
    buscar,
}) => {

    if (terminou.value) {
        return
    }

    try {
        carregando.value = true

        const dados = await buscar(pagina.value, filtros.value)

        doacoes.value.push(...dados.doacoes.data)

        if (dados.doacoes.current_page >= dados.doacoes.last_page) {
            terminou.value = true
        } else {
            pagina.value++
        }

    } finally {
        carregando.value = false
    }
}