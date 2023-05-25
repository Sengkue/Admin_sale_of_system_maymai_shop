<template>
  <div>
    <v-row >
      <v-col cols="12" class="white--text" style="background: linear-gradient(to right, #6c1e1e, #fa1212)">
        <v-container class="d-flex justify-space-between" >
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
            <v-text-field label="Search" outlined dense></v-text-field>
            <!-- card image 1 -->
            <div class="d-flex flex-wrap">
              <v-card max-width="150px" v-ripple elevation="10" class="ma-1">
                <v-img
                  src="/images/shirt/01.png"
                  height="150px"
                  contain
                ></v-img>
                <v-card-text>
                  <div class="font-weight-black">Red shirt</div>
                  <div>50,000kip</div>
                </v-card-text>
              </v-card>
              <!-- card image 1 -->
              <v-card max-width="150px" v-ripple elevation="10" class="ma-1">
                <v-img
                  src="/images/shirt/02.png"
                  height="150px"
                  contain
                ></v-img>

                <v-card-text>
                  <div class="font-weight-black">Red shirt</div>
                  <div>50,000kip</div>
                </v-card-text>
              </v-card>
              <!-- card image 1 -->
              <v-card max-width="150px" v-ripple elevation="10" class="ma-1">
                <v-img
                  src="/images/shirt/03.png"
                  height="150px"
                  contain
                ></v-img>

                <v-card-text>
                  <div class="font-weight-black">Red shirt</div>
                  <div>50,000kip</div>
                </v-card-text>
              </v-card>
              <!-- card image 1 -->
              <v-card max-width="150px" v-ripple elevation="10" class="ma-1">
                <v-img
                  src="/images/shirt/07.png"
                  height="150px"
                  contain
                ></v-img>

                <v-card-text>
                  <div class="font-weight-black">Red shirt</div>
                  <div>50,000kip</div>
                </v-card-text>
              </v-card>
              <!-- card image 1 -->
              <v-card max-width="150px" v-ripple elevation="10" class="ma-1">
                <v-img
                  src="/images/shirt/08.png"
                  height="150px"
                  contain
                ></v-img>

                <v-card-text>
                  <div class="font-weight-black">Red shirt</div>
                  <div>50,000kip</div>
                </v-card-text>
              </v-card>
              <!-- card image 1 -->
              <v-card max-width="150px" v-ripple elevation="10" class="ma-1">
                <v-img
                  src="/images/shirt/greenshirt.png"
                  height="150px"
                  contain
                ></v-img>

                <v-card-text>
                  <div class="font-weight-black">Red shirt</div>
                  <div>50,000kip</div>
                </v-card-text>
              </v-card>
              <!-- card image 1 -->
              <v-card max-width="150px" v-ripple elevation="10" class="ma-1">
                <v-img
                  src="/images/shirt/whiteShirt.png"
                  height="150px"
                  contain
                ></v-img>

                <v-card-text>
                  <div class="font-weight-black">Red shirt</div>
                  <div>50,000kip</div>
                </v-card-text>
              </v-card>
              <!-- card image 1 -->
              <v-card max-width="150px" v-ripple elevation="10" class="ma-1">
                <v-img
                  src="/images/shirt/10.png"
                  height="150px"
                  contain
                ></v-img>

                <v-card-text>
                  <div class="font-weight-black">Red shirt</div>
                  <div>50,000kip</div>
                </v-card-text>
              </v-card>
              <!-- card image 1 -->
              <v-card max-width="150px" v-ripple elevation="10" class="ma-1">
                <v-img
                  src="/images/shirt/09.png"
                  height="150px"
                  contain
                ></v-img>

                <v-card-text>
                  <div class="font-weight-black">Red shirt</div>
                  <div>50,000kip</div>
                </v-card-text>
              </v-card>
              <!-- card image 1 -->
              <v-card max-width="150px" v-ripple elevation="10" class="ma-1">
                <v-img src="/images/logo.png" height="150px"></v-img>
                <v-card-text>
                  <div class="font-weight-black">Red shirt</div>
                  <div>50,000kip</div>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
          <v-col cols="5">
            <v-card>
              <v-row class="px-2">
                <v-col cols="12" class="d-flex justify-space-between">
                  <div>ລວມຍອດເງິນ</div>
                  <div>132,000ກີບ</div>
                </v-col>
                <v-col cols="12">
                  <v-btn color="primary" width="100%"
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
                    <tr>
                      <td>ສິນຄ້າ A</td>
                      <td>{{ price }}ກີບ</td>
                      <td>
                        <div class="d-flex align-center justify-center">
                          <v-btn
                            icon
                            class="teal white--text rounded-0"
                            style="height: 40px; width: 20px"
                            @click="minus"
                          >
                            <v-icon>mdi-minus</v-icon>
                          </v-btn>
                          <v-text-field
      v-model="quantity"
      dense
      hide-details
      outlined
      filled
      type="text"
      class="rounded-0 text-center"
      style="width: 20px"
      @keydown.enter="enter(quantity)"
    />
                          <v-btn
                            icon
                            class="teal white--text rounded-0"
                            style="height: 40px; width: 20px"
                            @click="plus"
                          >
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </div>
                      </td>

                      <td>{{ subtotal }}ກີບ</td>
                      <td class="text-center">
                        <v-btn icon style="height: 50px">
                          <v-icon color="error" large>mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </table>
                </v-col>
              </v-row>
            </v-card>
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
      quantity: 0,
      price: 25000,
      subtotal: null,
    }
  },

  mounted() {},

  methods: {
    enter(v){
     this.subtotal = this.price * v
    },
    plus() {
      this.quantity = this.quantity + 1
      this.subtotal = this.quantity * this.price
    },
    minus() {
      if (this.quantity > 0) {
        this.quantity = this.quantity - 1
        this.subtotal = this.quantity * this.price
      } else {
        this.quantity = 0
        this.subtotal = this.quantity * this.price
      }
    },
  },
}
</script>

<style lang="scss" scoped>
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
</style>
