import { auth, isSuperAdmin } from './middleware/middleware'
function getEntityCrudRouteObject (entityRoute) {
  const AllNeededRoutes = [
    { mode: 'Index', path: '' },
    { mode: 'Create', path: 'create' },
    { mode: 'Show', path: ':id' },
    { mode: 'Edit', path: ':id/edit' }
  ]
  const children = []
  const removedFirstPart = entityRoute.componentPath.split('/')
  // console.log('removedFirstPart', removedFirstPart[0])
  AllNeededRoutes.forEach(item => {
    // Todo : find a way for 'pages/'
    children.push({ name: entityRoute.baseRouteName + '.' + item.mode, path: item.path, component: () => import('pages/' + entityRoute.componentPath.replace(removedFirstPart[0] + '/', '')) })
    // Even this is not working
    // children.push({ name: baseRouteName + '.' + item.mode, path: item.path, component: () => import(removedFirstPart[0] + '/' + componentPath.replace(removedFirstPart[0] + '/', '')) })
  })
  return {
    path: entityRoute.path,
    meta: entityRoute.meta,
    component: () => import('layouts/AdminLayout.vue'),
    breadcrumbs: entityRoute.breadcrumbs,
    children
  }
}
const entityCrudRouteConfigs = [
  // {
  //   path: 'users',
  //   baseRouteName: 'Admin.User',
  //   componentPath: 'pages/Admin/User',
  //   meta: {
  //     middlewares: [isSuperAdmin]
  //   },
  //   breadcrumbs: { title: 'مدیریت کاربران' }
  // },
  {
    path: 'content',
    baseRouteName: 'Admin.Content',
    componentPath: 'pages/Admin/Content',
    meta: {
      middlewares: [isSuperAdmin]
    },
    breadcrumbs: { title: 'محتوا' }
  },
  // {
  //   path: 'category',
  //   baseRouteName: 'Admin.Category',
  //   componentPath: 'pages/Admin/Category',
  //   meta: {
  //     middlewares: [isSuperAdmin]
  //   },
  //   breadcrumbs: { title: 'دسته' }
  // },
  {
    path: 'media',
    baseRouteName: 'Admin.Media',
    componentPath: 'pages/Admin/Media',
    meta: {
      middlewares: [isSuperAdmin]
    },
    breadcrumbs: { title: 'گالری' }
  },
  {
    path: 'feedback',
    baseRouteName: 'Admin.Feedback',
    componentPath: 'pages/Admin/Feedback',
    meta: {},
    breadcrumbs: { title: 'نظر' }
  },
  {
    path: 'installment',
    baseRouteName: 'Admin.Installment',
    componentPath: 'pages/Admin/Installment',
    meta: {},
    breadcrumbs: { title: 'اقساط' }
  }
]
const allEntityCrudRouteObjects = [
  ...entityCrudRouteConfigs.map(item => getEntityCrudRouteObject(item))
]

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
          // { name: 'Admin.Category.Index', path: 'categories', component: () => import('pages/Admin/Category/index.vue'), breadcrumbs: { title: 'تنظیماssت' } },
          {
            path: 'users',
            component: () => import('layouts/bareLayout.vue'),
            breadcrumbs: { title: 'کاربران' },
            meta: {
              middlewares: [auth]
            },
            children: [
              { name: 'Admin.User.Index', path: '', component: () => import('pages/Admin/User/index.vue') },
              { name: 'Admin.User.Show', path: '/:id', component: () => import('pages/Admin/User/show.vue') }
            ]
          },
          // { name: 'Admin.Category.Index', path: 'categories', component: () => import('pages/Admin/Category/index.vue') },
          {
            name: 'Admin.Category',
            path: 'categories',
            component: () => import('layouts/bareLayout.vue'),
            breadcrumbs: { title: 'دسته بندی ها' },
            meta: {
              middlewares: [auth]
            },
            children: [
              { name: 'Admin.Category.Index', path: '', component: () => import('pages/Admin/Category/index.vue') }
              // { name: 'Admin.Category.Show', path: '/:id', component: () => import('pages/Admin/Category/show.vue') }
            ]
          },
          ...allEntityCrudRouteObjects
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
