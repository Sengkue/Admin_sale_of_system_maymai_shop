<template>
  <div>
    <div>
      <v-card class="px-5">
        <v-row>
          <v-col v-if="isLoading" cols="12" sm="12">
            <div class="d-flex justify-center">
              <v-progress-circular
                :size="40"
                :width="5"
                color="teal"
                indeterminate
              ></v-progress-circular>
            </div>
          </v-col>
          <v-col cols="12" sm="12" class="mt-2">
            <v-row class="d-flex align-center">
              <v-col cols="4">
                <v-text-field
                  v-model="search"
                  prepend-inner-icon="mdi-magnify"
                  label="ຄົ້ນຫາ"
                  outlined
                  hide-details
                  clearable
                  dense
                  small
                  class="box2 my-n4"
                >
                </v-text-field
              ></v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="search"
                  outlined
                  hide-details
                  dense
                  class="box2 my-n4"
                  prepend-inner-icon="mdi-barcode-scan"
                ></v-text-field
              ></v-col>
              <v-col cols="4" class="d-flex align-center justify-space-between">
                <h2 v-if="getRow.length">
                  ສິນຄ້າໃກ້ໝົດສະຕ໊ອກມີ >>( {{ getRow.length }} )
                </h2>
                <h2 v-else>ສິນຄ້າໃກ້ໝົດສະຕ໊ອກມີ >>( 0 )</h2>
                <v-menu offset-y>
                  <template #activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                      Exports
                    </v-btn>
                  </template>
                  <v-list class="py-0">
                    <v-btn block text color="success" @click="exportToExcel"
                      ><v-icon left>mdi-microsoft-excel</v-icon> excel</v-btn
                    >
                    <v-btn block text color="error"
                      ><v-icon left>mdi-file-pdf-box</v-icon> pdf</v-btn
                    >
                    <v-btn block text color="primary"
                      ><v-icon>mdi-printer</v-icon> print</v-btn
                    >
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="12">
            <v-card>
              <v-data-table
                :headers="headers"
                :items="getRow"
                :search="search"
                :items-per-page="10"
                class="elevation-1"
                :loading="loading"
              >
                <template #[`item.profile`]="{ item }">
                  <div>
                    <v-img :src="`${item.profile}`" width="60"></v-img>
                  </div>
                </template>
                <!-- <template #[`item.createdAt`]="{ value }">
                  {{ value | DateToText }}
                </template>
                <template #[`item.updatedAt`]="{ value }">
                  {{ value | DateToText }}
                </template> -->
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'
export default {
  data() {
    return {
      isLoading: false,
      loading: false,
      viewLoading: false,
      search: '',
      showDialog: '',
      headers: [
        { text: 'ລຳດັບ', value: 'index' },
        { text: 'ຮູບ', value: 'profile' },
        { text: 'ລະຫັດສິນຄ້າ', value: 'Barcode' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ປະເພດ', value: 'category' },
        { text: 'ຈຳນວນ', value: 'quantity' },
        { text: 'ລາຄາຊື້', value: 'cost_price' },
        { text: 'ລາຄາຂາຍ', value: 'sale_price' },
        // { text: 'Create', value: 'createdAt' },
        // { text: 'updatedAt', value: 'updatedAt' },
      ],
      getRow: [],
    }
  },
  computed: {
    //   getRow() {
    //     return this.$store.state.product.StateSelectAll.map((item, index) => {
    //       return {
    //         index: index + 1,
    //         ...item,
    //       }
    //     })
    //   },
  },
  async mounted() {
    try {
      this.loading = true
      await this.$axios.get('/product/almost-out-of-stock').then((res) => {
        this.getRow = res.data.result.map((item, index) => {
          return {
            index: index + 1,
            ...item,
          }
        })
      })
      this.loading = false
    } catch (error) {
      this.$toast.success('error!')
    }
  },
  methods: {
    exportToExcel() {
      const data =  this.getRow

      const modifiedData = data.map((item, index) => {
        return {
          index: index + 1,
          ຊື່: item.name,
          ປະເພດ: item.category,
          ເບີ: item.size_id,
          ສີ: item.color,
          ຈຳນວນ: item.quantity,
          ລາຄາຂາຍ: item.sale_price,
          ລາຄາຊື້: item.cost_price,
          ລະຫັດສິນຄ້າ: item.Barcode,
          ຜູ້ສະໜອງ: item.supplier_name,
          ຄຳອະທີບາຍ: item.description,
          ວັນທີເປີດສິນຄ້າ: `${this.formatDateBill(item.createdAt)}`,
        }
      })

      const ws = XLSX.utils.json_to_sheet(modifiedData)

      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

      const date = new Date().toISOString().slice(0, 10)
      const filename = `data_${date}.xlsx`
      XLSX.writeFile(wb, filename)
    },
  },
}
</script>

<style lang="scss" scoped>
.my-swal-container {
  padding: 25px;
  margin: 25px;
}
</style>
