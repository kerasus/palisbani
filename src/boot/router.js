import { boot } from 'quasar/wrappers'

function updateLayoute (store, routeName) {
  const isAdminPage = routeName && routeName.includes('Admin.')
  store.commit('AppLayout/updateVisibilityBreadcrumb', isAdminPage)
  store.commit('AppLayout/updateLayoutLeftDrawerVisible', isAdminPage)
  if (isAdminPage) {
    store.commit('AppLayout/updateLayoutView', 'hHh lpR fFf')
  } else {
    store.commit('AppLayout/updateLayoutView', 'lhh LpR fFf')
  }
}

export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    console.log('hii')
    updateLayoute(store, to.name)
    next()
  })
})
