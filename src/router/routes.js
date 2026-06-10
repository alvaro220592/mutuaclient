const routes = [
  // =========================
  // 🌐 ÁREA PÚBLICA (CONVIDADO)
  // =========================
  {
    path: '/',
    component: () => import('layouts/ConvidadoLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/convidado/BoasVindasPage.vue')
      },
      {
        path: 'login',
        component: () => import('pages/convidado/auth/LoginPage.vue')
      },
      {
        path: 'cadastrar',
        component: () => import('pages/convidado/auth/CadastrarPage.vue')
      },
      {
        path: 'recuperar-senha',
        component: () => import('pages/convidado/auth/RecuperarSenhaPage.vue')
      },
      {
        path: 'redefinir-senha',
        component: () => import('pages/convidado/auth/RedefinirSenhaPage.vue')
      },
    ],
  },

  // =========================
  // 🔐 ÁREA PRIVADA (LOGADO)
  // =========================
  {
    path: '/app',
    component: () => import('layouts/AutenticadoLayout.vue'),
    meta: { auth: true }, // <- aqui está a proteção
    children: [
      {
        path: '',
        component: () => import('pages/autenticado/HomePage.vue')
      }
    ]
  },

  // =========================
  // ❌ 404
  // =========================
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes