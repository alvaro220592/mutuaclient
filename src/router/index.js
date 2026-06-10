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

    // =========================
    // 🔐 ROTAS PRIVADAS
    // =========================
    if (to.meta?.auth && !logado) {
      // não logado tentando entrar em /app
      return next('/login')
    }

    // =========================
    // 🔵 LOGADO NÃO VOLTA PRO LOGIN
    // =========================
    if (logado && to.path === '/login') {
      return next('/app')
    }

    next()
  })

  return Router
})