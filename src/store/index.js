import process from 'process'
import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import vuejsStorage from '@krasus/vuejs-storage'

const plugins = []

if (process.browser) {
  // const vuexPersistedState =
  //   createPersistedState({
  //     // storage: window.localStorage,
  //     paths: [
  //       'Auth.accessToken',
  //       'Auth.user',
  //       'AppLayout'
  //     ]
  //   })
  const vuexPersistedState =
    vuejsStorage({
      keys: [
        'Auth',
        'AppLayout'
      ],
      namespace: 'vuex-localstorage'
      // driver: vuejsStorage.drivers.sessionStorage // any object has 'set','get','has' api, default: vuejsStorage.drivers.localStorage
    })

  plugins.push(vuexPersistedState)
}

import Auth from 'src/store/Auth'
// import loading from 'src/store/loading'
import AppLayout from 'src/store/AppLayout'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      Auth,
      // loading,
      AppLayout
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
