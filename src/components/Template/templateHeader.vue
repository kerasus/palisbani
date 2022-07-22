<template>
  <div class="header-inside col">
    <div v-if="isAdminPage"
         class="admin-top-menu">
      <div class="logo">
        <q-img class="logo-image"
               src="/assets/images/admin/layout/admin-logo.png" />
      </div>
      <div class="top-menu-items"></div>
    </div>
    <div v-else
         class="user-top-menu"
         :class="{'isHomePage': isHomePage}"
    >
      <q-toolbar>
        <q-btn flat
               round
               dense
               class="top-menu-logo"
        >
          <q-img src="assets/images/web/user-top-menu-logo.png"
                 width="53" />
        </q-btn>
        <q-btn stretch
               flat
               label="اخبار و رویدادها"
               color="white"
        />
        <q-btn stretch
               flat
               label="سامانه آموزش"
               color="white"
        />
        <q-btn-dropdown stretch
                        flat
                        label="آرشیو محتوایی"
                        color="white"
        >
          <q-list>
            <q-item-label header>عنوان یک</q-item-label>
            <q-item v-for="n in 3"
                    :key="`x.${n}`"
                    clickable
                    v-close-popup
                    tabindex="0">
              <q-item-section>
                <q-item-label>زیر عنوان</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator inset
                         spaced />
            <q-item-label header>عنوان دو</q-item-label>
            <q-item v-for="n in 3"
                    :key="`y.${n}`"
                    clickable
                    v-close-popup
                    tabindex="0">
              <q-item-section>
                <q-item-label>زیر عنوان</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn stretch
               flat
               label="فروشگاه"
               color="white"
        />
        <q-btn stretch
               flat
               label="پخش زنده"
               color="white"
        />
        <q-btn stretch
               flat
               label="درباره ما"
               color="white"
        />
        <q-btn stretch
               flat
               label="تماس با ما"
               color="white"
        />
      </q-toolbar>
    </div>
    <!--    <div-->
    <!--      class="drawer-btn"-->
    <!--      :class="{'col-6': windowSize.x < 599}"-->
    <!--    >-->
    <!--      <q-btn-->
    <!--        class="toolbar-button"-->
    <!--        icon="isax:menu-1"-->
    <!--        color="white"-->
    <!--        text-color="accent"-->
    <!--        dense-->
    <!--        unelevated-->
    <!--        @click="toggleLeftDrawer"-->
    <!--      />-->
    <!--    </div>-->
    <!--    <div-->
    <!--      class="right-side"-->
    <!--      :class="{'col-6': windowSize.x > 1439, 'col-12': windowSize.x < 599}"-->
    <!--    >-->
    <!--      <div-->
    <!--        v-if="false"-->
    <!--      >-->
    <!--        <q-skeleton-->
    <!--          v-if="!breadcrumbs.path"-->
    <!--          width="100px"-->
    <!--          height="10px"-->
    <!--        />-->
    <!--        <q-breadcrumbs-->
    <!--          v-else-->
    <!--          class="breadcrumbs"-->
    <!--          separator-color="dark"-->
    <!--          gutter="sm"-->
    <!--        >-->
    <!--          <template v-slot:separator>-->
    <!--            <q-icon name="isax:arrow-right-3 " />-->
    <!--          </template>-->
    <!--          <q-breadcrumbs-el-->
    <!--            v-for="(breadcrumb, index) in breadcrumbs.path"-->
    <!--            :key="index"-->
    <!--          >-->
    <!--            <q-skeleton-->
    <!--              v-if="breadcrumb.loading"-->
    <!--              width="100px"-->
    <!--              height="10px"-->
    <!--            />-->
    <!--            <q-breadcrumbs-el-->
    <!--              v-else-->
    <!--              :icon=breadcrumb.icon-->
    <!--              :label=breadcrumb.title-->
    <!--              :to="getRoute(breadcrumb.route)"-->
    <!--              class="q-breadcrumbs-el"-->
    <!--            />-->
    <!--          </q-breadcrumbs-el>-->
    <!--        </q-breadcrumbs>-->
    <!--      </div>-->
    <!--      <q-btn-group v-if="!isAdminPage"-->
    <!--                   class="top-menu-items"-->
    <!--      >-->
    <!--        <q-btn v-for="(menuItem, index) in topMenuItems"-->
    <!--               :key="index"-->
    <!--               color="gray"-->
    <!--               :label="menuItem.title"-->
    <!--               :href="menuItem.scrollTo"-->
    <!--        />-->
    <!--      </q-btn-group>-->
    <!--    </div>-->
    <!--    <div-->
    <!--      class="left-side"-->
    <!--      :class="{'col-6': windowSize.x < 599, 'col-6': windowSize.x > 1439}">-->
    <!--      <q-btn-dropdown-->
    <!--        v-if="false"-->
    <!--        class="toolbar-button"-->
    <!--        content-class="profile-menu"-->
    <!--        icon="isax:notification"-->
    <!--        dropdown-icon="false"-->
    <!--        color="white"-->
    <!--        text-color="accent"-->
    <!--        dir="ltr"-->
    <!--        dense-->
    <!--        unelevated-->
    <!--      />-->
    <!--      <q-btn-dropdown-->
    <!--        v-if="user && typeof user.id !== 'undefined' && user.id !== null && !isAdminPage"-->
    <!--        class="toolbar-button"-->
    <!--        content-class="profile-menu"-->
    <!--        icon="isax:setting"-->
    <!--        dropdown-icon="false"-->
    <!--        color="white"-->
    <!--        text-color="accent"-->
    <!--        dir="ltr"-->
    <!--        dense-->
    <!--        unelevated-->
    <!--        @click="goToAdminDashboard"-->
    <!--      />-->
    <!--      <q-btn-dropdown-->
    <!--        v-if="user && typeof user.id !== 'undefined' && user.id !== null && isAdminPage"-->
    <!--        class="toolbar-button"-->
    <!--        content-class="profile-menu"-->
    <!--        icon="isax:home"-->
    <!--        dropdown-icon="false"-->
    <!--        color="white"-->
    <!--        text-color="accent"-->
    <!--        dir="ltr"-->
    <!--        dense-->
    <!--        unelevated-->
    <!--        @click="goToHome"-->
    <!--      />-->
    <!--      <q-btn-dropdown-->
    <!--        v-if="user && typeof user.id !== 'undefined' && user.id !== null"-->
    <!--        class="toolbar-button"-->
    <!--        content-class="profile-menu"-->
    <!--        icon="isax:logout"-->
    <!--        dropdown-icon="false"-->
    <!--        color="white"-->
    <!--        text-color="accent"-->
    <!--        dir="ltr"-->
    <!--        dense-->
    <!--        unelevated-->
    <!--        @click="logOut"-->
    <!--      >-->
    <!--        <q-list v-if="false">-->
    <!--          <q-item clickable-->
    <!--                  v-close-popup-->
    <!--                  @click="goToHome"-->
    <!--          >-->
    <!--            <q-item-section>-->
    <!--              <q-item-label>صفحه اصلی</q-item-label>-->
    <!--            </q-item-section>-->
    <!--          </q-item>-->
    <!--          <q-item clickable-->
    <!--                  v-close-popup-->
    <!--                  @click="logOut"-->
    <!--          >-->
    <!--            <q-item-section>-->
    <!--              <q-item-label>خروج</q-item-label>-->
    <!--            </q-item-section>-->
    <!--          </q-item>-->
    <!--        </q-list>-->
    <!--      </q-btn-dropdown>-->
    <!--      <q-btn-->
    <!--        v-else-->
    <!--        class="toolbar-button"-->
    <!--        icon="isax:login"-->
    <!--        color="white"-->
    <!--        text-color="accent"-->
    <!--        dense-->
    <!--        unelevated-->
    <!--        @click="logOut"-->
    <!--      />-->
    <!--    </div>-->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'templateHeader',
  data () {
    return {
      topMenuItems: [
        // {
        //   title: 'معرفی پروژه',
        //   scrollTo: '#introSection',
        //   routeName: 'aaaaaaaaaaaa'
        // },
        // {
        //   title: 'مجامع',
        //   scrollTo: '#majameSection',
        //   routeName: 'aaaaaaaaaaaa'
        // },
        // {
        //   title: 'مشاورین حقوقی',
        //   scrollTo: '#moshaverinSection',
        //   routeName: 'aaaaaaaaaaaa'
        // },
        // {
        //   title: 'تصاویر',
        //   scrollTo: '#gallerySection',
        //   routeName: 'aaaaaaaaaaaa'
        // },
        // {
        //   title: 'اخبار و رویدادها',
        //   scrollTo: '#newsSection',
        //   routeName: 'aaaaaaaaaaaa'
        // },
        // {
        //   title: 'ارتباط با ما',
        //   scrollTo: '#feedback',
        //   routeName: 'aaaaaaaaaaaa'
        // }
      ]
    }
  },
  computed: {
    isAdminPage () {
      return this.$route.name && this.$route.name.includes('Admin.')
    },
    isHomePage () {
      return this.$route.name && this.$route.name === 'UserPanel.Home'
    },
    user () {
      return this.$store.getters['Auth/user']
    },
    ...mapGetters('AppLayout', [
      'breadcrumbs',
      'windowSize'
    ])
  },
  methods: {
    ...mapMutations('AppLayout', [
      'updateLayoutLeftDrawerVisible'
    ]),
    goToHome () {
      this.$router.push({ name: 'UserPanel.Home' })
    },
    goToAdminDashboard () {
      this.$router.push({ name: 'Admin.Content.Index' })
    },
    logOut () {
      this.$store.dispatch('Auth/logOut')
    },
    toggleLeftDrawer () {
      this.updateLayoutLeftDrawerVisible(true)
    },
    hasRoute (route) {
      if (!route) {
        return
      }
      return !!(route.name || route.path)
    },
    getRoute (route) {
      if (!this.hasRoute(route)) {
        return { name: null }
      }
      if (route.name) {
        return { name: route.name }
      } else if (route.path) {
        return { path: route.path }
      } else {
        return { name: null }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.drawer-btn {
  display: none;
  @media screen and (max-width: 1439px) {
    display: block;
  }
  @media screen and (max-width: 599px) {
    margin-bottom: 10px;
  }
}

.right-side {
  display: flex;
  align-items: center;
  @media screen and (max-width: 1439px) {
    margin-left: 78px;
  }
  @media screen and (max-width: 1023px) {
    margin-left: 42px;
  }
  @media screen and (max-width: 599px) {
    margin-left: 0;
  }

  .breadcrumbs {
    &:deep(> *) {
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 31px;
      text-align: right;
      color: #23263B;

      div:first-child {
        font-size: 18px;
      }
    }
  }
}

.left-side {
  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: 1439px) {
    position: absolute;
    right: 30px;
  }
  @media screen and (max-width: 599px) {
    right: 16px;
    margin-bottom: 10px;
  }
}
</style>
<style lang="scss">
.header-inside {
  .admin-top-menu {
    display: flex;
    flex-flow: row;
    height: 100%;
    .top-menu-items {
      width: calc( 100% - 240px );
    }
    .logo {
      width: 240px;
      height: 100%;
      background: #FBF4EA;
      border-right: solid 1px #DFE1EC;
      display: flex;
      align-items: center;
      justify-content: center;
      .logo-image {
        width: 106px;
        height: auto;
      }
    }
  }
  .user-top-menu {
    &.isHomePage {
      margin-top: 30px;
      margin-right: 100px;
      margin-left: 100px;
      .q-toolbar {
        min-height: 68px;
      }
    }
  }
}

.top-menu-items {
  border-radius: 10px;
  .q-btn {
    background: #0000008a;
  }
  @media only screen and (max-width: 1439px) {
    & {
      display: none !important;
    }
  }
  @media only screen and (max-width: 500px) {
    .q-btn__content {
      margin: 4px;
      font-size: 0.7rem;
    }
  }
  @media only screen and (max-width: 400px) {
    .q-btn__content {
      margin: 3px;
      font-size: 0.6rem;
    }
  }
}

.breadcrumbs {
  .q-breadcrumbs__separator {
    .q-icon {
      font-size: 22px;
    }
  }
}

.drawer-btn {
  .q-btn {
    flex-direction: row !important;

    &.toolbar-button {
      margin-left: 0 !important;
    }
  }
}

.q-btn {
  &.toolbar-button {
    margin-left: 12px;
    height: 48px;
    width: 48px;
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
    border-radius: 16px;
    border: solid 1px #c5c5c5;
  }
}

.left-side {
  .q-btn {
    &.toolbar-button {
      .q-btn__content {
        .q-btn-dropdown__arrow {
          display: none !important;
        }
      }
    }
  }
}
</style>
