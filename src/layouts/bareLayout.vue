<template>
  <Router :include="keepAliveComponents" />
</template>

<script>
import Router from 'src/router/Router'
export default {
  components: { Router },
  data () {
    return {
      keepAliveComponents: []
    }
  }
}
</script>
