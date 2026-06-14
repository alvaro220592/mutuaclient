const routes = [
  // =========================
  // 🌐 ÁREA PÚBLICA (CONVIDADO)
  // =========================
  {
    path: '/',
    meta: { auth: false },
    component: () => import('layouts/ConvidadoLayout.vue'),
    children: [
      {
        path: '',
        name: 'boas-vindas',
        component: () => import('pages/convidado/BoasVindasPage.vue')
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/convidado/auth/LoginPage.vue')
      },
      {
        path: 'cadastrar',
        name: 'cadastrar',
        component: () => import('pages/convidado/auth/CadastrarPage.vue')
      },
      {
        path: 'recuperar-senha',
        name: 'recuperar-senha',
        component: () => import('pages/convidado/auth/RecuperarSenhaPage.vue')
      },
      {
        path: 'redefinir-senha',
        name: 'redefinir-senha',
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
    meta: { auth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/autenticado/HomePage.vue')
      },
      {
        path: 'doacoes',
        children: [
          {
            path: 'opcoes',
            name: 'doacoes.opcoes',
            component: () => import('pages/autenticado/modulos/doacoes/OpcoesPage.vue')
          },
          {
            path: 'opcoes/solicitadas', // 'opcoes' inserido na url para ajudar na animação de transição entre as urls
            name: 'doacoes.solicitadas',
            component: () => import('pages/autenticado/modulos/doacoes/SolicitadasPage.vue')
          },
          {
            path: 'opcoes/oferecidas', // 'opcoes' inserido na url para ajudar na animação de transição entre as urls
            name: 'doacoes.oferecidas',
            component: () => import('pages/autenticado/modulos/doacoes/OferecidasPage.vue')
          },
        ]
      },
      {
        path: 'adocao-animais',
        children: [
          {
            path: 'opcoes',
            name: 'adocao-animais.opcoes',
            component: () => import('pages/autenticado/modulos/adocao-animais/OpcoesPage.vue')
          }
        ]
      },
      {
        path: 'animais-desaparecidos',
        children: [
          {
            path: 'opcoes',
            name: 'animais-desaparecidos.opcoes',
            component: () => import('pages/autenticado/modulos/animais-desaparecidos/OpcoesPage.vue')
          }
        ]
      },
      {
        path: 'pessoas-desaparecidas',
        children: [
          {
            path: 'opcoes',
            name: 'pessoas-desaparecidas.opcoes',
            component: () => import('pages/autenticado/modulos/pessoas-desaparecidas/OpcoesPage.vue')
          }
        ]
      },
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