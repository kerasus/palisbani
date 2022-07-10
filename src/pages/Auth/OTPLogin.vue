<template>
  <div class="login-page row flex">
    <otp-login redirect />
  </div>
</template>

<script>
import OtpLogin from 'components/Auth/OtpLogin'
export default {
  name: 'Login',
  components: { OtpLogin }
}
</script>

<style lang="scss" scoped>
.login-page{
  height: 100vh;
  .login-card{
    margin: auto;
    .login-header-right-side{
      .login-alaa-logo{
        width: 20px;
      }
      .login-entry-title{
        font-size: 20px;
      }
    }
  }
}
</style>
