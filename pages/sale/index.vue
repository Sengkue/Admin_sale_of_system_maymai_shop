<template>
  <div>
    <v-row>
      <!-- <v-col
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
      </v-col> -->
      <v-col cols="12" class="mt-5">
        <v-row>
          <v-col cols="7">
            <v-row>
              <v-col cols="12">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="search"
                      label="Search"
                      outlined
                      hide-details
                      dense
                      prepend-inner-icon="mdi-barcode-scan"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      v-model="category_id"
                      :items="category_data"
                      outlined
                      dense
                      clearable
                      item-text="category"
                      item-value="id"
                      label="ເລືອກປະເພດສິນຄ້າ"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="scroll-container">
                <v-row>
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
                      @click="showDetail(item)"
                    >
                      <!-- @click="AddToOrder(item.id)" -->
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
                            v-if="item.quantity === 0 || item.quantity === null"
                            small
                            color="error"
                            class="rounded-br-xl ma-n2"
                            label
                          >
                            ໝົດ!
                          </v-chip>
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
                </v-row>
                {{ ListOrder }}
              </v-col>
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
                      <th>ສິນຄ້າ</th>
                      <th>ລາຄາ</th>
                      <th class="px-8">ຈຳນວນ</th>
                      <th>ລວມ</th>
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
                    <!-- <tr>
                      <td>{{ getPromotion }}</td>
                    </tr> -->
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
                        v-if="promotionSum && promotionSum > 0"
                        class="card-title d-flex justify-space-between"
                      >
                        <span class="text-info">
                          <strong> ຮັບໂປໂມຊັນຍັງເຫຼືອພຽງ: </strong></span
                        >
                        <span class="green--text"
                          ><strong
                            >{{
                              formatPrice(TotalAmount - promotionSum)
                            }}
                            ກີບ</strong
                          ></span
                        >
                      </h4>
                      <h4
                        class="card-title text-info d-flex justify-space-between"
                      >
                        <span> <strong> ຮັບເງິນນຳລູກຄ້າ: </strong></span>
                        <span
                          ><strong>
                            {{ formatPrice(CashAmount) }} ກີບ</strong
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
                            class="blue white--text text-center my-n1"
                          >
                            <v-btn block @click="AddNum(1)">1</v-btn>
                          </v-col>
                          <v-col
                            cols="4"
                            class="blue white--text text-center my-n1"
                          >
                            <v-btn block @click="AddNum(2)">2</v-btn>
                          </v-col>
                          <v-col
                            cols="4"
                            class="blue white--text text-center my-n1"
                          >
                            <v-btn block @click="AddNum(3)">3</v-btn>
                          </v-col>
                          <v-col
                            cols="4"
                            class="blue white--text text-center my-n1"
                          >
                            <v-btn block @click="AddNum(4)">4</v-btn>
                          </v-col>
                          <v-col
                            cols="4"
                            class="blue white--text text-center my-n1"
                          >
                            <v-btn block @click="AddNum(5)">5</v-btn>
                          </v-col>
                          <v-col
                            cols="4"
                            class="blue white--text text-center my-n1"
                          >
                            <v-btn block @click="AddNum(6)">6</v-btn>
                          </v-col>
                          <v-col
                            cols="4"
                            class="blue white--text text-center my-n1"
                          >
                            <v-btn block @click="AddNum(7)">7</v-btn>
                          </v-col>
                          <v-col
                            cols="4"
                            class="blue white--text text-center my-n1"
                          >
                            <v-btn block @click="AddNum(8)">8</v-btn>
                          </v-col>
                          <v-col
                            cols="4"
                            class="blue white--text text-center my-n1"
                          >
                            <v-btn block @click="AddNum(9)">9</v-btn>
                          </v-col>
                          <v-col
                            cols="4"
                            class="blue white--text text-center my-n1"
                          >
                            <v-btn block @click="AddNum('00')">00</v-btn>
                          </v-col>
                          <v-col
                            cols="4"
                            class="blue white--text text-center my-n1"
                          >
                            <v-btn block @click="AddNum('0')">0</v-btn>
                          </v-col>
                          <v-col
                            cols="4"
                            class="blue white--text text-center my-n1"
                          >
                            <v-btn color="error" block @click="AddNum('-')"
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
                      <div class="d-flex">
                        <div>
                          ຮັບສ່ວນຫຼຸດ!: {{ promotion ? promotion : '0' }}%
                        </div>
                        <v-divider vertical class="mx-2"></v-divider>
                        <div>
                          ໄລເປັນເງີນ:
                          {{ formatPrice(promotionSum ? promotionSum : 0) }}ກີບ
                        </div>
                      </div>
                      <v-spacer></v-spacer>
                      <v-select
                        v-model="promotion_id"
                        :items="getPromotion"
                        filled
                        dense
                        item-value="id"
                        item-text="condition"
                        label="ໂປໂມຊັນ"
                        required
                        clearable
                        clear-icon="mdi-close-circle-outline"
                        @change="onPromotionSelect"
                      ></v-select>
                    </v-card-actions>
                  </div>
                  <!-- /.modal-content -->
                </div>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-col>
      <!-- ____________________________________________dialog show sale detail_______________________________________ -->
      <v-dialog v-model="openDetail" persistent max-width="800">
        <v-card class="pa-5 ma-0">
          <v-row>
            <v-col cols="4">
              <v-img :src="displayDetail.profile" width="250"></v-img>
            </v-col>
            <v-col cols="8">
              <!-- Product Name -->
              <v-card-title> {{ displayDetail.name }}</v-card-title>

              <!-- Product Description -->
              <v-card-text>ປະເພດ: {{ displayDetail.category }}</v-card-text>
              <v-card v-if="color_size_data.length === 0">
                <h3 class="py-5 px-2">ສິນຄ້າໝົດສະຕ໋ອກ</h3>
              </v-card>
              <v-card v-else>
                <v-card-text>
                  <v-radio-group
                    v-model="color_size_data.id"
                    row
                    mandatory
                    class="mt-n2"
                    hide-details
                    @change="Selected"
                  >
                    <template v-for="item in color_size_data">
                      <div :key="item.id">
                        <v-radio
                          :label="`ສີ - ${item.color} || ຂະໜາດ - (${item.size}) || ຈຳນວນ - (${item.quantity})`"
                          :value="item.id"
                          dense
                          prepend-inner-icon="mdi-ballot-outline"
                        ></v-radio>
                      </div>
                    </template>
                  </v-radio-group>
                </v-card-text>
              </v-card>

              <!-- <v-card-text>
                <v-autocomplete
                  v-model="color_size_data.id"
                  auto-select-first
                  chips
                  clearable
                  outlined
                  :items="color_size_data"
                  item-value="id"
                  item-text="id"
                  dense
                  deletable-chips
                  prepend-inner-icon="mdi-ballot-outline"
                  label="ເລືອກສີ ແລະ ຂະໜາດທີ່ຕ້ອງການ"
                  single-line
                  hide-details
                  @change="Selected"
                  @click:clear="clearbox"
                >
                  <template #item="{ item }">
                    <div class="select-item d-flex align-center justify-center">
                      <span>ສີ- {{ item.color }}</span>
                      <span> || </span>
                      <span>ຂະໜາດ- ( {{ item.size }} )</span>
                      <span> || </span>
                      <span>ຈຳນວນ- ( {{ item.quantity }} )</span>
                    </div>
                  </template>
                </v-autocomplete>
              </v-card-text> -->
              <v-card-text
                v-if="selected_color_size ? selected_color_size : false"
                class="text-start"
              >
                <div
                  v-if="
                    selected_color_size.color
                      ? selected_color_size.color
                      : false
                  "
                >
                  <h3 class="mr-2">
                    ສີ: <span>{{ selected_color_size.color }}</span>
                  </h3>
                </div>
                <div
                  v-if="
                    selected_color_size.size ? selected_color_size.size : false
                  "
                >
                  <h3 class="mr-2">
                    ຂະໜາດ: <span>{{ selected_color_size.size }}</span>
                  </h3>
                </div>
                <div
                  v-if="
                    selected_color_size.quantity
                      ? selected_color_size.quantity
                      : false
                  "
                >
                  <h3 class="mr-2">
                    ຈຳນວນທີສາມາດຂາຍ:
                    <span>{{ selected_color_size.quantity }}</span>
                  </h3>
                </div>
                <div
                  v-if="
                    selected_color_size.sale_price
                      ? selected_color_size.sale_price
                      : false
                  "
                >
                  <h3 class="mr-2">
                    ລາຄາຂາຍ:
                    <span
                      >{{
                        formatPrice(selected_color_size.sale_price)
                      }}
                      ກີບ</span
                    >
                  </h3>
                </div>
              </v-card-text>
            </v-col>
          </v-row>

          <!-- Add to Cart Button -->
          <v-card-actions>
            <v-btn
              class="primary"
              :disabled="!selected_color_size.id"
              @click="AddToOrder(selected_color_size.id)"
              ><v-icon>mdi-plus</v-icon> ສັ່ງເພີ່ມ</v-btn
            >
            <v-btn class="error" @click="closeDetail()"
              ><v-icon>mdi-close</v-icon> ປິດ</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'AdminSaleOfSystemMaymaiShopIndex',

  data() {
    return {
      ListSale: [],
      category_id: null,
      category_data: [],
      color_size_data: [],
      selected_color_size: {},
      displayDetail: {},
      openDetail: false,
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
      promotion_id: null,
      promotion: 0,
      sale_data: {
        customer_id: null,
        promotion_id: null,
        employee_id: null,
        sale_date: null,
        sale_total: null,
        sale_quantity: null,
        sale_type: null,
        sale_status: null,
      },
      sale_detail_data: {
        sale_id: null,
        product_id: null,
        sale_price: null,
        quantity: null,
        color_size_id: null,
      },
    }
  },
  computed: {
    getPromotion() {
      return this.$store.state.promotion.StateSelectAll
    },
    CheckCPay() {
      if (
        parseInt(this.CashAmount) -
          parseInt(
            this.promotion
              ? this.TotalAmount - this.promotionSum
              : this.TotalAmount
          ) >=
        0
      ) {
        return false
      } else {
        return true
      }
    },
    calculatedCashBack() {
      return (
        parseInt(this.CashAmount) -
          parseInt(
            this.promotion_id
              ? this.TotalAmount - this.promotionSum
              : this.TotalAmount
          ) || 0
      )
    },
    TotalAmount() {
      return this.ListOrder.reduce(
        (num, item) => num + item.sale_price * item.order_amount,
        0
      )
    },
    promotionSum() {
      return this.ListOrder.reduce(
        (num, item) =>
          num + item.sale_price * item.order_amount * (this.promotion / 100),
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
      const selectedCategoryId = this.category_id

      return this.$store.state.product.StateSelectAll.map((item, index) => {
        return {
          index: index + 1,
          ...item,
        }
      }).filter((item) => {
        // Apply the regular search filter
        const nameMatch = item.name?.toLowerCase().includes(searchTerm)
        const barcodeMatch = item.Barcode?.toLowerCase().includes(searchTerm)
        const categoryMatch = item.category?.toLowerCase().includes(searchTerm)
        // Apply the category filter
        const categoryFilter =
          !selectedCategoryId || item.category_id === selectedCategoryId
        // Combine the regular search filter and category filter using '&&' (logical AND) operator
        return (nameMatch || barcodeMatch || categoryMatch) && categoryFilter
      })
    },
  },
  mounted() {
    this.$store.dispatch('product/selectAll')
    this.$store.dispatch('promotion/selectAll')
    this.$axios.get('/category').then((res) => {
      this.category_data = res.data.result.rows
    })
  },

  methods: {
    closeDetail() {
      this.openDetail = false
      this.selected_color_size = {}
    },
    clearbox() {
      const i = 52222
      console.log('hsoidfjasjdfalsd', i)
    },
    Selected() {
      this.selected_color_size = this.color_size_data.find(
        (i) => i.id === this.color_size_data.id
      )
    },
    showDetail(item) {
      console.log('show', item)
      this.openDetail = true
      this.displayDetail = item
      this.$axios
        .get(`/color_size/byProductId/${item.id}`)
        .then((res) => {
          this.color_size_data = res.data.result
          const colorSizeOptions = res.data.result
          for (const colorSizeOption of colorSizeOptions) {
            // Check if an item with the same 'id' already exists in 'ListSale'
            const existingItem = this.ListSale.find(
              (saleItem) => saleItem.id === colorSizeOption.id
            )
            if (!existingItem) {
              this.ListSale.push({
                id: colorSizeOption.id,
                product_id: colorSizeOption.product_id,
                name: this.displayDetail.name,
                category: this.displayDetail.category,
                sale_price: colorSizeOption.sale_price,
                color: colorSizeOption.color,
                size: colorSizeOption.size,
                quantity: colorSizeOption.quantity,
              })
            }
          }
        })
        .catch((error) => {
          this.color_size_data = []
          console.error('Error fetching color_size_data:', error)
        })
    },
    onPromotionSelect() {
      const item = this.getPromotion.find((i) => i.id === this.promotion_id)
      this.promotion = item.discount || null
    },

    async ConfirmPay() {
      const currentDate = new Date()
      const formattedDate = currentDate.toISOString() // Convert date to ISO 8601 format
      this.loading = true

      this.sale_data.promotion_id = this.promotion_id
      this.sale_data.employee_id = this.$cookies.get('id')
      this.sale_data.sale_date = formattedDate
      this.sale_data.sale_total = this.promotionSum
        ? this.TotalAmount - this.promotionSum
        : this.TotalAmount
      this.sale_data.sale_quantity = this.TotalQuantity
      this.sale_data.sale_type = 'pos'
      this.sale_data.sale_status = 'completed'

      await this.$axios
        .post('/sale', this.sale_data)
        .then((response) => {
          this.sale_id = response.data.result.id

          // send data to sale_detail---------------------------
          this.ListOrder.map(async (item) => {
            this.sale_detail_data.sale_id = this.sale_id
            this.sale_detail_data.product_id = item.product_id
            this.sale_detail_data.color_size_id = item.id
            this.sale_detail_data.sale_price = item.sale_price
            this.sale_detail_data.quantity = item.order_amount
            return await this.$axios.post('/saleDetail', this.sale_detail_data)
          })
          // send subtract quantity----------------------------

          try {
            // Group items by product_id and calculate total order quantity for each product
            const groupedItems = this.ListOrder.reduce((accumulator, item) => {
              const productId = item.product_id
              if (accumulator[productId]) {
                accumulator[productId].order_amount += item.order_amount
              } else {
                accumulator[productId] = { ...item }
              }
              return accumulator
            }, {})

            // Send requests to update quantity for each product
            const updatePromises = Object.values(groupedItems).map(
              async (item) => {
                try {
                  const response = await this.$axios.put(
                    `/product/${item.product_id}/subtract-quantity`,
                    {
                      quantity: item.order_amount,
                    }
                  )
                  console.log(response.data) // Logging the response for each product (optional)
                  return response.data
                } catch (error) {
                  console.error(error) // Handle errors (optional)
                  throw error
                }
              }
            )

            // Wait for all requests to finish
            const results = Promise.all(updatePromises)
            console.log(results) // Logging the results of all requests (optional)
          } catch (error) {
            console.error('Error updating quantities:', error)
          }

          this.ListOrder.map(async (item) => {
            return await this.$axios.put(
              `/color_size/subtractByColorSizeAndProductId/${item.id}/${item.product_id}`,
              { quantity: item.order_amount }
            )
          })
          this.loading = false
          this.dialog = false
          this.$router.push('/sale/' + this.sale_id)
          this.$toast.success('ສຳເລັດການຂາຍ')
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
      const item = this.color_size_data.find((i) => i.id === id)
      console.log('show:', item)
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
              product_id: item.product_id,
              name: this.displayDetail.name,
              category: this.displayDetail.category,
              sale_price: item.sale_price,
              color: item.color,
              size: item.size,
              order_amount: 1,
            })
          }
        } else {
          this.$toast.error('<h3>ສີນຄ້າໝົດ!</h3>')
        }
      } else {
        const chnum = this.color_size_data.find((i) => i.id === id)
        if (chnum) {
          if (chnum.quantity > 0) {
            const existingOrder = this.ListOrder.find((i) => i.id === id)
            if (existingOrder) {
              existingOrder.order_amount++
            } else {
              this.ListOrder.push({
                id: item.id,
                product_id: item.product_id,
                name: this.displayDetail.name,
                category: this.displayDetail.category,
                sale_price: item.sale_price,
                color: item.color,
                size: item.size,
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
      const item = this.ListSale.find((i) => i.id === id)
      const listOrder = this.ListOrder.find((i) => i.id === id)

      if (listOrder) {
        const oldOrderAmount = listOrder.order_amount
        if (item.quantity - oldOrderAmount > 0) {
          listOrder.order_amount = oldOrderAmount + 1
        } else {
          this.$toast.error('<h3 class="pa-2">ສີນຄ້າໝົດ!</h3>')
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
.scroll-container {
  height: 560px;
  overflow-y: auto;
}
</style>
