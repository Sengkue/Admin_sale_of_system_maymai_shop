<template>
    <div>
      <v-row justify="center">
        <v-col cols="12" md="11">
          <form @submit.prevent="submit">
            <v-card
              elevation="2"
              style="margin-top: 2px; padding-bottom: 10px"
              class="mt-3"
            >
              <v-row no-gutters class="justify-center">
                <h2 style="margin-top: 30px">ເພີ່ມຂໍ້ມູນສິນຄ້າ</h2>
              </v-row>
              <v-row no-gutters class="ma-5 justify-space-around">
                <v-col cols="12" md="9">
                  <v-card class="mr-4 elevation-0">
                    <v-text-field
                      v-model="products.id"
                      :rules="[(v) => !!v || 'id is require']"
                      :counter="100"
                      label="ລະຫັດສິນຄ້າ"
                      required
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="products.name"
                      :rules="[(v) => !!v || 'name is require']"
                      :counter="100"
                      label="ຊື່ສິນຄ້າ"
                      required
                    >
                    </v-text-field>
                    <v-autocomplete
                      v-model="products.category"
                      :items="cate_names"
                      :rules="[(v) => !!v || 'category is require']"
                      label="ປະເພດສິນຄ້າ"
                      allow-overflow
                      required
                    ></v-autocomplete>
                    <v-text-field
                      v-model="products.color"
                      :rules="[(v) => !!v || 'color is require']"
                      :counter="100"
                      label="ສີ"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="products.size"
                      :rules="[(v) => !!v || 'size is require']"
                      label="ຂະໜາດ ຫຼື ເບີ້"
                      counter
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="products.qty"
                      :rules="[(v) => !!v || 'qty is require']"
                      label="ຈໍານວນສິນຄ້າ"
                      required
                    ></v-text-field>
                    <!-- <v-autocomplete
                      v-model="products.unit"
                      ::rules="[(v) => !!v || 'unit is require']"
                      :items="unit_names"
                      label="ຫົວໜ່ວຍສິນຄ້າ"
                      required
                    ></v-autocomplete> -->
                    <v-text-field
                      v-model="products.price"
                      :rules="[(v) => !!v || 'price is require']"
                      label="ລາຄາສິນຄ້າ"
                      required
                    ></v-text-field>
  
                    <v-radio-group
                      v-model="products.status"
                      row
                      label="ສະຖານະສິນຄ້າ"
                      required
                      :rules="[(v) => !!v || 'status is require']"
                    >
                      <v-row class="justify-space-around">
                        <!-- <v-radio label="ສິນຄ້າເກົ່າ" value="Old"></v-radio> -->
                        <v-radio label="ສິນຄ້າໃໝ່" value="New"></v-radio>
                        <v-radio label="ສິນຄ້າຕົວແບບ" value="Prototype"></v-radio>
                      </v-row>
                    </v-radio-group>
  
                    <v-divider style="margin-top: -10px" class></v-divider>
                    <h4 class="mt-5" style="font-size: 17px; font-weight: normal">
                      ເລຶອກຮູບສິນຄ້າ
                    </h4>
                    <input
                      type="file"
                      class="file-upload"
                      multiple
                      ref="file"
                      label="Image input"
                    />
                    <v-carousel
                      v-if="proImg.length > 0"
                      show-arrows-on-hover
                      hide-delimiters
                      height="auto"
                      class="grey lighten-3"
                      v-ripple="{ class: `white--text` }"
                    >
                      <v-carousel-item v-for="(img, i) in proImg" :key="i">
                        <v-card class="mx-auto white" width="100%">
                          <v-img
                            aspect-ratio="1.4"
                            height="450"
                            contain
                            transition
                          >
                            <template v-slot>
                              <div>
                                <v-col class="align-end">
                                  <v-row class="ma-1 align-end justify-end">
                                    <v-btn class large color="error" icon>
                                      <v-icon large color="error"
                                        >mdi-delete</v-icon
                                      >
                                    </v-btn>
                                  </v-row>
                                  <v-row class="ma-1 align-end justify-end">
                                    <v-btn class large icon>
                                      <v-icon large color="red"
                                        >mdi-close-box-multiple</v-icon
                                      >
                                    </v-btn>
                                  </v-row>
                                </v-col>
                              </div>
                            </template>
                          </v-img>
                        </v-card>
                      </v-carousel-item>
                    </v-carousel>
                  </v-card>
                </v-col>
              </v-row>
  
              <v-divider class></v-divider>
              <v-row class="ma-5">
                <v-btn
                  style="font-size: 20px; font-weight: bold"
                  color="deep-purple lighten-4"
                  rounded
                  class="mt-2"
                  to="/product"
                >
                  <v-icon left large>mdi-arrow-left-circle</v-icon>ກັບສູ່ໜ້າສິນຄ້າ
                </v-btn>
                <v-spacer></v-spacer>
  
                <v-btn
                  style="font-size: 20px; font-weight: bold"
                  color="#FF8A65"
                  rounded
                  class="mt-2 mr-7"
                >
                  <v-icon left large>mdi-close-circle</v-icon>ຍົກເລິກ
                </v-btn>
  
                <v-btn
                  style="font-size: 20px; font-weight: bold"
                  color="#1DE9B6"
                  rounded
                  class="mt-2 mr-5"
                >
                  <v-icon large left>mdi-check-circle</v-icon>ບັນທຶກ
                </v-btn>
              </v-row>
            </v-card>
          </form>
        </v-col>
      </v-row>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        Categoryheaders: [
          { text: 'ລໍາດັບ', value: 'cate_id' },
          { text: 'Category', value: 'cate_name' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        category: [],
        proImg: [],
        products: {
          id: '',
          name: '',
          cate_id: null,
          category: '',
          unit_id: null,
          unit: '',
          color: '',
          size: '',
          qty: '',
          price: '',
          status: '',
        },
      }
    },
    submit() {},
  }
  </script>