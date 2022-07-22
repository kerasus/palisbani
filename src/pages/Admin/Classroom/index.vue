<template>
  <q-btn color="primary"
         label="ایجاد دسته بندی جدید"
         :to="{name: 'Admin.Classroom.Create'}"
  />
  <entity-index
    v-model:value="inputs"
    title="لیست دسته بندی ها"
    :api="api"
    :table="table"
    :table-keys="tableKeys"
  >
    <template #table-cell="{inputData, showConfirmRemoveDialog}">
      <q-td :props="inputData.props">
        <template v-if="inputData.props.col.name === 'actions'">
          <q-btn size="md"
                 color="primary"
                 label="جزییات"
                 :to="{name: 'Admin.Classroom.Show', params: {id: inputData.props.row.id}}">
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
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
import { EntityIndex } from 'quasar-crud'
import moment from 'moment-jalaali'

export default {
  name: 'Admin.Classroom.Index',
  components: {
    EntityIndex
  },
  data () {
    return {
      inputs: [],
      api: API_ADDRESS.classroom.base,
      table: {
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
            label: 'نام درس',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'audience_gender_type',
            required: true,
            label: 'جنسیت',
            align: 'left',
            field: row => (row.audience_gender_type === 'FEMALE') ? 'خواهران' : (row.audience_gender_type === 'MALE') ? 'برادران' : 'خواهران و برادران'
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: ''
          },
          {
            name: 'title',
            required: true,
            label: 'نوع برگزاری',
            align: 'left',
            field: row => row.holding_type
          },
          {
            name: 'title',
            required: true,
            label: 'هزینه(تومان)',
            align: 'left',
            field: row => row.price
          },
          {
            name: 'title',
            required: true,
            label: 'استاد مربوطه',
            align: 'left',
            field: row => row.professor
          },
          {
            name: 'title',
            required: true,
            label: 'تاریخ و زمان ثبت نام',
            align: 'left',
            field: row => moment(row.beginning_registration_period, 'YYYY-M-D hh:mm:ss').format('hh:mm:ss jYYYY/jMM/jDD')
          },
          {
            name: 'title',
            required: true,
            label: 'ترم برگزاری',
            align: 'left',
            field: row => '...'
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
      tableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      }
    }
  },
  methods: {
    // for index.vue
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.title + ' اطمینان دارید؟'
    }
  }
}
</script>
