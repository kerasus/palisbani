<template>
  <template-component>
    <template #body>
      <login-step v-if="step === 'login'"
                  @goToRegisterStep="goToRegisterStep" />
      <register-step v-if="step === 'register'"
                     @goToLoginStep="goToLoginStep"
                     @register="onRegister"
      />
      <information-step v-if="step === 'information'"
                        @goToLoginStep="goToLoginStep" />
    </template>
  </template-component>
</template>

<script>
import TemplateComponent from 'components/Auth/TemplateComponent'
import LoginStep from 'components/Auth/LoginStep'
import RegisterStep from 'components/Auth/RegisterStep'
import InformationStep from 'components/Auth/InformationStep'

export default {
  name: 'LoginComponent',
  components: { TemplateComponent, LoginStep, RegisterStep, InformationStep },
  data () {
    return {
      step: 'login'
    }
  },
  props: {
    redirect: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goToRegisterStep () {
      this.step = 'register'
    },
    goToLoginStep () {
      this.step = 'login'
    },
    onRegister () {
      console.log('onRegister')
    }
  }
}
</script>
