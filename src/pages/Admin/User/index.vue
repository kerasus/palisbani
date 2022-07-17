<template>
  <entity-index
    v-model:value="inputs"
    title="لیست کاربران"
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
                 :to="{name: 'Admin.User.Show', params: {id: inputData.props.row.id}}">
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

export default {
  name: 'Admin.User.Index',
  components: {
    EntityIndex
  },
  data () {
    return {
      inputs: [
        { type: 'input', name: 'id', value: null, label: 'شماره', col: 'col-md-3' },
        { type: 'input', name: 'first_name', value: null, label: 'نام', col: 'col-md-3' },
        { type: 'input', name: 'last_name', value: null, label: 'نام خانوادگی', col: 'col-md-3' },
        { type: 'input', name: 'last_name', value: null, label: 'کد ملی', col: 'col-md-3' }
      ],
      api: API_ADDRESS.user.base,
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
            name: 'fullname',
            required: true,
            label: 'نام و نام خانوادگی',
            align: 'left',
            field: row => row.firstname + row.lastname
          },
          {
            name: 'first_name',
            required: true,
            label: 'کد ملی',
            align: 'left',
            field: row => row.national_code
          },
          {
            name: 'last_name',
            required: true,
            label: 'شماره تلفن',
            align: 'left',
            field: row => row.on_call_mobile_number
          },
          {
            name: 'email',
            required: true,
            label: 'نقش',
            align: 'left',
            field: row => 'نقش'
          },
          {
            name: 'status',
            required: true,
            label: 'وضعیت',
            align: 'left',
            field: row => 'وضعیت'
          },
          {
            name: 'actions',
            required: true,
            label: '',
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
      return 'آیا از حذف ' + row.firstname + row.lastname + ' اطمینان دارید؟'
    }
  }
}
</script>
