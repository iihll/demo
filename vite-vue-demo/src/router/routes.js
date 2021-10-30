const routes = [
  {
    path: '/',
    component: () => import('../views/Layout.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('../views/Home.vue')
      }
    ]
  }
]

export default routes