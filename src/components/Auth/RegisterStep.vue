<template>
  <div>
    <q-banner class="banner">
      {{ bannerMessage }}
    </q-banner>
    <template v-if="registerStep === 'getUsername'">
      <div class="hello">
        سلام
      </div>
      <label for="username">
        لطفا ایمیل یا شماره تلفن همراه خود را وارد کنید
      </label>
      <q-input
        outlined
        id="username"
        class="username-input"
        v-model="username"
        label="ایمیل یا شماره تلفن همراه"
        :disable="loading"
        :loading="loading"
        @keydown.enter="goToVerifyStep"
      >
        <template v-slot:prepend>
          <q-icon name="person"></q-icon>
        </template>
      </q-input>
      <div class="accept-rules-and-conditions-message">
        با ثبت نام در سامانه
        <span class="accept-rules-and-conditions-message-btn"
              @click="showRulesAndConditions">
          قوانین و شرایط استفاده
        </span>
        از آن را می‌پذیرم.
      </div>
      <q-btn class="full-width btn-GoToVerify"
             color="primary"
             label="ادامه"
             :disable="loading"
             :loading="loading"
             @click="goToVerifyStep" />
      <div class="go-to-login-message">
        حساب کاربری دارید؟
        <span class="btn-go-to-login-span"
              @click="goToLoginStep">
          وارد شوید
        </span>
      </div>
    </template>
    <template v-else-if="registerStep === 'verify'">
      <label for="verifyNumber">
        .لطفا کد تایید ارسال شده به شماره
        {{ username }}
        را وارد کنید
      </label>
      <q-input
        outlined
        id="verifyNumber"
        class="username-input"
        v-model="verifyNumber"
        label=""
        :disable="loading"
        :loading="loading"
        @keydown.enter="verify"
      />
      <div class="resend-timer-message">
        <span class="resend-timer-message-value">
          01:59
        </span>
        تا درخواست مجدد
      </div>
      <q-btn class="full-width btn-verifyUsername"
             color="primary"
             label="تایید و ادامه"
             :disable="loading"
             :loading="loading"
             @click="verify" />
      <div class="go-to-set-username-message"
           @click="goToGetUsernameStep">
        تغییر شماره تلفن همراه یا استفاده از آدرس ایمیل
      </div>
    </template>
    <template v-else-if="registerStep === 'information'">
      <div class="information-top-message">
        لطفا اطلاعات کاربری خود را وارد کنید.
      </div>
      <label for="name">
        نام
      </label>
      <q-input
        outlined
        id="name"
        class="name-input"
        v-model="name"
        label="نام خود را وارد کنید"
        @keydown.enter="register"
      >
        <template v-slot:prepend>
          <q-icon name="person"></q-icon>
        </template>
      </q-input>
      <label for="lastname">
        نام خانوادگی
      </label>
      <q-input
        outlined
        id="lastname"
        class="lastname-input"
        v-model="lastname"
        label="نام خانوادگی خود را وارد کنید"
        @keydown.enter="register"
      >
        <template v-slot:prepend>
          <q-icon name="person"></q-icon>
        </template>
      </q-input>
      <label class="password-label"
             for="password">
        گذرواژه
      </label>
      <q-input
        outlined
        class="password-input"
        id="password"
        v-model="password"
        label="گذرواژه خود را وارد کنید"
        @keydown.enter="register"
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
             label="ثبت نام"
             @click="register" />
    </template>
  </div>
</template>

<script>
import { mixinAuth } from 'src/mixin/Mixins'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'RegisterStep',
  mixins: [mixinAuth],
  props: {
    redirect: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    loading: false,
    bannerMessage: 'ثبت نام در سامانه',
    registerStep: 'getUsername',
    username: null,
    verifyNumber: null,
    password: null,

    userLogin: false,
    loadingList: false,
    otpStep: 'sendOtp',

    otp: null
  }),
  created () {
    // if (this.getToken()) {
    //   this.getUserData(() => { this.redirectTo() })
    // }
    this.setRegisterStep('getUsername')
  },
  computed: {
    user () {
      return this.$store.getters['Auth/user']
    }
  },
  methods: {
    setRegisterStep (step) {
      this.registerStep = step
      this.setBannerMessageFromStep(step)
    },
    setBannerMessageFromStep (step) {
      if (step === 'getUsername') {
        this.bannerMessage = 'ثبت نام در سامانه'
      } else if (step === 'verify') {
        this.bannerMessage = 'کد تایید'
      } else if (step === 'information') {
        this.bannerMessage = 'اطلاعات کاربری'
      }
    },

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

    register () {
      this.$emit('register')
      // this.loadingList = true
      // this.$store.dispatch('Auth/login', {
      //   input: this.username,
      //   password: this.password
      // })
      //   .then(() => {
      //     this.loadingList = false
      //     this.$axios.defaults.headers.common.Authorization = 'Bearer ' + this.$store.getters['Auth/accessToken']
      //     this.redirectTo()
      //   })
      //   .catch(err => {
      //     this.handleErr(err.response)
      //   })
    },
    goToLoginStep () {
      this.$emit('goToLoginStep')
    },
    showRulesAndConditions () {

    },
    goToVerifyStep () {
      if (!this.username) {
        return
      }
      this.loading = true
      this.$axios.post(API_ADDRESS.auth.sendOtp, {
        input: this.username
      })
        .then(() => {
          this.loading = false
          // this.$axios.defaults.headers.common.Authorization = 'Bearer ' + this.$store.getters['Auth/accessToken']
          // this.redirectTo()
          this.setRegisterStep('verify')
        })
        .catch(err => {
          this.handleErr(err.response)
        })
    },
    verify () {
      if (!this.verifyNumber) {
        return
      }
      this.loading = true
      this.$axios.post(API_ADDRESS.auth.signUp, {
        input: this.username,
        otp: this.verifyNumber
      })
        .then(() => {
          this.loading = false
          // this.$axios.defaults.headers.common.Authorization = 'Bearer ' + this.$store.getters['Auth/accessToken']
          // this.redirectTo()
          this.setRegisterStep('information')
        })
        .catch(err => {
          this.handleErr(err.response)
        })
    },
    goToGetUsernameStep () {
      this.setRegisterStep('getUsername')
    }
  }
}
</script>

<style lang="scss" scopedresend-timer-message>
.banner {
margin-bottom: 13px;
}
.hello {
  margin-bottom: 8px;
}
.username-input {
  margin-top: 18px;
}
.username-input {
  margin-bottom: 20px;
}
.accept-rules-and-conditions-message {
  color: #212121;
  margin-bottom: 30px;
  .accept-rules-and-conditions-message-btn {
    color: #5B7A5F;
    cursor: pointer;
  }
}
.btn-GoToVerify {
  margin-bottom: 40px;
  font-size: 18px;
}
.go-to-login-message {
  font-size: 16px;
  .btn-go-to-login-span {
    color: #5B7A5F;
    cursor: pointer;
  }
}
.resend-timer-message {
  margin-bottom: 20px;
  text-align: center;
  .resend-timer-message-value {

  }
}
.btn-verifyUsername {
  margin-bottom: 40px;
}
.go-to-set-username-message {
  color: #5B7A5F;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}

.information-top-message {
  margin-bottom: 3px;
}
.name-input, .lastname-input {
  margin-bottom: 25px;
}
.name-input, .lastname-input, .password-input {
  margin-top: 8px;
}
.password-input {
  margin-bottom: 54px;
}
</style>
