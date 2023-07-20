<template>
  <v-card class="elevation-0">
    <!-- ____data-table___ -->
    <v-data-table
      :headers="headers"
      :items="show"
      :search="search"
      item-key="name"
      sort-by="calories"
      class="elevation-2"
    >
      <!-- _____top_____ -->
      <template #top>
        <v-row justify="center">
          <h2 class="mt-5 mb-7">ນໍາເຂົ້າສິນຄ້າ</h2>
        </v-row>
        <v-divider></v-divider>
        <div>
          <v-toolbar flat>
            <router-link to="/import/history">
              <v-btn class="mt-4" text style="font-size: 20px">
                <v-icon large left>mdi-history</v-icon>
                ປະຫວັດການນໍາເຂົ້າສິນຄ້າ
              </v-btn>
            </router-link>

            <v-divider class="mx-4" inset vertical></v-divider>
            <v-toolbar-title>ລາຍການນໍາເຂົ້າສິນຄ້າ</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-autocomplete
              v-model="order_id"
              auto-select-first
              chips
              clearable
              outlined
              :items="getByStatus"
              item-value="id"
              item-text="id"
              dense
              deletable-chips
              prepend-icon="mdi-file-find"
              label="ປ້ອນເລກໃບສັ່ງຊື້ສິນຄ້າ"
              single-line
              hide-details
              @change="Selected"
            >
              <template #item="{ item }">
                <div class="select-item d-flex align-center justify-center">
                  <span>{{ item.id }}</span>
                  <span> || </span>
                  <span class="red--text">{{
                    formatDateLo(item.order_date)
                  }}</span>
                </div>
              </template>
            </v-autocomplete>
          </v-toolbar>
          <v-divider class=""></v-divider>
          <v-divider class=""></v-divider>
        </div>
      </template>

      <!-- ____Body______ -->
      <template #body="{ headers, items }">
        <tbody>
          <tr
            v-for="(item, idx) in items"
            :key="idx"
            v-ripple="{ class: `white--text` }"
          >
            <td v-for="(header, key) in headers" :key="key">
              <div v-if="headers[key] === headers[0]">
                {{ idx + 1 }}
              </div>
              <v-card
                v-if="headers[key] === headers[1]"
                width="100"
                height="100"
                flat
              >
                <v-img :src="item[header.value]"></v-img>
              </v-card>
              <v-edit-dialog
                v-else
                v-ripple="{ class: `error--text` }"
                :return-value.sync="item[header.value]"
                large
              >
                {{ item[header.value] }}
                <template #input>
                  <v-text-field
                    v-if="
                      headers[key] === headers[6] || headers[key] === headers[7]
                    "
                    v-model="item[header.value]"
                    label="Edit"
                    single-line
                    @keypress="CheckNumber($event)"
                  >
                  </v-text-field>
                  <v-text-field
                    v-else
                    v-model="item[header.value]"
                    label="Edit"
                    single-line
                  ></v-text-field>
                </template>
              </v-edit-dialog>
            </td>
            <td>
              <v-icon color="red" @click="deconsteItem(idx)">
                mdi-close
              </v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>

    <v-row class="mt-4 mr-3">
      <v-spacer></v-spacer>
      <v-btn
        style="font-size: 18px; font-weight: bold; color: white"
        color="red accent-3"
        rounded
        class="mt-2 mr-7 mb-5"
        @click=";(order_id = null), (show = [])"
      >
        <v-icon left>mdi-close-circle</v-icon>ຍົກເລິກ
      </v-btn>

      <v-btn
        :loading="loading"
        style="font-size: 18px; font-weight: bold; color: white"
        color="primary"
        rounded
        class="mt-2 mr-5 mb-5"
        :disabled="show == ''"
        @click="saveImport"
      >
        <v-icon left>mdi-check-circle</v-icon>ຢຶນຢັນນໍາເຂົ້າສິນຄ້າ
      </v-btn>
    </v-row>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      dialog: false,
      filter: {},
      show: [],
      sortDesc: false,
      search: '',
      headers: [
        { text: 'ລໍາດັບ', value: 'idx', sortable: false },
        {
          text: 'ຮູບ',
          align: 'start',
          value: 'profile',
        },
        { text: 'ຊື່ສິນຄ້າ', value: 'productName' },
        { text: 'ປະເພດສິນຄ້າ', value: 'categoryName' },
        { text: 'ສີ', value: 'color' },
        { text: 'ຂະໜາດ', value: 'size_id' },
        { text: 'ຈໍານວນ', value: 'order_quantity' },
        // { text: 'ຫົວໜ່ວຍ', value: 'unit' },
        { text: 'ລາຄາຕົ້ນທືນ', value: 'cost_price' },
        { text: 'ລາຄາຂາຍ', value: 'sale_price' },
      ],

      order_id: null,
      importby: {
        imp_id: '',
        emp_id: '',
        pro_id: '',
        qty: '',
        price: '',
      },
      prolist: {
        pro_id: null,
        qty: null,
      },
      import_data: {
        import_total: null,
        receive_date: null,
        employee_id: null,
      },
      import_detail_data: {
        product_id: null,
        import_id: null,
        Imp_price: null,
        Imp_quantity: null,
      },
    }
  },
  computed: {
    getByStatus() {
      return this.$store.state.order.ByStatus
    },
    TotalQuantity() {
      return this.show.reduce((num, item) => num + item.cost_price, 0)
    },
  },
  mounted() {
    this.$store.dispatch('order/selectOrderByStatus')
    this.order_id = this.$store.state.order_detail.fromId
    this.Selected()
  },
  methods: {
    // Selected order_detail
    async Selected() {
      if (this.order_id === '' || this.order_id === null) {
        this.show = []
      } else {
        const res = await this.$axios.$get(
          `/order_detail/order/${this.order_id}`
        )
        this.show = res.result
      }
    },
    // CheckNumber
    CheckNumber(evt) {
      evt = evt || window.event
      const charCode = evt.which ? evt.which : evt.keyCode
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        alert('Enter Only Number ? (0-9)')
        evt.preventDefault()
      } else {
        return true
      }
    },
    deconsteItem(id) {
      this.show.splice(this.show.map((i) => i.id).indexOf(id), 1)
    },
    async saveImport() {
      const index = this.show.findIndex(
        (item) => item.order_quantity === null || item.order_quantity === ''
      )

      if (index !== -1) {
        return alert(
          `ສິນຄ້າລຳດັບ ${
            index + 1
          } ບໍ່ມີຈຳນວນ. ກະລຸນາປ້ອມຈຳນວນກ່ອນຢືນຢັນນຳເຂົ້າ!!!.`
        )
      }
      const price = this.show.findIndex(
        (item) => item.cost_price === null || item.cost_price === ''
      )

      if (price !== -1) {
        return alert(
          `ສິນຄ້າລຳດັບ ${
            price + 1
          } ບໍ່ມີຈຳນວນເງິນ. ກະລຸນາປ້ອມຈຳນວນເງິນກ່ອນຢືນຢັນນຳເຂົ້າ!!!.`
        )
      }

      this.loading = true
      const currentDate = new Date()
      const formattedDate = currentDate.toISOString() // Convert date to ISO 8601 format
      this.import_data.receive_date = formattedDate
      this.import_data.employee_id = this.$cookies.get('id')
      this.import_data.import_total = this.TotalQuantity
      // insert data to import table
      const res = await this.$axios.post('/import', this.import_data)
      // update status order to complete
      await this.$axios.put(`/order/${this.order_id}/status`, {
        status: 'completed',
      })
      this.$store.dispatch('order/selectOrderByStatus')
      // subtract add quantity to product
      await this.show.map((item) => {
        const qty = parseInt(item.order_quantity)
        return this.$axios.put(
          `/product/${item.product_id}/subtract-import-quantity`,
          { quantity: qty }
        )
      })
      // insert to import_detail
      await this.show.map((item) => {
        this.import_detail_data.import_id = res.data.result.id
        this.import_detail_data.product_id = item.product_id
        this.import_detail_data.Imp_price = item.cost_price
        this.import_detail_data.Imp_quantity = item.order_quantity
        return this.$axios.post('/import_detail', this.import_detail_data)
      })
      // _________update sell_price and cost_price____________
      await this.show.map((item) => {
        return this.$axios.put(`product/${item.product_id}`, {
          sale_price: item.sale_price,
          cost_price: item.cost_price,
        })
      })
      this.$toast.success('ນຳເຂົ້າສິນຄ້າສຳເລັດ')
      this.show = []
      this.loading = false
    },
  },
}
</script>
