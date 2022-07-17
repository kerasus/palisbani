/**
 * Auth middleware example.
 */
export default function auth (/* { to, from, next, store } */ { next, store }) {
  console.log('hiii')
  if (!store.getters['Auth/accessToken']) {
    return next({ name: 'Login' })
  }
  return next()
}
