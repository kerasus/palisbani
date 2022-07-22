<template>
  <page-builder :sections="sections"
                :options="pageConfig"></page-builder>
</template>

<script>
import pageBuilder from 'src/components/PageBuilder/PageBuilder'

export default {
  name: 'index',
  components: { pageBuilder },
  data () {
    return {
      pageConfig: {
        padding: {
          // a: 'md'
        }
      },
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'AllClassrooms'
                      }
                    ]
                  }
                ],
                options: {
                  boxed: true
                }
              }
            ]
          }
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
