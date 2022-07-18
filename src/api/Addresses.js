// import process from 'process'
// process.client or process.browser
// const server = process.env.API
const server = '/api'
const API_ADDRESS = {
  auth: {
    login: server + '/auth/login',
    sendOtp: server + '/auth/send-otp',
    signUp: server + '/auth/sign-up',
    setPass: server + '/auth/set-pass',
    loginAdmin: server + '/auth/login',
    refreshToken: server + '/auth/refresh-token',
    changePass: server + '/auth/change-pass',
    loginOtp: server + '/auth/login-otp'
  },
  media: {
    base: server + '/cma/medias',
    upload: server + '/cma/medias'
  },
  user: {
    base: server + '/uma/users'
  },
  category: {
    base: server + '/lma/categories'
  },
  unit: {
    base: server + '/lma/units'
  },
  content: {
    base: server + '/cma/contents',
    customTypes: {
      other: server + '/cma/contents?type=other',
      moarefi: server + '/cma/contents?type=moarefi',
      majame: server + '/cma/contents?type=majame',
      moshaverin: server + '/cma/contents?type=moshaverin'
    }
  },
  feedback: {
    base: server + '/core/feedbacks'
  },
  installment: {
    base: server + '/accounting/instalments',
    bulkCreate: server + '/accounting/instalments/bulk',
    pay: (installmentId) => server + '/accounting/instalments/' + installmentId + '/pay'
  }
}
export default API_ADDRESS
