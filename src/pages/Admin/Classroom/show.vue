<template>
  <q-card>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="classroomInfo"
             label="مشخصات" />
      <q-tab name="educations"
             label="لیست جلسات" />
      <q-tab name="movies1"
             label="پروژه‌ها" />
      <q-tab name="movies2"
             label="آزمون" />
      <q-tab name="movies3"
             label="کاربران" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab"
                  animated>
      <q-tab-panel name="classroomInfo">
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
          :before-get-data="beforeGetData"
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
      </q-tab-panel>
      <q-tab-panel name="educations">
        <entity-index
          v-model:value="sessionListInputs"
          title="لیست جلسات"
          :api="sessionListApi"
          :table="sessionListTable"
          :table-keys="sessionListTableKeys"
          :show-search-button="false"
          :show-reload-button="false"
          :show-expand-button="false"
        >
          <template #table-cell="{inputData, showConfirmRemoveDialog}">
            <q-td :props="inputData.props">
              <template v-if="inputData.props.col.name === 'actions'">
                <q-btn size="md"
                       color="primary"
                       label="جزییات"
                       :to="{name: 'Admin.Session.Show', params: {id: inputData.props.row.id}}">
                </q-btn>
                <q-btn round
                       flat
                       dense
                       size="md"
                       color="negative"
                       icon="delete"
                       class="q-ml-md"
                       @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))">
                  <q-tooltip>
                    حذف
                  </q-tooltip>
                </q-btn>
              </template>
              <template v-else>
                {{ inputData.props.value }}
              </template>
            </q-td>
          </template>
        </entity-index>
      </q-tab-panel>

      <q-tab-panel name="movies1">
        پروژه‌ها
      </q-tab-panel>
      <q-tab-panel name="movies2">
        آزمون
      </q-tab-panel>
      <q-tab-panel name="movies3">
        کاربران
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
import Enums from 'src/assets/Enums/Enums'
import { EntityEdit, EntityIndex } from 'quasar-crud'
import moment from 'moment-jalaali'

export default {
  name: 'Admin.Classroom.Show',
  components: {
    EntityEdit,
    EntityIndex
  },
  data () {
    return {
      tab: 'classroomInfo',
      api: API_ADDRESS.classroom.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.User.Show',
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
      ],

      sessionListInputs: [
        { type: 'hidden', name: 'classroom', value: this.$route.params.id, label: 'نام دوره', col: 'col-md-12' }
      ],
      sessionListApi: API_ADDRESS.session.base,
      sessionListTable: {
        columns: [
          {
            name: 'id',
            required: true,
            label: 'شماره',
            align: 'left',
            field: row => row.id
          },
          {
            name: 'title',
            required: true,
            label: 'عنوان جلسه',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'creation_time',
            required: true,
            label: 'زمان شروع جلسه',
            align: 'left',
            field: row => row.starting_time ? moment(row.starting_time, 'YYYY-M-D hh:mm:ss').format('hh:mm:ss jYYYY/jMM/jDD') : '-'
          },
          {
            name: 'last_modification_time',
            required: true,
            label: 'زمان پایان جلسه',
            align: 'left',
            field: row => row.ending_time ? moment(row.ending_time, 'YYYY-M-D hh:mm:ss').format('hh:mm:ss jYYYY/jMM/jDD') : '-'
          },
          {
            name: 'actions',
            required: true,
            label: 'عملیات',
            align: 'left',
            field: ''
          }
        ],
        data: []
      },
      sessionListTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      }
    }
  },
  computed: {
    selectedCategoryId () {
      return this.getInputValue('category')
    }
  },
  watch: {
    selectedCategoryId () {
      this.setInputValue('unit', null)
      this.getUnits(this.selectedCategoryId)
    }
  },
  created () {
    this.api += '/' + this.$route.params.id
    this.beforeGetData()
  },
  methods: {
    beforeGetData () {
      this.getCategories()
    },
    getCategories () {
      this.$axios.get(API_ADDRESS.category.base)
        .then(response => {
          this.loadSelectOptions('category', this.getSelectOptions(response.data.results, 'id', 'title'))
        })
    },
    getUnits (selectedClassId) {
      this.$axios.get(API_ADDRESS.unit.base + '?category=' + this.selectedCategoryId)
        .then(response => {
          this.loadSelectOptions('unit', this.getSelectOptions(response.data.results, 'id', 'title'))
        })
    },
    getSelectOptions (result, value, label) {
      return result.map(item => {
        return {
          value: item[value],
          label: item[label]
        }
      })
    },
    getInputValue (name) {
      const inputIndex = this.inputs.findIndex(input => input.name === name)
      return this.inputs[inputIndex].value
    },
    setInputValue (name, value) {
      const inputIndex = this.inputs.findIndex(input => input.name === name)
      this.inputs[inputIndex].value = value
    },
    loadSelectOptions (name, value) {
      const inputIndex = this.inputs.findIndex(input => input.name === name)
      this.inputs[inputIndex].options = value
    },
    updateClassroom () {
      this.$refs.categoryEntityEdit.editEntity()
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.title + ' اطمینان دارید؟'
    }
  }
}
</script>

<style>
.fit-to-card {
  margin: -16px;
}
</style>
