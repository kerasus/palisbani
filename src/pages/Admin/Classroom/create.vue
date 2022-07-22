<template>
  <entity-create
    v-model:value="inputs"
    title="مشخصات دسته بندی"
    :api="api"
    :entity-id-key="entityIdKey"
    :entity-param-key="entityParamKey"
    :show-route-name="showRouteName"
    ref="classroomEntityCreate"
    :show-close-button="false"
    :show-edit-button="false"
    :show-expand-button="false"
    :show-save-button="false"
    :show-reload-button="false"
  >
    <template #after-form-builder>
      <div class="flex justify-end">
        <q-btn color="primary"
               label="ایجاد دوره آموزشی جدید"
               @click="createClassroom"
        />
      </div>
    </template>
  </entity-create>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
import { EntityCreate } from 'quasar-crud'
import Enums from 'assets/Enums/Enums'

export default {
  name: 'Admin.Classroom.Create',
  components: {
    EntityCreate
  },
  data () {
    return {
      newUnitLoading: false,
      newUnitName: null,
      newUnitSessionCount: null,
      api: API_ADDRESS.classroom.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Classroom.Show',
      inputs: [
        { type: 'file', name: 'title', responseKey: 'title', label: 'آپلود عکس دوره', col: 'col-md-3' },
        { type: 'input', name: 'title', responseKey: 'title', label: 'نام دوره', col: 'col-md-12' },
        {
          type: 'select',
          name: 'category',
          responseKey: 'category',
          options: [],
          value: null,
          label: 'دسته بندی',
          col: 'col-md-3'
        },
        {
          type: 'select',
          name: 'unit',
          responseKey: 'unit',
          options: [],
          value: null,
          label: 'درس',
          col: 'col-md-3'
        },
        {
          type: 'select',
          name: 'audience_gender_type',
          responseKey: 'audience_gender_type',
          options: Enums.genders,
          value: null,
          label: 'جنسیت',
          col: 'col-md-3'
        },
        {
          type: 'select',
          name: 'audience_role',
          responseKey: 'audience_role',
          options: Enums.groups,
          value: null,
          label: 'نقش',
          col: 'col-md-3'
        },
        {
          type: 'select',
          name: 'category',
          responseKey: 'category',
          options: [],
          value: null,
          label: 'مجموعه',
          col: 'col-md-3'
        },
        {
          type: 'select',
          name: 'professor',
          responseKey: 'professor',
          options: [],
          value: null,
          label: 'استاد دوره',
          col: 'col-md-3'
        },
        { type: 'input', name: 'price', responseKey: 'price', label: 'هزینه برگزاری', col: 'col-md-3' },
        { type: 'input', name: 'capacity', responseKey: 'capacity', label: 'ظرفیت گروه درسی', col: 'col-md-3' },
        { type: 'input', name: 'allowed_absence_count', responseKey: 'allowed_absence_count', label: 'تعداد مجاز غیبت', col: 'col-md-3' },
        { type: 'input', name: 'effective_absence_coefficient', responseKey: 'effective_absence_coefficient', label: 'ضریب نمره حضور و غیاب', col: 'col-md-3' },
        { type: 'input', name: 'mandatory_assignment_count', responseKey: 'mandatory_assignment_count', label: 'تعداد تکالیف اجباری', col: 'col-md-3' },
        { type: 'input', name: 'maximum_failing_mark', responseKey: 'maximum_failing_mark', label: 'حداقل نمره قبولی', col: 'col-md-3' },
        { type: 'input', name: 'minimum_conditional_passing_mark', responseKey: 'minimum_conditional_passing_mark', label: 'حداقل نمره عدم مردودی', col: 'col-md-3' },
        { type: 'input', name: 'minimum_clean_passing_mark', responseKey: 'minimum_clean_passing_mark', label: 'حداقل نمره قبولی مشروط', col: 'col-md-3' },
        {
          type: 'select',
          name: 'holding_type',
          responseKey: 'holding_type',
          options: Enums.classroomHoldingTypes,
          value: null,
          label: 'نوع برگزاری',
          col: 'col-md-3'
        },
        { type: 'input', name: 'live_streaming_url', responseKey: 'live_streaming_url', label: 'لینک مکان برگزاری', col: 'col-md-12' },
        { type: 'inputEditor', name: 'classroom_address', responseKey: 'classroom_address', label: 'آدرس مکان برگزاری', col: 'col-md-12' },
        { type: 'dateTime', name: 'beginning_enrollment_period', responseKey: 'beginning_enrollment_period', label: 'تاریخ شروع پیش ثبت نام', col: 'col-md-6' },
        { type: 'dateTime', name: 'ending_enrollment_period', responseKey: 'ending_enrollment_period', label: 'تاریخ پایان پیش ثبت نام', col: 'col-md-6' },
        { type: 'dateTime', name: 'beginning_registration_period', responseKey: 'beginning_registration_period', label: 'تاریخ شروع ثبت نام', col: 'col-md-6' },
        { type: 'dateTime', name: 'ending_registration_period', responseKey: 'ending_registration_period', label: 'تاریخ پایان ثبت نام', col: 'col-md-6' },
        { type: 'input', name: 'title', responseKey: 'title', label: 'ترم برگزاری', col: 'col-md-3' },
        { type: 'inputEditor', name: 'rules', responseKey: 'rules', label: 'قوانین دوره آموزشی', col: 'col-md-12' },
        { type: 'dateTime', name: 'published_date', responseKey: 'published_date', label: 'تاریخ انتشار', col: 'col-md-6' }
      ]
    }
  },
  methods: {
    createClassroom () {
      this.$refs.classroomEntityCreate.createEntity()
    }
  }
}
</script>
