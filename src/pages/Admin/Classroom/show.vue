<template>
  <entity-edit
    v-model:value="inputs"
    ref="categoryEntityEdit"
    title="مشخصات دوره آموزشی"
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
               label="بروزرسانی اطلاعات"
               @click="updateClassroom"
        />
      </div>
    </template>
  </entity-edit>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
import { EntityEdit } from 'quasar-crud'

export default {
  name: 'Admin.Classroom.Index',
  components: {
    EntityEdit
  },
  data () {
    return {
      newUnitLoading: false,
      newUnitName: null,
      newUnitSessionCount: null,
      api: API_ADDRESS.classroom.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.User.Show',
      inputs: [
        { type: 'file', name: 'title', responseKey: 'title', label: 'آپلود عکس دوره', col: 'col-md-3' },
        { type: 'input', name: 'title', responseKey: 'title', label: 'نام دوره', col: 'col-md-12' },
        { type: 'select', name: 'category', responseKey: 'category', options: [{ label: 'انتقاد', value: 'انتقاد' }, { label: 'پیشنهاد', value: 'پیشنهاد' }], value: null, label: 'دسته بندی', col: 'col-md-3' },
        { type: 'select', name: 'category', responseKey: 'category', options: [{ label: 'انتقاد', value: 'انتقاد' }, { label: 'پیشنهاد', value: 'پیشنهاد' }], value: null, label: 'درس', col: 'col-md-3' },
        { type: 'select', name: 'category', responseKey: 'category', options: [{ label: 'انتقاد', value: 'انتقاد' }, { label: 'پیشنهاد', value: 'پیشنهاد' }], value: null, label: 'جنسیت', col: 'col-md-3' },
        { type: 'select', name: 'category', responseKey: 'category', options: [{ label: 'انتقاد', value: 'انتقاد' }, { label: 'پیشنهاد', value: 'پیشنهاد' }], value: null, label: 'نقش', col: 'col-md-3' },
        { type: 'select', name: 'category', responseKey: 'category', options: [{ label: 'انتقاد', value: 'انتقاد' }, { label: 'پیشنهاد', value: 'پیشنهاد' }], value: null, label: 'مجموعه', col: 'col-md-3' },
        { type: 'select', name: 'category', responseKey: 'category', options: [{ label: 'انتقاد', value: 'انتقاد' }, { label: 'پیشنهاد', value: 'پیشنهاد' }], value: null, label: 'استاد دوره', col: 'col-md-3' },
        { type: 'input', name: 'title', responseKey: 'title', label: 'هزینه برگزاری', col: 'col-md-3' },
        { type: 'input', name: 'title', responseKey: 'title', label: 'ظرفیت گروه درسی', col: 'col-md-3' },
        { type: 'input', name: 'title', responseKey: 'title', label: 'تعداد مجاز غیبت', col: 'col-md-3' },
        { type: 'input', name: 'title', responseKey: 'title', label: 'ضریب نمره حضور و غیاب', col: 'col-md-3' },
        { type: 'input', name: 'title', responseKey: 'title', label: 'تعداد تکالیف اجباری', col: 'col-md-3' },
        { type: 'input', name: 'title', responseKey: 'title', label: 'حداقل نمره قبولی', col: 'col-md-3' },
        { type: 'input', name: 'title', responseKey: 'title', label: 'حداقل نمره عدم مردودی', col: 'col-md-3' },
        { type: 'input', name: 'title', responseKey: 'title', label: 'حداقل نمره قبولی مشروط', col: 'col-md-3' },
        { type: 'select', name: 'category', responseKey: 'category', options: [{ label: 'انتقاد', value: 'انتقاد' }, { label: 'پیشنهاد', value: 'پیشنهاد' }], value: null, label: 'نوع برگزاری', col: 'col-md-3' },
        { type: 'input', name: 'title', responseKey: 'title', label: 'لینک مکان برگزاری', col: 'col-md-12' },
        { type: 'input', name: 'title', responseKey: 'title', label: 'آدرس مکان برگزاری', col: 'col-md-12' },
        { type: 'dateTime', name: 'title', responseKey: 'title', label: 'تاریخ شروع پیش ثبت نام', col: 'col-md-3' },
        { type: 'dateTime', name: 'title', responseKey: 'title', label: 'تاریخ پایان پیش ثبت نام', col: 'col-md-3' },
        { type: 'dateTime', name: 'title', responseKey: 'title', label: 'تاریخ شروع ثبت نام', col: 'col-md-3' },
        { type: 'dateTime', name: 'title', responseKey: 'title', label: 'تاریخ پایان ثبت نام', col: 'col-md-3' },
        { type: 'input', name: 'title', responseKey: 'title', label: 'ترم برگزاری', col: 'col-md-3' },
        { type: 'inputEditor', name: 'title', responseKey: 'title', label: 'قوانین دوره آموزشی', col: 'col-md-12' },
        { type: 'dateTime', name: 'title', responseKey: 'title', label: 'تاریخ انتشار', col: 'col-md-3' }
      ]
    }
  },
  created () {
    this.api += '/' + this.$route.params.id
  },
  methods: {
    updateClassroom () {
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
