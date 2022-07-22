<template>
  <entity-create
    v-model:value="inputs"
    title="مشخصات دسته بندی"
    :api="api"
    :entity-id-key="entityIdKey"
    :entity-param-key="entityParamKey"
    :show-route-name="showRouteName"
    ref="categoryEntityCreate"
    :show-close-button="false"
    :show-edit-button="false"
    :show-expand-button="false"
    :show-save-button="false"
    :show-reload-button="false"
  >
    <template #after-form-builder>
      <div class="flex justify-end">
        <q-btn color="primary"
               label="تایید"
               @click="createCategory"
        />
      </div>
      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-md-3">
          <q-input v-model="newUnitName"
                   label="درس ها"
                   :disable="true" />
        </div>
        <div class="col-md-3">
          <q-input v-model="newUnitSessionCount"
                   label="تعداد جلسات"
                   type="number"
                   :disable="true" />
        </div>
        <div class="col-md-3">
          <q-btn color="primary"
                 label="افزودن"
                 :disable="true"
          />
        </div>
      </div>
    </template>
  </entity-create>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
import { EntityCreate } from 'quasar-crud'

export default {
  name: 'Admin.Category.Create',
  components: {
    EntityCreate
  },
  data () {
    return {
      newUnitLoading: false,
      newUnitName: null,
      newUnitSessionCount: null,
      api: API_ADDRESS.category.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Category.Show',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'نام دسته بندی', col: 'col-md-6' },
        { type: 'separator', name: 'space', size: '0', col: 'col-md-12' }
      ]
    }
  },
  methods: {
    createCategory () {
      this.$refs.categoryEntityCreate.createEntity()
    }
  }
}
</script>
