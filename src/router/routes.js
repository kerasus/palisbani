import { auth/* , isSuperAdmin */ } from './middleware/middleware'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    breadcrumbs: { title: 'خانه', loading: false, icon: 'home', route: { name: 'dashboard' } },
    children: [
      // {
      //   path: '',
      //   name: 'UserPanel',
      //   component: () => import('layouts/bareLayout.vue'),
      //   children: [
      //     { name: 'UserPanel.Home', path: '', component: () => import('pages/Index.vue') },
      //     { name: 'UserPanel.Content', path: 'content/:content_id', component: () => import('pages/User/Content.vue') },
      //     { name: 'UserPanel.Category', path: 'category/:category_id', component: () => import('pages/User/Category.vue') }
      //   ]
      // },
      {
        path: 'admin',
        component: () => import('layouts/AdminLayout.vue'),
        meta: {
          middlewares: [auth]
        },
        children: [
          { name: 'Admin.Settings', path: 'settings', component: () => import('pages/Admin/Settings'), breadcrumbs: { title: 'تنظیمات' } },
          {
            name: 'Admin.User',
            path: 'users',
            component: () => import('layouts/bareLayout.vue'),
            breadcrumbs: { title: 'کاربران' },
            meta: {
              middlewares: [auth]
            },
            children: [
              { name: 'Admin.User.Index', path: '', component: () => import('pages/Admin/User/index.vue') },
              { name: 'Admin.User.Show', path: '/:id', component: () => import('pages/Admin/User/show.vue'), breadcrumbs: { title: 'اطلاعات کاربری' } }
            ]
          },
          {
            name: 'Admin.Category',
            path: 'categories',
            component: () => import('layouts/bareLayout.vue'),
            breadcrumbs: { title: 'دسته بندی ها' },
            meta: {
              middlewares: [auth]
            },
            children: [
              { name: 'Admin.Category.Index', path: '', component: () => import('pages/Admin/Category/index.vue') },
              { name: 'Admin.Category.Create', path: 'create', component: () => import('pages/Admin/Category/create.vue') },
              { name: 'Admin.Category.Show', path: ':id', component: () => import('pages/Admin/Category/show.vue') }
            ]
          }
          // ...allEntityCrudRouteObjects
        ]
      }
    ]
  },
  {
    path: '/login/admin',
    name: 'AdminLogin',
    component: () => import('pages/Auth/Login.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('pages/Auth/Login.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component:
      () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
