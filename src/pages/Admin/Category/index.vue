<template>
  <q-btn color="primary"
         label="ایجاد دسته بندی جدید"
         :to="{name: 'Admin.Category.Create'}"
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
                 :to="{name: 'Admin.Category.Show', params: {id: inputData.props.row.id}}">
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
  name: 'Admin.Category.Index',
  components: {
    EntityIndex
  },
  data () {
    return {
      inputs: [
        { type: 'input', name: 'title', value: null, label: 'نام', col: 'col-md-12' }
      ],
      api: API_ADDRESS.category.base,
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
            label: 'نام',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'count',
            required: true,
            label: 'تعداد درس های دسته',
            align: 'left',
            field: () => '...'
          },
          {
            name: 'creation_time',
            required: true,
            label: 'تاریخ ایجاد',
            align: 'left',
            field: row => moment(row.creation_time, 'YYYY-M-D hh:mm:ss').format('jYYYY/jMM/jDD hh:mm:ss')
          },
          {
            name: 'last_modification_time',
            required: true,
            label: 'تاریخ آخرین تغییر',
            align: 'left',
            field: row => moment(row.last_modification_time, 'YYYY-M-D hh:mm:ss').format('jYYYY/jMM/jDD hh:mm:ss')
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
