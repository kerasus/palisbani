<template>
  <div class="q-pa-md">
    <Router :include="keepAliveComponents" />
  </div>
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
