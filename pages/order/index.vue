<template>
  <div>
    <v-row justify="center">
      <h2 class="mt-5 mb-7">ສັ່ງຊື້ສິນຄ້າ</h2>
    </v-row>
    <v-divider></v-divider>
    <v-stepper v-model="e1" class="elevation-0 grey lighten-5">
      <v-stepper-header>
        <v-btn class="mt-4" text style="font-size: 20px" to="/order/history">
          <v-icon large left>mdi-history</v-icon>
          ປະຫວັດການສັ່ງຊື້ສິນຄ້າ
        </v-btn>

        <v-spacer></v-spacer>
        <template v-for="n in steps">
          <v-stepper-step
            :key="`${n}-step`"
            dense
            :complete="e1 > n"
            :step="n"
            editable
            flat
          >
            <h2 v-if="n == 1">ເລືອກສິນຄ້າ</h2>
            <h2 v-if="n == 2">ຢຶນຢັນສັ່ງຊື້ສິນຄ້າ</h2>
          </v-stepper-step>

          <v-divider v-if="n !== steps" :key="n"></v-divider>
        </template>
        <v-spacer></v-spacer>
        <v-chip class="ma-5" color="#004D40" outlined @click="steps2">
          <v-avatar left>
            <v-icon>mdi-cart</v-icon>
          </v-avatar>
          {{ orderList.length }}
        </v-chip>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content v-for="n in steps" :key="`${n}-content`" :step="n">
          <!-- _________________111_____________________ -->

          <v-card
            v-if="n == 1 || e1 == 1"
            class="grey lighten-5 elevation-2 ma-0"
          >
            <!-- {{ products }} -->
            <div>
              <v-data-table
                :headers="productHeaders"
                :items="products"
                :search="searchA"
                item-key="pro_name"
                sort-by="index"
                class="elevation-2 table"
              >
                <template #top>
                  <v-toolbar flat>
                    <v-toolbar-title>ລາຍການຂໍ້ມູນສິນຄ້າ</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-text-field
                      v-model="searchA"
                      append-icon="mdi-magnify"
                      label="ຄົ້ນຫາ"
                      outlined
                      dense
                      single-line
                      hide-details
                    ></v-text-field>
                    <v-spacer></v-spacer>
                    <v-select
                      v-model="supplier_id"
                      hide-details
                      filled
                      dense
                      :items="getSupplier"
                      item-value="id"
                      item-text="name"
                      label="ຜູ້ສະໜອງ"
                      required
                      prepend-inner-icon="mdi-store-outline"
                      clearable
                      clear-icon="mdi-close-circle-outline"
                      @change="onProvinceSelected"
                    >
                      <template #item="{ item }">
                        <div
                          class="select-item d-flex align-center justify-center"
                        >
                          <v-img
                            :src="item.profile"
                            class="item-image mr-2"
                            width="80px"
                          />
                          <span>{{ item.name }}</span>
                        </div>
                      </template>
                    </v-select>
                  </v-toolbar>
                  <v-divider></v-divider>
                </template>
                <template #item="{ item }">
                  <tr v-ripple="{ class: `white--text` }">
                    <td>{{ item.index }}</td>
                    <td align="center">
                      <v-card flat width="100">
                        <v-img
                          :src="item.profile"
                          height="100"
                          width="100"
                        ></v-img>
                      </v-card>
                    </td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.category }}</td>
                    <td>{{ item.color }}</td>
                    <td>{{ item.size_id }}</td>
                    <td>
                      <v-row>
                        <v-btn
                          class="mx-2"
                           rounded
                          style="font-size: 14px; font-weight: bold; "
                          :color="item.check"
                          @click="AddItem(item)"
                        >
                          <v-icon large :color="item.check? 'white':'black'">{{item.check ? 'mdi-check':'mdi-plus'}}</v-icon>
                        </v-btn>
                      </v-row>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </div>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="mt-5"
                style="font-size: 18px; font-weight: bold; color: white"
                color="green"
                @click="steps2"
              >
                ໄປໜ້າກະຕ່າສິນຄ້າ
                <v-icon large right
                  >mdi-arrow-right-bold-outline</v-icon
                >
              </v-btn>
            </v-card-actions>
          </v-card>

          <!-- _________________222_____________________ -->

          <v-card v-if="n == 2" class="elevation-0 ma-0">
            <v-data-table
              :headers="headers"
              :items="orderList"
              hide-default-footer
              item-key="name"
              sort-by="calories"
              class="elevation-2"
            >
              <template #top>
                <div>
                  <v-toolbar flat>
                    <v-toolbar-title>ລາຍການສັ່ງຊື້ສິນຄ້າ</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                  </v-toolbar>
                </div>
              </template>

              <template #item="{ item }">
                <tr v-ripple="{ class: `white--text` }">
                  <td>{{ item.index }}</td>
                  <td>
                    <v-img
                      :src="item.profile"
                      contain
                      height="100"
                      width="100"
                    ></v-img>
                  </td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.category }}</td>
                  <td>{{ item.color }}</td>
                  <td>{{ item.size_id }}</td>
                  <td>
                    <v-text-field
                      v-model="item.quantity"
                      v-ripple="{ class: `white--text` }"
                      class="mt-5 tcenter"
                      filled
                      dense
                      rounded
                      prepend-inner-icon="mdi-minus"
                      append-icon="mdi-plus"
                      autofocus
                      hint="ຈໍານວນທີ່ຕ້ອງການ"
                      @click:append="Add(pro)"
                      @click:prepend-inner="Minus(item)"
                      @keypress="Inputquantity($event, item)"
                      @keyup="Zeroquantity(item)"
                    >
                      <template slot="append">
                        <v-btn
                          style="margin-top: -7px; margin-right: -20px"
                          color="green"
                          icon
                        >
                          <v-icon large @click="Add(item)">mdi-plus</v-icon>
                        </v-btn>
                      </template>
                      <template slot="prepend-inner">
                        <v-btn
                          style="margin-top: -7px; margin-left: -20px"
                          color="green"
                          icon
                        >
                          <v-icon large @click="Minus(item)">mdi-minus</v-icon>
                        </v-btn>
                      </template>
                    </v-text-field>
                  </td>
                  <td>
                    <v-row>
                      <v-icon color="red" large @click="deleteItem(item.id)"
                        >mdi-delete</v-icon
                      >
                    </v-row>
                  </td>
                </tr>
              </template>

              <template #footer>
                <v-row class="ma-5" align="center" justify="center">
                  <v-spacer></v-spacer>
                  <v-btn
                    style="font-size: 16px; font-weight: bold; color: white"
                    color="red accent-2"
                    class="mt-2 mr-7 mb-5"
                    @click="cancelSelect()"
                  >ຍົກເລິກ
                  </v-btn>

                  <v-btn
                    style="font-size: 16px; font-weight: bold; color: white"
                    color="primary accent-4"
                    class="mt-2 mr-5 mb-5"
                    :loading="loading"
                    @click="saveOrder"
                  >
                   ຢຶນຢັນສັ່ງຊື້ສິນຄ້າ
                  </v-btn>
                </v-row>
              </template>
            </v-data-table>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading:false,
      supplier_id: '',
      searchA: '',
      e1: 1,
      steps: 2,
      dialog: false,
      dialogDelete: false,
      dialogSuplier: false,
      productHeaders: [
        { text: 'ລໍາດັບ', value: 'index', width: '7%' },
        {
          text: 'ຮູບ',
          align: 'center',
          sortable: false,
          value: 'profile',
        },
        { text: 'ສິນຄ້າ', value: 'name' },
        { text: 'ປະເພດ', value: 'category' },
        { text: 'ສີ', value: 'color' },
        { text: 'ຂະໜາດ/ເບີ້', value: 'size' },
        { text: 'ເລຶອກ', value: 'actions', sortable: false },
      ],
      headers: [
        { text: 'ລໍາດັບ', value: 'idex' },
        {
          text: 'ຮູບ',
          align: 'start',
          sortable: false,
          value: 'profile',
        },
        { text: 'ສິນຄ້າ', value: 'name' },
        { text: 'ປະເພດ', value: 'category' },
        { text: 'ສີ', value: 'color' },
        { text: 'ຂະໜາດ', value: 'size_id' },
        { text: 'ຈໍານວນ', value: 'quantity' },
        { text: 'ລຶບ', value: 'actions', sortable: false },
      ],
      pro_id: '',
      orderList: [],
      orderby: {
        order_id: null,
        emp_id: '',
        sup_id: '',
        pro_id: '',
        quantity: '',
        orderdetail: [],
      },
    }
  },
  computed: {
    products() {
      return this.$store.state.product.StateSelectAll.map((item, index) => {
        return {
          index: index + 1,
          ...item,
        }
      })
    },
    getSupplier() {
      return this.$store.state.supplier.StateSelectAll
    },
    TotalQuantity() {
      return this.orderList.reduce((num, item) => num + item.quantity, 0)
    },
  },
  mounted() {
    this.$store.dispatch('product/selectAll')
    this.$store.dispatch('supplier/selectAll')
  },
  methods: {
    onProvinceSelected() {
      if (this.supplier_id === null) {
        this.$store.dispatch('product/selectAll')
      } else {
        this.$store.dispatch('product/getBySupplier', this.supplier_id)
      }
    },
    AddItem(item) {
      item.icon = 'mdi-check'
      item.check = 'green'
      if (this.orderList.length > 0) {
        for (const key in this.orderList) {
          const el = this.orderList[key]
          if (el.pro_id === item.id) {
            this.orderList.splice(key, 1)
          }
        }
      }
      const checkList = this.orderList.find((i) => i.product_id === item.id)
      if(checkList === undefined){
        const mater = {
          index: item.index,
          product_id: item.id,
          name: item.name,
          category: item.category,
          color: item.color,
          size_id: item.size_size,
          quantity: item.quantity?item.quantity:1,
          profile: item.profile,
          checkColor: item.check
        }
        this.orderList.push(mater)
      }
    },
    Add(item) {
      if (typeof item.quantity === 'string' || item.quantity === '') {
        item.quantity = 1
        return
      }
      item.quantity = parseInt(item.quantity) + 1
    },
    Minus(item) {
      if (parseInt(item.quantity, 10) < 2) return
      item.quantity = parseInt(item.quantity, 10) - 1
    },
    Zeroquantity(item) {
      if (
        parseInt(item.quantity) < 1 ||
        (typeof item.quantity === 'string' && item.quantity.length < 1) ||
        typeof item.quantity === 'undefined'
      ) {
        item.quantity = 1
      }
    },
    Inputquantity(evt, item) {
      evt = evt || window.event;
      const charCode = evt.which ? evt.which : evt.keyCode
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        alert("Enter Only Number ? (0-9)");
        evt.preventDefault()
      } else {
        if (
          (typeof item.quantity === 'string' && item.quantity === '') ||
          typeof item.quantity === 'undefined'
        ) {
          item.quantity = 1
        } else {
          item.quantity = parseInt(item.quantity)
        }
        return true
      }
    },
    deleteItem(id) {
      this.orderList.splice(this.orderList.map((i) => i.id).indexOf(id), 1)
      
    },

    close() {
      this.dialogDelete = false
    },
    steps2() {
      this.e1 = 2
    },
    clear() {
      this.orderby = {
        emp_id: '',
        sup_id: '',
        orderdetail: [],
      }
      this.orderList = []
      this.suplierItem = {
        sup_id: '',
        name: '',
        tel: '',
        email: '',
        address: '',
      }
      for (const key in this.material) {
        const element = this.material[key]
        element.icon = 'mdi-plus'
        element.check = '#0288D1'
      }
      this.e1 = 1
    },
    async saveOrder() {
      const currentDate = new Date()
      const formattedDate = currentDate.toISOString() // Convert date to ISO 8601 format
      this.loading = true
      const data = {
        employee_id: this.$cookies.get('id'),
        order_date: formattedDate,
        status: "pending",
      }
      await this.$store.dispatch('order/Insert', data)
      await this.orderList.map((item) => {
        const productId = item.product_id
        const orderQuantify = item.quantity
        return this.$axios.post('/order_detail', {
          product_id: productId,
          order_quantity: orderQuantify,
          order_id: this.$store.state.order.order_id ,
        })
      })
      this.loading = false
      this.$router.push('/order/bill/' + this.$store.state.order.order_id)
      this.clear()
    },
    cancelSelect(){
    this.$store.dispatch('product/selectAll')
    this.orderList = []
    }
  },
}
</script>
