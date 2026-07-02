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

      /** ************* ADMIN ************* */
      {
        path: 'admin',
        children: [
          {
            path: '',
            name: 'admin.index',
            component: () =>
              import('pages/autenticado/modulos/admin/IndexPage.vue')
          },
          {
            path: 'doacoes',
            name: 'admin.doacoes.index',
            component: () =>
              import('pages/autenticado/modulos/admin/doacoes/IndexPage.vue')
          },
          {
            path: 'doacoes/novo',
            name: 'admin.doacoes.novo',
            component: () => import('pages/autenticado/modulos/admin/doacoes/FormPage.vue')
          },
          {
            path: ':id/editar',
            name: 'admin.doacoes.editar',
            component: () => import('pages/autenticado/modulos/admin/doacoes/FormPage.vue')
          }
        ]
      },

      {
        path: 'doacoes',
        children: [
          {
            path: 'opcoes',
            name: 'doacoes.opcoes',
            component: () =>
              import(
                'pages/autenticado/modulos/doacoes/OpcoesPage.vue'
              )
          },

          {
            path: 'solicitadas',
            children: [
              {
                path: '',
                name: 'doacoes.solicitadas.index',
                component: () =>
                  import(
                    'pages/autenticado/modulos/doacoes/solicitadas/IndexPage.vue'
                  )
              },
              {
                path: 'novo',
                name: 'doacoes.solicitadas.novo',
                component: () =>
                  import(
                    'pages/autenticado/modulos/doacoes/solicitadas/FormPage.vue'
                  )
              },
              {
                path: ':id/editar',
                name: 'doacoes.solicitadas.editar',
                component: () =>
                  import(
                    'pages/autenticado/modulos/doacoes/solicitadas/FormPage.vue'
                  )
              }
            ]
          },

          {
            path: 'oferecidas',
            children: [
              {
                path: '',
                name: 'doacoes.oferecidas.index',
                component: () =>
                  import(
                    'pages/autenticado/modulos/doacoes/oferecidas/IndexPage.vue'
                  )
              },
              {
                path: 'novo',
                name: 'doacoes.oferecidas.novo',
                component: () =>
                  import(
                    'pages/autenticado/modulos/doacoes/oferecidas/FormPage.vue'
                  )
              },
              {
                path: ':id/editar',
                name: 'doacoes.oferecidas.editar',
                component: () =>
                  import(
                    'pages/autenticado/modulos/doacoes/oferecidas/FormPage.vue'
                  )
              }
            ]
          }
        ]
      },

      // adoção de animais
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
      // animais desaparecidos
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
      // pessoas desaparecidas
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
      {
        path: 'usuario',
        children: [
          {
            path: 'perfil',
            name: 'usuario.perfil',
            component: () => import('pages/autenticado/usuario/InfoPage.vue'),
          }
        ]
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