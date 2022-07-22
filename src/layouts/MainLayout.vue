<template>
  <div class="main-layout"
       :class="{'isNotAdminPage': !isAdminPage}">
    <quasar-template-builder v-model:value="properties"
                             @onResize="resize"
    >
      <template #header>
        <template-header />
        <q-linear-progress
          v-if="$store.getters['loading/loading']"
          color="primary"
          reverse
          class="q-mt-sm"
          indeterminate
        />
        <q-resize-observer @resize="setHeaderDimension" />
      </template>
      <template #left-drawer>
        <div class="drawer-inside">
          <side-menu-dashboard />
        </div>
      </template>
      <template #content>
        <div ref="contentInside"
             class="content-inside">
          <q-dialog v-model="otpLoginDialog">
            <!--            <otp-login />-->
          </q-dialog>
          <Router :include="keepAliveComponents" />
        </div>
      </template>
    </quasar-template-builder>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { QuasarTemplateBuilder } from 'quasar-template-builder'
import SideMenuDashboard from 'components/Menu/SideMenu/SideMenu-dashboard'
import templateHeader from 'components/Template/templateHeader'
import Router from 'src/router/Router'

export default defineComponent({
  name: 'MainLayout',

  components: {
    QuasarTemplateBuilder,
    SideMenuDashboard,
    templateHeader,
    Router
  },
  data () {
    return {
      keepAliveComponents: [],
      properties: {
        layoutView: 'lHh LpR fFf',
        layoutHeader: true,
        layoutHeaderVisible: true,
        layoutHeaderReveal: false,
        layoutHeaderElevated: false,
        layoutHeaderBordered: false,
        layoutLeftDrawer: true,
        layoutLeftDrawerVisible: false,
        layoutLeftDrawerOverlay: false,
        layoutLeftDrawerElevated: false,
        layoutLeftDrawerBordered: false,
        layoutLeftDrawerWidth: 240,
        layoutPageContainer: true,
        layoutRightDrawer: false,
        layoutFooter: false,
        layoutHeaderCustomClass: 'main-layout-header row',
        layoutLeftDrawerCustomClass: 'main-layout-left-drawer',
        layoutPageContainerCustomClass: 'main-layout-container'
      },
      contentInside: ref(0)
    }
  },
  computed: {
    isAdminPage () {
      return this.$route.name && this.$route.name.includes('Admin.')
    },
    otpLoginDialog: {
      get () {
        return this.$store.getters['AppLayout/otpLoginDialog']
      },
      set (stata) {
        this.$store.commit('AppLayout/showOtpLoginDialog', stata)
      }
    }
  },

  created () {
    const localData = this.$store.getters['AppLayout/appLayout']
    Object.assign(this.properties, localData)
  },
  mounted () {
    this.updateLayoute()
  },

  methods: {
    updateLayoute () {
      this.$store.commit('AppLayout/updateVisibilityBreadcrumb', this.isAdminPage)
      this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', this.isAdminPage)
      this.$store.commit('AppLayout/updateLayoutView', 'hHh lpR fFf')
    },
    setHeaderDimension (value) {
      // this.$refs.contentInside.style.height = 'calc(100vh +' + value.height + 'px'
    },
    resize (val) {
      // this.$store.commit('AppLayout/updateWindowSize', val)
      // if (val.width > 1439) {
      //   this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', 314)
      //   this.$store.commit('AppLayout/updateLayoutLeftDrawerBehavior', 'desktop') && this.$store.commit('AppLayout/updateLayoutRightDrawerBehavior', 'desktop')
      // } else if (val.width > 599) {
      //   this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', 280)
      //   this.$store.commit('AppLayout/updateLayoutLeftDrawerBehavior', 'mobile') && this.$store.commit('AppLayout/updateLayoutRightDrawerBehavior', 'mobile')
      // } else {
      //   this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', 242)
      //   this.$store.commit('AppLayout/updateLayoutLeftDrawerBehavior', 'mobile') && this.$store.commit('AppLayout/updateLayoutRightDrawerBehavior', 'mobile')
      // }
    }
  }
})
</script>
