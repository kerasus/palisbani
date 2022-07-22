<template>
  <entity-edit
    v-model:value="inputs"
    ref="categoryEntityEdit"
    title="جزییات جلسه"
    :api="api"
    :entity-id-key="entityIdKey"
    :entity-param-key="entityParamKey"
    :show-route-name="showRouteName"
    :show-close-button="false"
    :show-edit-button="false"
    :show-expand-button="false"
    :show-save-button="false"
    :show-reload-button="false"
  >
    <template #after-form-builder>
      <div class="flex justify-end">
        <q-btn color="primary"
               label="ذخیره جزییات"
               @click="updateSessionTemplates"
        />
      </div>
    </template>
  </entity-edit>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
import { EntityEdit } from 'quasar-crud'

export default {
  name: 'Admin.SessionTemplates.Index',
  components: {
    EntityEdit
  },
  data () {
    return {
      newUnitLoading: false,
      newUnitName: null,
      newUnitSessionCount: null,
      api: API_ADDRESS.sessionTemplates.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.SessionTemplate.Show',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'نام جلسه', col: 'col-md-6' },
        { type: 'separator', name: 'space', size: '0', col: 'col-md-12' },
        {
          type: 'tiptap-editor',
          name: 'description',
          responseKey: 'description',
          label: 'توضیحات',
          options: {
            bubbleMenu: false,
            floatingMenu: false,
            poem: false,
            reading: false,
            persianKeyboard: true,
            mathliveOptions: { smartFence: false },
            uploadServer: {
              url: API_ADDRESS.media.upload,
              instantUpload: true,
              responseKey: 'file',
              headers: { Authorization: 'Bearer ' + this.$store.getters['Auth/accessToken'] }
            }
          },
          col: 'col-md-6'
        },
        {
          type: 'tiptap-editor',
          name: 'syllabus',
          responseKey: 'description',
          label: 'مقرری',
          options: {
            bubbleMenu: false,
            floatingMenu: false,
            poem: false,
            reading: false,
            persianKeyboard: true,
            mathliveOptions: { smartFence: false },
            uploadServer: {
              url: API_ADDRESS.media.upload,
              instantUpload: true,
              responseKey: 'file',
              headers: { Authorization: 'Bearer ' + this.$store.getters['Auth/accessToken'] }
            }
          },
          col: 'col-md-6'
        },
        {
          type: 'tiptap-editor',
          name: 'description',
          responseKey: 'description',
          label: 'تکلیف',
          options: {
            bubbleMenu: false,
            floatingMenu: false,
            poem: false,
            reading: false,
            persianKeyboard: true,
            mathliveOptions: { smartFence: false },
            uploadServer: {
              url: API_ADDRESS.media.upload,
              instantUpload: true,
              responseKey: 'file',
              headers: { Authorization: 'Bearer ' + this.$store.getters['Auth/accessToken'] }
            }
          },
          col: 'col-md-12'
        }
      ]
    }
  },
  created () {
    this.api += '/' + this.$route.params.id
  },
  methods: {
    updateSessionTemplates () {
      this.$refs.categoryEntityEdit.editEntity()
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.title + ' اطمینان دارید؟'
    },
    reloadUnits () {
      this.$refs.unitEntityIndex.reload()
    },
    createUnit () {
      this.newUnitLoading = true
      this.$axios.post(API_ADDRESS.unit.base, {
        title: this.newUnitName,
        category: this.$route.params.id,
        default_session_count: this.newUnitSessionCount
      })
        .then(() => {
          this.newUnitLoading = false
          this.reloadUnits()
        })
        .catch(() => {
          this.newUnitLoading = false
        })
    }
  }
}
</script>

<style>
.fit-to-card {
  margin: -16px;
}
</style>
