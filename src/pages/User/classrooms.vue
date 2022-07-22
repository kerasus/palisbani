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
                        name: 'HomePageFirstSection'
                      }
                    ]
                  }
                ],
                options: {
                  boxed: true
                }
              }
            ]
          },
          options: {
            fullHeight: true,
            verticalAlign: 'center',
            background: {
              image: 'assets/images/web/homepage-first-section-background.png',
              position: 'center',
              size: 'cover',
              repeat: 'no-repeat',
              attachment: 'fixed' // unset - fixed
            },
            style: {
              marginTop: '-98px'
            }
          }
        },
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'ClassroomCarousel'
                      }
                    ]
                  }
                ],
                options: {
                  boxed: true
                }
              }
            ]
          },
          options: {
            background: {
              color: '#F6F6F6'
            }
          }
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
