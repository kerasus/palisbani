<template>
  <component
    :is="widget.name"
    :data="widget.data"
    :options="widget.options"
  />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mixinWidget } from 'src/mixin/Mixins'

export default {
  name: 'PageBuilderWidget',
  // components,
  components: {
    PageBuilderSection: defineAsyncComponent(() => import('./PageBuilderSection.vue')),
    HomePageFirstSection: defineAsyncComponent(() => import('components/Widgets/HomePage/FirstSection.vue')),
    ClassroomCarousel: defineAsyncComponent(() => import('components/Widgets/ClassroomCarousel.vue')),
    AllClassrooms: defineAsyncComponent(() => import('components/Widgets/AllClassrooms.vue'))
    // TestComponent1Widget: defineAsyncComponent(() => import('components/Widgets/TestComponent1Widget.vue')),
    // TestComponent2Widget: defineAsyncComponent(() => import('components/Widgets/TestComponent2Widget.vue')),
    // BlockComponent: defineAsyncComponent(() => import('components/Widgets/Block/Block.vue')),
    // Slider: defineAsyncComponent(() => import('components/Widgets/Slider.vue')),
    // Segment: defineAsyncComponent(() => import('components/Widgets/Segment/Segment.vue')),
    // ContentShowInfo: defineAsyncComponent(() => import('components/Widgets/Content/Show.vue')),
    // productDemos: defineAsyncComponent(() => import('components/Widgets/Product/productDemos')),
    // productReview: defineAsyncComponent(() => import('components/Widgets/Product/productReview')),
    // productIntroduction: defineAsyncComponent(() => import('components/Widgets/Product/productIntroduction')),
    // blockList: defineAsyncComponent(() => import('components/Widgets/BlockList/BlockList'))
  },
  props: {
    widget: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mixins: [mixinWidget],
  created () {
  },
  data () {
    return {}
  }
}
</script>

<style scoped>

</style>
