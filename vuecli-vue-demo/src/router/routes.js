const system = [
  {
    path: '/system',
    name: '系统管理',
    component: () => import('@/views/Layout'),
    meta: { title: '系统管理' },
    children: [
      {
        path: 'dict',
        name: '字典管理',
        component: () => import('@/views/System/Dict'),
        meta: { title: '字典管理' },
      },
      {
        path: 'menu',
        name: '菜单管理',
        component: () => import('@/views/System/Menu'),
        meta: { title: '菜单管理' },
      },
      {
        path: 'org',
        name: '机构管理',
        component: () => import('@/views/System/Org'),
        meta: { title: '机构管理' },
      },
      {
        path: 'role',
        name: '角色管理',
        component: () => import('@/views/System/Role'),
        meta: { title: '角色管理' },
      },
      {
        path: 'user',
        name: '用户管理',
        component: () => import('@/views/System/User'),
        meta: { title: '用户管理' },
      },
    ],
  },
]

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/Layout'),
    meta: {
      hidden: true,
    },
  },
  ...system,
]

export default routes
