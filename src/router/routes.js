import { auth/* , isSuperAdmin */ } from './middleware/middleware'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    breadcrumbs: { title: 'خانه', loading: false, icon: 'home', route: { name: 'dashboard' } },
    children: [
      {
        path: '',
        name: 'User',
        component: () => import('layouts/bareLayout.vue'),
        children: [
          { name: 'UserPanel.Home', path: '', component: () => import('pages/User/index.vue') }
          // { name: 'UserPanel.Content', path: 'content/:content_id', component: () => import('pages/User/Content.vue') },
          // { name: 'UserPanel.Category', path: 'category/:category_id', component: () => import('pages/User/Category.vue') }
        ]
      },
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
          },
          {
            name: 'Admin.Unit',
            path: 'units',
            component: () => import('layouts/bareLayout.vue'),
            breadcrumbs: { title: 'طلیعه حکمت' },
            meta: {
              middlewares: [auth]
            },
            children: [
              // { name: 'Admin.Category.Index', path: '', component: () => import('pages/Admin/Category/index.vue') },
              // { name: 'Admin.Category.Create', path: 'create', component: () => import('pages/Admin/Category/create.vue') },
              { name: 'Admin.Unit.Show', path: ':id', component: () => import('pages/Admin/Unit/show.vue'), breadcrumbs: { title: 'درس' } }
            ]
          },
          {
            name: 'Admin.SessionTemplate',
            path: 'sessionTemplates',
            component: () => import('layouts/bareLayout.vue'),
            breadcrumbs: { title: 'طلیعه حکمت' },
            meta: {
              middlewares: [auth]
            },
            children: [
              { name: 'Admin.SessionTemplate.Index', path: '', component: () => import('pages/Admin/SessionTemplate/index.vue') },
              { name: 'Admin.SessionTemplate.Create', path: 'create', component: () => import('pages/Admin/SessionTemplate/create.vue') },
              { name: 'Admin.SessionTemplate.Show', path: ':id', component: () => import('pages/Admin/SessionTemplate/show.vue') }
            ]
          },
          {
            name: 'Admin.Classroom',
            path: 'classrooms',
            component: () => import('layouts/bareLayout.vue'),
            breadcrumbs: { title: 'طلیعه حکمت' },
            meta: {
              middlewares: [auth]
            },
            children: [
              { name: 'Admin.Classroom.Index', path: '', component: () => import('pages/Admin/Classroom/index.vue') },
              { name: 'Admin.Classroom.Create', path: 'create', component: () => import('pages/Admin/Classroom/create.vue') },
              { name: 'Admin.Classroom.Show', path: ':id', component: () => import('pages/Admin/Classroom/show.vue') }
            ]
          },
          {
            name: 'Admin.Session',
            path: 'session',
            component: () => import('layouts/bareLayout.vue'),
            breadcrumbs: { title: 'طلیعه حکمت' },
            meta: {
              middlewares: [auth]
            },
            children: [
              { name: 'Admin.Session.Index', path: '', component: () => import('pages/Admin/Session/index.vue') },
              { name: 'Admin.Session.Create', path: 'create', component: () => import('pages/Admin/Session/create.vue') },
              { name: 'Admin.Session.Show', path: ':id', component: () => import('pages/Admin/Session/show.vue') }
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
