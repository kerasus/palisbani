<template>
  <template-component>
    <template #body>
      <q-banner class="banner">
        ورود به سامانه
      </q-banner>
      <label for="username">
        ایمیل یا شماره تلفن همراه یا کدملی
      </label>
      <q-input
        outlined
        id="username"
        class="username-input"
        v-model="username"
        label="ایمیل یا شماره تلفن همراه خود را وارد کنید"
        @keydown.enter="login"
      >
        <template v-slot:prepend>
          <q-icon name="person"></q-icon>
        </template>
      </q-input>
      <label class="password-label"
             for="password">
        <span>
          گذرواژه
        </span>
        <span class="btn-forgot-pass-span">
          فراموشی گذرواژه
        </span>
      </label>
      <q-input
        outlined
        class="password-input"
        id="password"
        v-model="password"
        label="گذرواژه خود را وارد کنید"
        @keydown.enter="login"
      >
        <template v-slot:prepend>
          <q-icon name="person"></q-icon>
        </template>
        <template v-slot:append>
          <q-icon name="person"></q-icon>
        </template>
      </q-input>
      <q-btn class="full-width btn-login"
             color="primary"
             label="ورود به سامانه"
             @click="login" />
      <div>
        حساب کاربری ندارید؟
        <span class="btn-register-span">
          ثبت نام کنید
        </span>
      </div>
    </template>
  </template-component>
</template>

<script>
import { mixinAuth } from 'src/mixin/Mixins'
import TemplateComponent from 'components/Auth/TemplateComponent'

export default {
  name: 'LoginComponent',
  mixins: [mixinAuth],
  components: { TemplateComponent },
  props: {
    redirect: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    userLogin: false,
    loadingList: false,
    otpStep: 'sendOtp',
    username: null,
    password: null,
    otp: null
  }),
  created () {
    if (this.getToken()) {
      this.getUserData(() => { this.redirectTo() })
    }
  },
  computed: {
    user () {
      return this.$store.getters['Auth/user']
    }
  },
  methods: {
    getToken () {
      return this.$store.getters['Auth/accessToken']
    },

    getEnter (targetRefKey) {
      this.$refs[targetRefKey].focus()
    },

    redirectTo () {
      let redirectTo = window.localStorage.getItem('redirectTo')
      if (!redirectTo) {
        redirectTo = 'Admin.Content.Index'
      }

      if (!this.user.isSuperUser()) {
        redirectTo = 'Admin.Installment.Index'
      }

      this.$router.push({ name: redirectTo })
    },

    handleErr (err) {
      this.loadingList = false
      const messages = []
      for (const key in err.data.errors) {
        err.data.errors[key].forEach(message => {
          this.$q.notify({
            type: 'negative',
            message,
            position: 'top'
          })
        })
      }
      if (!err.data.errors) {
        if (err.data.message) messages.push(err.data.message)
        else messages.push(err.statusText)
        this.$q.notify({
          type: 'negative',
          message: messages,
          position: 'top'
        })
      }
    },

    login () {
      this.loadingList = true
      this.$store.dispatch('Auth/login', {
        input: this.username,
        password: this.password
      })
        .then(() => {
          this.loadingList = false
          this.$axios.defaults.headers.common.Authorization = 'Bearer ' + this.$store.getters['Auth/accessToken']
          this.redirectTo()
        })
        .catch(err => {
          this.handleErr(err.response)
        })
    }
  }
}
</script>

<style scoped>
.banner {
margin-bottom: 30px;
}
.username-input, .password-input {
  margin-top: 6px;
}
.username-input {
  margin-bottom: 27px;
}
.password-input {
  margin-bottom: 50px;
}
.btn-login {
  margin-bottom: 40px;
  font-size: 18px;
}
.password-label {
  display: flex;
  justify-content: space-between;
}
.btn-forgot-pass-span {
  color: #5B7A5F;
  font-size: 14px;
  cursor: pointer;
}
.btn-register-span {
  color: #475F4A;
  font-size: 16px;
  cursor: pointer;
}
</style>
