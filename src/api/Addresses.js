import process from 'process'
// process.client or process.browser
const server = process.env.API
const API_ADDRESS = {
  auth: {
    loginAdmin: server + '/auth/login',
    refreshToken: server + '/auth/refresh-token',
    signUp: server + '/auth/sign-up',
    sendOtp: server + '/auth/send-otp',
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
  content: {
    base: server + '/cma/contents',
    customTypes: {
      other: server + '/cma/contents?type=other',
      moarefi: server + '/cma/contents?type=moarefi',
      majame: server + '/cma/contents?type=majame',
      moshaverin: server + '/cma/contents?type=moshaverin'
    }
  },
  category: {
    base: server + '/cma/categories'
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
