import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'

import routes from './routes'
import { trazerToken } from 'src/services/storage'

export let routerInstance

export default defineRouter(() => {

  const createHistory =
    process.env.SERVER
      ? createMemoryHistory
      : process.env.VUE_ROUTER_MODE === 'history'
        ? createWebHistory
        : createWebHashHistory

  routerInstance =
    createRouter({
      scrollBehavior: () => ({
        left: 0,
        top: 0
      }),

      routes,

      history:
        createHistory(
          process.env.VUE_ROUTER_BASE
        ),
    })

  routerInstance.beforeEach(
    async (to, from, next) => {

      const token = await trazerToken()

      const logado = !!token

      const rotaPrivada = to.meta?.auth === true

      const rotaPublica = to.meta?.auth === false

      if (rotaPrivada && !logado) {
        return next('/login')
      }


      // verificando se o usuário já aceitou termos de uso e política de privacidade
      const jaConsentiu = false

      if (
        to.meta.requerConsentimento
        && !jaConsentiu
        // && !usuarioAdmin
      ) {
        next({ name: 'consentimento' })
        return
      }

      if (rotaPublica && logado) {
        return next('/app')
      }

      next()
    }
  )

  return routerInstance
})