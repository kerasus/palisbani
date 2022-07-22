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
                        name: 'page-builder-section',
                        data: {
                          rows: [
                            {
                              cols: [
                                {
                                  widgets: [
                                    {
                                      name: 'test-component1-widget'
                                    }
                                  ]
                                },
                                {
                                  widgets: [
                                    {
                                      name: 'test-component2-widget'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      }
                    ]
                  }
                ]
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'test-component1-widget'
                      }
                    ]
                  },
                  {
                    widgets: [
                      {
                        name: 'page-builder-section',
                        data: {
                          rows: [
                            {
                              cols: [
                                {
                                  widgets: [
                                    {
                                      name: 'test-component1-widget'
                                    }
                                  ]
                                },
                                {
                                  widgets: [
                                    {
                                      name: 'test-component2-widget'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          options: {
            fullHeight: true,
            verticalAlign: 'center',
            background: [
              {
                image: 'https://nodes.alaatv.com/upload/images/slideShow/1658222956_6038.jpg?w=1845&h=720',
                position: 'center',
                size: 'cover',
                repeat: 'no-repeat',
                attachment: 'unset' // unset - fixed
              },
              {
                breakpoint: 1000,
                image: 'https://nodes.alaatv.com/upload/images/slideShow/1642417634_2227.jpg?w=1845&h=720',
                position: 'center',
                size: 'cover',
                repeat: 'no-repeat',
                attachment: 'fixed' // unset - fixed
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
