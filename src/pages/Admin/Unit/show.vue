<template>
  <div>
    <div>
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
          <div>
            <q-banner class="banner">
              پیش نیازها
            </q-banner>
            <div class="row q-col-gutter-md">
              <div class="col-md-3">
                <select-control v-model:value="prerequisite.category"
                                :options="categories"
                                :disable="categoriesLoading"
                                :loading="categoriesLoading"
                                optionValue="id"
                                optionLabel="title"
                                label="دسته بندی"
                                @update:model-value="getUnits"
                />
              </div>
              <div class="col-md-3">
                <select-control v-model:value="prerequisite.unit"
                                :options="units"
                                :disable="unitsLoading"
                                :loading="unitsLoading"
                                optionValue="id"
                                optionLabel="title"
                                label="درس"
                />
              </div>
              <div class="col-md-3">
                <q-btn color="primary"
                       label="افزودن"
                       @click="updateCategory"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-end">
            <q-btn color="primary"
                   label="تایید"
                   @click="updateCategory"
            />
          </div>
        </template>
      </entity-edit>
    </div>
    <div class="q-mt-md">
      <entity-index
        v-model:value="sessionFilterInputs"
        ref="sessionEntityIndex"
        title="لیست جلسات"
        :api="sessionApi"
        :table="sessionTable"
        :table-keys="sessionTableKeys"
        :show-reload-button="false"
        :show-search-button="false"
        :show-expand-button="false"
      >
        <template #before-form-builder>
          <div class="flex justify-end">
            <q-btn color="primary"
                   outline
                   label="افزودن جلسه"
                   @click="updateCategory"
            />
          </div>
        </template>
        <template #table-cell="{inputData, showConfirmRemoveDialog}">
          <q-td :props="inputData.props">
            <template v-if="inputData.props.col.name === 'actions'">
              <div class="q-gutter-md">
                <q-btn size="md"
                       color="primary"
                       outline
                       label="بانک سوالات"
                       :to="{name: 'Admin.Session.Show', params: {id: inputData.props.row.id}}">
                </q-btn>
                <q-btn size="md"
                       color="primary"
                       label="تعیین جزییات"
                       :to="{name: 'Admin.SessionTemplate.Show', params: {id: inputData.props.row.id}}">
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
              </div>
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

<script>
import API_ADDRESS from 'src/api/Addresses'
import { EntityEdit, EntityIndex } from 'quasar-crud'
import moment from 'moment-jalaali'
import SelectControl from 'components/Control/Select'

export default {
  name: 'Admin.Category.Index',
  components: {
    SelectControl,
    EntityEdit,
    EntityIndex
  },
  data () {
    return {
      newSessionLoading: false,
      newSessionName: null,
      newSessionSessionCount: null,
      api: API_ADDRESS.unit.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.User.Show',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'نام درس', col: 'col-md-12' },
        {
          type: 'tiptapEditor',
          name: 'inputEditor',
          label: 'قوانین درس',
          options: {
            bubbleMenu: false,
            floatingMenu: false,
            poem: false,
            reading: false,
            persianKeyboard: true,
            mathliveOptions: { smartFence: false },
            uploadServer: {
              url: 'imageUrl',
              instantUpload: true,
              headers: { Authorization: 'Bearer ' + '65465' }
            }
          },
          col: 'col-md-12'
        },
        {
          type: 'tiptapEditor',
          name: 'inputEditor',
          label: 'آیین نامه',
          options: {
            bubbleMenu: false,
            floatingMenu: false,
            poem: false,
            reading: false,
            persianKeyboard: true,
            mathliveOptions: { smartFence: false },
            uploadServer: {
              url: 'imageUrl',
              instantUpload: true,
              headers: { Authorization: 'Bearer ' + '65465' }
            }
          },
          col: 'col-md-12'
        }
      ],

      categoriesLoading: false,
      categories: [],
      unitsLoading: false,
      units: [],
      prerequisite: {
        category: null,
        unit: null
      },

      sessionFilterInputs: [],

      sessionApi: API_ADDRESS.sessionTemplates.base + '?unit=' + this.$route.params.id,
      sessionTable: {
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
      sessionTableKeys: {
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
    this.getCategories()
  },
  methods: {
    getCategories () {
      this.categoriesLoading = true
      this.$axios.get(API_ADDRESS.category.base)
        .then(response => {
          this.categoriesLoading = false
          this.categories = response.data.results
        })
        .catch(() => {
          this.categoriesLoading = false
        })
    },
    getUnits () {
      this.unitsLoading = true
      this.$axios.get(API_ADDRESS.unit.base + '?category=' + this.prerequisite.category)
        .then(response => {
          this.unitsLoading = false
          this.units = response.data.results
        })
        .catch(() => {
          this.unitsLoading = false
        })
    },
    updateCategory () {
      this.$refs.categoryEntityEdit.editEntity()
    },
    getRemoveMessage (row) {
      return 'آیا از حذف ' + row.title + ' اطمینان دارید؟'
    },
    reloadSessions () {
      this.$refs.sessionEntityIndex.reload()
    },
    createSession () {
      this.newSessionLoading = true
      this.$axios.post(API_ADDRESS.session.base, {
        title: this.newSessionName,
        category: this.$route.params.id,
        default_session_count: this.newSessionSessionCount
      })
        .then(() => {
          this.newSessionLoading = false
          this.reloadSessions()
        })
        .catch(() => {
          this.newSessionLoading = false
        })
    }
  }
}
</script>
