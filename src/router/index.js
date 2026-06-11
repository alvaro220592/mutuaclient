import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'

import routes from './routes'

// 🔐 import do storage
import { getToken } from 'src/services/storage'

export default defineRouter(() => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  // ============================
  // 🔐 GUARD GLOBAL (LOGIN FLOW)
  // ============================
  Router.beforeEach(async (to, from, next) => {
    const token = await getToken()
    const logado = !!token

    const rotaPrivada = to.meta?.auth === true
    const rotaPublica = to.meta?.auth === false

    // 🔐 1. rota privada exige login
    if (rotaPrivada && !logado) {
      return next('/login')
    }

    // 🔵 2. logado não pode acessar área pública (boas-vindas/login/etc)
    if (rotaPublica && logado) {
      return next('/app')
    }

    next()
  })

  return Router
})