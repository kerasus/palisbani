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
  user: {
    base: server + '/uma/users'
  },
  category: {
    base: server + '/lma/categories'
  },
  unit: {
    base: server + '/lma/units'
  },
  session: {
    base: server + '/lma/sessions'
  },
  sessionTemplates: {
    base: server + '/lma/session_templates'
  },
  classroom: {
    base: server + '/lma/classrooms'
  },
  group: {
    base: server + '/uma/groups?per_page=300'
  },
  media: {
    upload: ''
  }
}
export default API_ADDRESS
