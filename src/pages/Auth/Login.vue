<template>
  <div class="login-page flex justify-center items-center">
    <login-component />
  </div>
</template>

<script>
import LoginComponent from 'components/Auth/LoginComponent.vue'

export default {
  name: 'Login',
  components: { LoginComponent }
}
</script>

<style scoped>
.login-page {
  height: 100vh;
}
</style>
