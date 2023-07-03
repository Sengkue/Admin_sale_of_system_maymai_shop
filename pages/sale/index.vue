<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        class="white--text ma-0 pa-0"
        style="background: linear-gradient(to right, #6c1e1e, #fa1212)"
      >
        <v-container class="d-flex justify-space-between">
          <div>
            <div>ຂາຍໜ້າຮ້ານ</div>
            <div>Sales monitoring dashboard</div>
          </div>
          <div class="d-flex">
            <div>
              <div>customer Ratings</div>
              <div>
                <div class="d-flex">
                  <v-icon color="orange">mdi-star</v-icon>
                  <v-icon color="orange">mdi-star</v-icon>
                  <v-icon color="orange">mdi-star</v-icon>
                  <v-icon>mdi-star</v-icon>
                  <v-icon>mdi-star</v-icon>
                  <div>(14,000)</div>
                </div>
              </div>
            </div>
            <div class="ml-5">
              <div>Online Sales</div>
              <div class="font-weight-black">5,000</div>
            </div>
            <div class="ml-5">
              <div>Offine Sales</div>
              <div class="font-weight-black">12,000</div>
            </div>
          </div>
        </v-container>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="7">
            <v-row>
              <v-col cols="12">
                <v-row>
                  <v-col cols="8">
                    <v-text-field
                      v-model="search"
                      label="Search"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      outlined
                      dense
                      prepend-inner-icon="mdi-barcode-scan"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                v-for="(item, index) in filteredRow"
                :key="index"
                cols="3"
                class="ma-0 py-1 px-1"
              >
                <v-card
                  v-ripple
                  max-width="180px"
                  elevation="10"
                  class="cursor"
                  @click="AddToOrder(item.id)"
                >
                  <div class="">
                    <v-img
                      :src="item.profile"
                      contain
                      style="
                        width: 100%;
                        height: 140px;
                        object-fit: cover;
                        object-position: center;
                      "
                    >
                      <div v-for="li in ListOrder" :key="li.id">
                        <v-chip
                          v-if="item.id === li.id"
                          small
                          color="warning"
                          class="box-item rounded-bl-xl"
                          label
                          >{{ li.order_amount }}</v-chip
                        >
                      </div>

                      <v-chip
                        v-if="item.quantity === 0"
                        small
                        color="error"
                        class="rounded-br-xl ma-n2"
                        label
                        >{{ 0 }}</v-chip
                      >
                    </v-img>
                    <v-card-text>
                      <div class="font-weight-black">{{ item.name }}</div>
                      <div class="info--text">
                        {{ formatPrice(item.sale_price) }}kip
                      </div>
                    </v-card-text>
                  </div>
                </v-card>
              </v-col>
              <tr>
                {{
                  ListOrder
                }}
              </tr>
            </v-row>
            <!-- card image 1 -->
          </v-col>
          <v-col cols="5">
            <v-card>
              <v-row class="px-2">
                <v-col cols="12" class="d-flex justify-space-between">
                  <div>ລວມຍອດເງິນ</div>
                  <div>{{ formatPrice(TotalAmount) }} ກີບ</div>
                </v-col>
                <v-col cols="12" class="my-n5">
                  <v-btn
                    color="primary"
                    width="100%"
                    :disabled="check_pay"
                    @click="btPay()"
                    ><v-icon>mdi-currency-usd</v-icon>ຊຳລະເງິນ</v-btn
                  >
                </v-col>

                <v-col cols="12">
                  <table>
                    <tr>
                      <th>item name</th>
                      <th>price</th>
                      <th class="px-5">Quantity</th>
                      <th>subtotal</th>
                      <th class="px-n5">X</th>
                    </tr>
                    <tr v-for="(list, index) in ListOrder" :key="index">
                      <td>{{ list.name }}</td>
                      <td>{{ formatPrice(list.sale_price) }}ກີບ</td>
                      <td>
                        <div class="d-flex align-center justify-center">
                          <v-btn
                            icon
                            class="warning white--text rounded-0"
                            style="height: 40px; width: 20px"
                            @click="minus(list.id)"
                          >
                            <v-icon>mdi-minus</v-icon>
                          </v-btn>
                          <v-text-field
                            v-model="list.order_amount"
                            dense
                            hide-details
                            outlined
                            filled
                            type="text"
                            class="rounded-0 text-center no-spin-buttons"
                            style="width: 20px"
                            inputmode="numeric"
                            @input="enterKey(list)"
                          />

                          <v-btn
                            icon
                            class="primary white--text rounded-0"
                            style="height: 40px; width: 20px"
                            @click="AddOne(list.id)"
                          >
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </div>
                      </td>

                      <td>
                        {{
                          formatPrice(list.sale_price * list.order_amount)
                        }}ກີບ
                      </td>
                      <td class="text-center">
                        <v-btn icon @click="DelOneList(list.id)">
                          <v-icon color="error" large>mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </table>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <v-card>
                <div class="modal-dialog">
                  <div class="pa-10">
                    <div class="d-flex justify-space-between">
                      <h4 id="myModalLabel" class="modal-title">ຊຳລະສິນຄ້າ</h4>
                      <v-btn text @click="dialog = false"
                        ><v-icon color="red">mdi-close</v-icon></v-btn
                      >
                    </div>
                    <div class="modal-body">
                      <h4
                        class="card-title text-info d-flex justify-space-between"
                      >
                        <span> <strong> ລວມຍອດເງິນ: </strong></span>
                        <span
                          ><strong
                            >{{ formatPrice(TotalAmount) }} ກີບ</strong
                          ></span
                        >
                      </h4>
                      <h4
                        class="card-title text-info d-flex justify-space-between"
                      >
                        <span> <strong> ຮັບເງິນນຳລູກຄ້າ: </strong></span>
                        <span
                          ><strong
                            >{{ formatPrice(CashAmount) }} ກີບ</strong
                          ></span
                        >
                      </h4>
                      <h4
                        class="card-title text-danger d-flex justify-space-between"
                      >
                        <span> <strong> ເງິນທອນ: </strong></span>
                        <span
                          ><strong
                            >{{ formatPrice(calculatedCashBack) }} ກີບ</strong
                          ></span
                        >
                      </h4>
                      <div class="form-group">
                        <v-text-field
                          v-model="CashAmount"
                          type="number"
                          outlined
                          class="form-control"
                          :style="{ textAlign: 'right' }"
                        />
                      </div>
                      <div class="justify-space-center d-flex">
                        <v-row style="width: 250px">
                          <v-col
                            cols="4"
                            class="blue white--text text-center my-n1 mx-n1"
                          >
                            <v-btn @click="AddNum(1)">1</v-btn>
                          </v-col>
                          <v-col
                            cols="4"
                            class="blue white--text text-center my-n1 mx-n1"
                          >
                            <v-btn @click="AddNum(2)">2</v-btn>
                          </v-col>
                          <v-col
                            cols="4"
                            class="blue white--text text-center my-n1 mx-n1"
                          >
                            <v-btn @click="AddNum(3)">3</v-btn>
                          </v-col>
                          <v-col
                            cols="4"
                            class="blue white--text text-center my-n1 mx-n1"
                          >
                            <v-btn @click="AddNum(4)">4</v-btn>
                          </v-col>
                          <v-col
                            cols="4"
                            class="blue white--text text-center my-n1 mx-n1"
                          >
                            <v-btn @click="AddNum(5)">5</v-btn>
                          </v-col>
                          <v-col
                            cols="4"
                            class="blue white--text text-center my-n1 mx-n1"
                          >
                            <v-btn @click="AddNum(6)">6</v-btn>
                          </v-col>
                          <v-col
                            cols="4"
                            class="blue white--text text-center my-n1 mx-n1"
                          >
                            <v-btn @click="AddNum(7)">7</v-btn>
                          </v-col>
                          <v-col
                            cols="4"
                            class="blue white--text text-center my-n1 mx-n1"
                          >
                            <v-btn @click="AddNum(8)">8</v-btn>
                          </v-col>
                          <v-col
                            cols="4"
                            class="blue white--text text-center my-n1 mx-n1"
                          >
                            <v-btn @click="AddNum(9)">9</v-btn>
                          </v-col>
                          <v-col
                            cols="4"
                            class="blue white--text text-center my-n1 mx-n1"
                          >
                            <v-btn @click="AddNum('00')">00</v-btn>
                          </v-col>
                          <v-col
                            cols="4"
                            class="blue white--text text-center my-n1 mx-n1"
                          >
                            <v-btn @click="AddNum('0')">0</v-btn>
                          </v-col>
                          <v-col
                            cols="4"
                            class="blue white--text text-center my-n1 mx-n1"
                          >
                            <v-btn @click="AddNum('-')"
                              ><v-icon>mdi-arrow-left</v-icon></v-btn
                            >
                          </v-col>
                        </v-row>
                      </div>
                      <div
                        class="row justify-content-center d-flex mt-2 text-center"
                      >
                        <v-btn
                          type="button"
                          class="mt-5 green white--text"
                          width="100%"
                          :loading="loading"
                          :disabled="CheckCPay"
                          @click="ConfirmPay()"
                        >
                          <v-icon>mdi-money</v-icon> ຍືນຍັນຊຳລ່ະເງິນ
                        </v-btn>
                      </div>
                    </div>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn type="button" @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </div>
                  <!-- /.modal-content -->
                </div>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'AdminSaleOfSystemMaymaiShopIndex',

  data() {
    return {
      loading: false,
      CashBack: '',
      CashAmount: '',
      dialog: false,
      search: '',
      quantity: 0,
      price: 25000,
      subtotal: null,
      ListOrder: [],
      DataProduct: [],
      sale_id: '',
    }
  },
  computed: {
    CheckCPay() {
      if (parseInt(this.CashAmount) - parseInt(this.TotalAmount) >= 0) {
        return false
      } else {
        return true
      }
    },
    calculatedCashBack() {
      return parseInt(this.CashAmount) - parseInt(this.TotalAmount) || 0
    },
    TotalAmount() {
      return this.ListOrder.reduce(
        (num, item) => num + item.sale_price * item.order_amount,
        0
      )
    },
    TotalQuantity() {
      return this.ListOrder.reduce((num, item) => num + item.order_amount, 0)
    },
    check_pay() {
      if (this.TotalAmount) {
        return false
      } else {
        return true
      }
    },

    getRow() {
      return this.$store.state.product.StateSelectAll.map((item, index) => {
        return {
          index: index + 1,
          ...item,
        }
      })
    },
    filteredRow() {
      const searchTerm = this.search.toLowerCase().trim()
      return this.$store.state.product.StateSelectAll.map((item, index) => {
        return {
          index: index + 1,
          ...item,
        }
      }).filter((item) => {
        // Modify the condition as per your filtering requirements
        return item.name.toLowerCase().includes(searchTerm)
      })
    },
  },
  mounted() {
    this.$store.dispatch('product/selectAll')
  },

  methods: {
    async ConfirmPay() {
      const currentDate = new Date()
      const formattedDate = currentDate.toISOString() // Convert date to ISO 8601 format
      this.loading = true
      const data = {
        customer_id: '',
        promotion_id: '',
        employee_id: this.$cookies.get('id'),
        sale_date: formattedDate,
        sale_total: this.TotalAmount,
        sale_quantity: this.TotalQuantity,
        sale_type: 'pos',
        sale_status: 'Completed',
      }

      await this.$axios
        .post('/sale', data)
        .then((response) => {
          this.sale_id = response.data.result.id

          // send data to sale_detail---------------------------
          this.ListOrder.map((item) => {
            const productId = item.id
            const Qt = item.order_amount
            const price = item.sale_price
            return this.$axios.post('/saleDetail', {
              sale_id: this.sale_id,
              product_id: productId,
              sale_price: price,
              quantity: Qt,
            })
          })
          // send subtract quantity----------------------------
          this.ListOrder.map((item) => {
            const id = item.id
            const Qt = item.order_amount
            return this.$axios.put(`/product/${id}/subtract-quantity`, {
              quantity: Qt,
            })
          })
          this.loading = false
          this.dialog = false
          this.$router.push('/sale/' + this.sale_id)
          this.$toast.success('sale completed')
          this.$store.dispatch('product/selectAll')
          this.ListOrder = []
          this.CashAmount = 0
        })
        .catch((error) => {
          this.$toast.error(error)
        })
    },

    AddNum(num) {
      if (num === '-') {
        this.CashAmount = this.CashAmount.slice(0, -1)
      } else {
        this.CashAmount = this.CashAmount + num
      }
    },
    btPay() {
      this.dialog = true
    },
    AddToOrder(id) {
      const item = this.getRow.find((i) => i.id === id)
      const listOrder = this.ListOrder.find((i) => i.id === id)

      if (listOrder) {
        const oldOrderAmount = listOrder.order_amount
        if (item.quantity - oldOrderAmount > 0) {
          const existingOrder = this.ListOrder.find((i) => i.id === id)
          if (existingOrder) {
            existingOrder.order_amount++
          } else {
            this.ListOrder.push({
              id: item.id,
              name: item.name,
              sale_price: item.sale_price,
              order_amount: 1,
            })
          }
        } else {
          alert('ສີນຄ້າໝົດ')
        }
      } else {
        const chnum = this.getRow.find((i) => i.id === id)
        if (chnum) {
          if (chnum.quantity > 0) {
            const existingOrder = this.ListOrder.find((i) => i.id === id)
            if (existingOrder) {
              existingOrder.order_amount++
            } else {
              this.ListOrder.push({
                id: item.id,
                name: item.name,
                sale_price: item.sale_price,
                order_amount: 1,
              })
            }
          } else {
            alert('ສີນຄ້າໝົດ')
          }
        }
      }
    },

    enterKey(data) {
      const item = this.getRow.find((i) => i.id === data.id)
      const inputNumber = parseInt(data.order_amount) // Convert the input to an integer

      if (isNaN(inputNumber)) {
        data.order_amount = null // Clear the input if it's not a valid number
        return
      }

      // Perform any other logic related to the number input here
      if (inputNumber > item.quantity) {
        alert(`ສິນຄ້າໝົດ!!! ຈຳນວນໃນປະຈຸບັນແມ່ນ ${item.quantity}`)
        data.order_amount = null
      }
    },
    AddOne(id) {
      const item = this.getRow.find((i) => i.id === id)
      const listOrder = this.ListOrder.find((i) => i.id === id)

      if (listOrder) {
        const oldOrderAmount = listOrder.order_amount
        if (item.quantity - oldOrderAmount > 0) {
          listOrder.order_amount = oldOrderAmount + 1
        } else {
          // alert('ສີນຄ້າໝົດ')
          this.$toast.error('ສີນຄ້າໝົດ!')
        }
      }
    },
    minus(id) {
      if (this.ListOrder.find((i) => i.id === id)) {
        const oldOrderAmount = this.ListOrder.find(
          (i) => i.id === id
        ).order_amount

        if (oldOrderAmount - 1 > 0) {
          this.ListOrder.find((i) => i.id === id).order_amount =
            oldOrderAmount - 1
        } else {
          const indexToRemove = this.ListOrder.map((i) => i.id).indexOf(id)
          this.ListOrder.splice(indexToRemove, 1)
        }
      }
    },
    DelOneList(id) {
      this.ListOrder.splice(this.ListOrder.map((i) => i.id).indexOf(id), 1)
    },
  },
}
</script>

<style lang="scss" scoped>
/* Custom CSS to hide spin buttons for input with type "text" and inputmode "numeric" */
.no-spin-buttons::-webkit-inner-spin-button,
.no-spin-buttons::-webkit-outer-spin-button,
.no-spin-buttons::-moz-inner-spin-button,
.no-spin-buttons::-moz-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
// box text number
.box-item {
  position: absolute;
  right: 0;
  // font-weight: bold;
  padding: 5px;
  // border-radius: 0px 0px 0px 10px;
}
table {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd; /* Add border to the table */
}

th,
td {
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd; /* Add border to the cells */
  border-right: 1px solid #ddd; /* Add border to the right side of cells */
}

th {
  background-color: #f2f2f2;
  text-align: center; /* Align header text in the center */
}

th:last-child,
td:last-child {
  border-right: none; /* Remove border from the last column */
}

.d-flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.text-center {
  text-align: center;
}

//************************** */
.modal-dialog {
  margin: 0 auto;
  max-width: 600px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
}

.modal-body {
  padding: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.btn-primary {
  background-color: blue;
  color: white;
}

.btn-danger {
  background-color: red;
  color: white;
}

.btn-success {
  background-color: green;
  color: white;
}

.btn-info {
  background-color: blue;
  color: white;
}

.text-info {
  color: blue;
}

.text-danger {
  color: red;
}

.text-success {
  color: green;
}

.btn-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.btn-close::after {
  content: '×';
  font-size: 1.5rem;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
}

.col-4 {
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  padding-right: 10px;
  padding-left: 10px;
}

.mt-2 {
  margin-top: 0.5rem;
}

.text-center {
  text-align: center;
}

.justify-content-center {
  justify-content: center;
}

.text-white {
  color: white;
}

.btn-lg {
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
}

.btn-primary:hover,
.btn-primary:focus {
  background-color: darkblue;
}

.btn-danger:hover,
.btn-danger:focus {
  background-color: darkred;
}

.btn-success:hover,
.btn-success:focus {
  background-color: darkgreen;
}

.btn-info:hover,
.btn-info:focus {
  background-color: darkblue;
}

.btn-primary:disabled,
.btn-danger:disabled,
.btn-success:disabled,
.btn-info:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-close:hover,
.btn-close:focus {
  color: red;
}

.btn-close:hover::after,
.btn-close:focus::after {
  color: red;
}

.btn-close:focus {
  outline: none;
}

.text-info {
  color: blue;
}

.text-danger {
  color: red;
}

.text-success {
  color: green;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.w-250 {
  width: 250px;
}
</style>
