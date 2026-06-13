import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useTransicaoEntrePaginas() {

    const route = useRoute()

    const animacaoEntrar =
        ref('animated slideInRight')

    const animacaoSair =
        ref('animated slideOutLeft')

    let profundidadeAnterior =
        route.path
            .split('/')
            .filter(Boolean)
            .length

    watch(
        () => route.fullPath,

        (novo) => {

            const profundidadeAtual =
                novo
                    .split('/')
                    .filter(Boolean)
                    .length

            const avancou =
                profundidadeAtual >=
                profundidadeAnterior

            animacaoEntrar.value =
                avancou
                    ? 'animated slideInRight'
                    : 'animated slideInLeft'

            animacaoSair.value =
                avancou
                    ? 'animated slideOutLeft'
                    : 'animated slideOutRight'

            profundidadeAnterior =
                profundidadeAtual
        }
    )

    return {
        animacaoEntrar,
        animacaoSair
    }
}