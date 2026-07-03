import { boot } from 'quasar/wrappers'
import { Dark } from 'quasar'
import { trazerTema } from 'src/services/storage'

export default boot(async () => {
    const tema = await trazerTema()

    switch (tema) {
        case 'true':
            Dark.set(true)
            break

        case 'false':
            Dark.set(false)
            break

        default:
            Dark.set(false)
    }
})