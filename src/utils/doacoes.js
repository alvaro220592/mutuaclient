import { buscar } from "src/services/doacao"

export const carregarDoacoes = async ({
    carregando,
    terminou,
    pagina,
    filtros,
    categoriasDoacao,
    perfisDoacao,
    doacoes,
}) => {

    if (terminou.value) {
        return
    }

    try {

        carregando.value = true

        const dados = await buscar(pagina.value, filtros.value)

        if (pagina.value === 1) {
            categoriasDoacao.value = dados.categoriasDoacao

            perfisDoacao.value = dados.perfisDoacao.map(perfil => ({
                ...perfil,
                nome: perfil.nome.charAt(0).toUpperCase() + perfil.nome.slice(1) + 's'
            }))
        }

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