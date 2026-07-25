export const carregarDoacoesMapa = async ({
    carregando,
    filtros,
    categoriasDoacao,
    perfisDoacao,
    doacoes,
    regiaoUsuario,
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
        regiaoUsuario.value = dados.usuario.regiao_usuario

    } catch (e) {
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
    buscar,
}) => {

    if (terminou.value) {
        return
    }

    try {
        carregando.value = true

        const dados = await buscar(pagina.value)

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