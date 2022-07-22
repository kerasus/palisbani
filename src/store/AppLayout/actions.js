export function updateAppBarAndDrawer (context, newInfo) {
  this.commit('AppLayout/updateLayoutHeaderVisible', newInfo)
  this.commit('AppLayout/updateLayoutLeftDrawerVisible', newInfo)
}

export function showConfirmDialog (context, newInfo) {
  this.commit('AppLayout/showConfirmDialog', newInfo)
}

export function updateLayoute (context, newInfo) {
  const isAdminPage = newInfo.routeName && newInfo.routeName.includes('Admin.')
  this.commit('AppLayout/updateVisibilityBreadcrumb', isAdminPage)
  this.commit('AppLayout/updateLayoutLeftDrawerVisible', isAdminPage)
  if (isAdminPage) {
    this.commit('AppLayout/updateLayoutView', 'hHh lpR fFf')
  } else {
    this.commit('AppLayout/updateLayoutView', 'lhh LpR fFf')
  }
}
