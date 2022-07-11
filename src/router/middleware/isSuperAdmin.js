/**
 * Auth middleware example.
 */
export default function auth (/* { to, from, next, store } */ { next, store }) {
  const user = store.getters['Auth/user']
  if (!user.isSuperUser()) {
    return next({ name: 'UserPanel.Home' })
  }
  return next()
}
