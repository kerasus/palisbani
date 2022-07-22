<template>
  <entity-edit
    v-model:value="inputs"
    ref="categoryEntityEdit"
    title="مشخصات دسته بندی"
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
               label="تایید"
               @click="updateCategory"
        />
      </div>
      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-md-3">
          <q-input v-model="newUnitName"
                   label="درس ها"
                   :disable="newUnitLoading"
                   :loading="newUnitLoading" />
        </div>
        <div class="col-md-3">
          <q-input v-model="newUnitSessionCount"
                   label="تعداد جلسات"
                   type="number"
                   :disable="newUnitLoading"
                   :loading="newUnitLoading" />
        </div>
        <div class="col-md-3">
          <q-btn color="primary"
                 label="افزودن"
                 @click="createUnit"
          />
        </div>
      </div>
      <div class="row ">
        <div class="col">
          <entity-index
            v-model:value="unitFilterInputs"
            ref="unitEntityIndex"
            title="لیست درس ها"
            :api="unitApi"
            :table="unitTable"
            :table-keys="unitTableKeys"
            :show-reload-button="false"
            :show-search-button="false"
            :show-expand-button="false"
          >
            <template #table-cell="{inputData, showConfirmRemoveDialog}">
              <q-td :props="inputData.props">
                <template v-if="inputData.props.col.name === 'actions'">
                  <q-btn size="md"
                         color="primary"
                         label="تعیین جزییات"
                         :to="{name: 'Admin.Unit.Show', params: {id: inputData.props.row.id}}">
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
        </div>
      </div>
    </template>
  </entity-edit>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
import { EntityEdit, EntityIndex } from 'quasar-crud'
import moment from 'moment-jalaali'

export default {
  name: 'Admin.Category.Index',
  components: {
    EntityEdit,
    EntityIndex
  },
  data () {
    return {
      newUnitLoading: false,
      newUnitName: null,
      newUnitSessionCount: null,
      api: API_ADDRESS.category.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.User.Show',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'نام دسته بندی', col: 'col-md-6' }
      ],

      unitFilterInputs: [],

      unitApi: API_ADDRESS.unit.base + '?category=' + this.$route.params.id,
      unitTable: {
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
            name: 'count',
            required: true,
            label: 'تعداد جلسات',
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
      unitTableKeys: {
        data: 'results',
        total: 'count',
        currentPage: 'current',
        perPage: 'per_page',
        pageKey: 'page'
      }

    }
  },
  created () {
    this.api += '/' + this.$route.params.id
  },
  methods: {
    updateCategory () {
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
