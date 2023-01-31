<template>
    <div style="background: #333">
      <v-card color="#fafafa" elevation="0">
        <div class="d-flex justify-center mb-2 px-1 mt-5 x">
          <v-card
            v-ripple="{ class: `green--text` }"
            elevation="2"
            class="card"
            style="background: linear-gradient(to right, #1b5e20, #00e676)"
          >
            <div class="d-flex">
              <v-icon color="white" size="40">mdi-medical-bag</v-icon>
              <v-divider vertical class></v-divider>
              <div class="pa-2 white--text">
                <h3 style="color: #e0f7fa">ຍອດຂາຍລວມທັງໝົດ</h3>
                <span>12000 ກິບ</span>
              </div>
            </div>
          </v-card>
          <v-spacer></v-spacer>
          <v-card
            v-ripple="{ class: `green--text` }"
            elevation="2"
            class="card"
            style="background: linear-gradient(120deg, #880e4f, #ff80ab)"
          >
            <div class="d-flex">
              <v-icon color="white" size="40">mdi-table-arrow-left</v-icon>
              <v-divider vertical class></v-divider>
              <div class="pa-2 white--text">
                <h3 style="color: #fbe9e7">ຍອດນໍາເຂົ້າ</h3>
                <span>130000 ກິບ</span>
              </div>
            </div>
          </v-card>
          <v-spacer></v-spacer>
          <v-card
            v-ripple="{ class: `green--text` }"
            elevation="2"
            class="card"
            style="background: linear-gradient(120deg, #1a237e, #82b1ff)"
          >
            <div class="d-flex">
              <v-icon color="white" size="40">mdi-tshirt-crew</v-icon>
              <v-divider vertical class></v-divider>
              <div class="pa-2 white--text">
                <h3 style="color: #f3e5f5">ສິນຄ້າ</h3>
                <span> 56 ລາຍການ</span>
              </div>
            </div>
          </v-card>
          <v-spacer></v-spacer>
          <v-card
            v-ripple="{ class: `green--text` }"
            elevation="2"
            class="card"
            style="background: linear-gradient(to right, #e65100, #ffcc80)"
          >
            <div class="d-flex">
              <v-icon color="white" size="40">mdi-account-tie</v-icon>
              <v-divider vertical class></v-divider>
              <div class="pa-2 white--text">
                <h3>ພະນັກງານ</h3>
                <span>129 ຄົນ</span>
              </div>
            </div>
          </v-card>
          <v-spacer></v-spacer>
          <v-card
            v-ripple="{ class: `cyan--text` }"
            elevation="2"
            class="card"
            style="background: linear-gradient(to right, #59859c,#c931eb)"
          >
            <div class="d-flex">
              <v-icon color="white" size="40">mdi-account</v-icon>
              <v-divider vertical class></v-divider>
              <div class="pa-2 white--text">
                <h3>ຕົວແທນ</h3>
                <span>178 ຄົນ</span>
              </div>
            </div>
          </v-card>
        </div>
        <div>
          <v-row>
            <v-col cols="12" md="9">
              <v-row no-gutters class="justify-center ma-1">
                <v-hover v-slot="{ hover }" open-delay="200">
                  <v-card
                    :elevation="hover ? 20 : 2"
                    :class="{ 'on-hover': hover }"
                    width="100%"
                    height="400"
                  >
                    <v-toolbar dense flat>
                      <v-spacer></v-spacer>
                      <p></p>
                      <v-spacer></v-spacer>
                      <v-menu>
                        <template #activator="{ on, attrs }">
                          <div
                            class="d-flex"
                            v-bind="attrs"
                            v-on="on"
                            v-ripple="{ class: `green--text` }"
                          >
                            <v-icon color="">mdi-filter-variant</v-icon>
  
                            <h3>ລາຍການ</h3>
                          </div>
                        </template>
  
                        <v-list>
                          <v-list-item
                            link
                            v-for="(item, index) in items"
                            :key="index"
                          >
                            <v-list-item-title @click="SwitchMenu(item.title)">
                              {{ item.title }}
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
  
                      <v-spacer></v-spacer>
                      <v-card
                        class="elevation-0 mt-1"
                        color="transparent"
                        width="100"
                      >
                        <v-select
                          v-model="selectDate"
                          :items="date_list"
                          single-line
                          placeholder="Date"
                          hint="Date"
                        ></v-select>
                      </v-card>
                    </v-toolbar>
  
                    <line-chart
                      width="100%"
                      height="300"
                      v-if="list != null"
                      :chart-data="list"
                    ></line-chart>
                    <v-row
                      v-if="title == 'ກຣາຟສະແດງຍອດລວມ'"
                      class="justify-space-around mt-3"
                    >
                      <span style="font-weight: bold; font-size: 15px"
                        >ຍອດສັ່ງຕັດສິນຄ້າລວມ: ກິບ</span
                      >
                      <span style="font-weight: bold; font-size: 15px"
                        >ຍອດສັ່ງຊື້ສິນຄ້າລວມ: ກິບ</span
                      >
                      <span style="font-weight: bold; font-size: 15px"
                        >ຍອດຂາຍສິນຄ້າລວມ: ກິບ</span
                      >
                    </v-row>
                    <v-row v-else class="justify-center mt-3">
                      <span style="font-weight: bold; font-size: 25px"
                        >ຍອດລວມ: ກິບ</span
                      >
                    </v-row>
                  </v-card>
                </v-hover>
              </v-row>
            </v-col>
            <v-col cols="12" md="3">
              <v-hover v-slot="{ hover }" open-delay="200">
                <v-card
                  class="ma-1"
                  :elevation="hover ? 20 : 2"
                  :class="{ 'on-hover': hover }"
                  width="100%"
                  height="400"
                >
                  <v-card-title primary-title>
                    <v-row class="mx-2 justify-space-between">
                      <p style="font-weight: bold">ຕົວແທນຕົວແບບ</p>
                      <router-link to="/report_customer">
                        <p color="green" text>View More</p>
                      </router-link>
                    </v-row>
                  </v-card-title>
                  <CustBarChart />
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
  
          <v-row>
            <v-col cols="12" class="justify-center">
              <v-row no-gutters class="justify-center">
                <v-col cols="12" md="4" class="align-center mx-5">
                  <v-hover v-slot="{hover}" open-delay="200">
                   <v-card :elevation="hover ? 20: 2" :class="{'on-hover': hover}" width="100%" height="400">
                    <v-card-title primary-title>
                      <v-row class="mx-2 justify-space-between">
                        <p style="font-weight:bold">ສິນຄ້າທີ່ນິຍົມສັ່ງຊື້</p>
                        <router-link to="/report">
                          <p color="green" text>View More</p>
                        </router-link>
                      </v-row>
                    </v-card-title>
                  </v-card>
                  </v-hover>
                </v-col>
  
                <v-col cols="12" md="4">
                  <v-hover v-slot="{hover}" open-delay="200">
                   <v-card :elevation="hover ? 20 : 2" :class="{'on-hover': hover}" width="100%" height="400">
                    <v-card-title>
                      <v-row class="mx-2 justify-space-between">
                        <p style="font-weight: bold">ສິນຄ້າທີ່ໄດ້ຂາຍດີ</p>
                        <router-link to="/report_production">
                            <p color="green" text>View More</p>
                          </router-link>
                      </v-row>
                    </v-card-title>
                    <v-card-subtitle>5 ລາຍການ</v-card-subtitle>
                  </v-card>
                  </v-hover>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        model: 0,
        datacollection: null,
        items: [
          { title: 'ກຣາຟສະແດງຍອດລວມ' },
          { title: 'ກຣາຟສະແດງຍອດຂາຍ' },
          { title: 'ກຣາຟສະແດງຍອດສັ່ງຊື້' },
          { title: 'ກຣາຟສະແດງຍອດສັ່ງຕັດ' },
        ],
        title: 'ກຣາຟສະແດງຍອດລວມ',
        date_list: ['ວັນທີ່', 'ເດືອນ', 'ເປັນປີ'],
        selectDate: 'ວັນທີ່',
      }
    },
  }
  </script>
  <style scoped>
   .card {
    max-width: 100%;
    width: 100%;
    min-width: 240px;
    margin: 7px 2px;
    padding: 5px 3px;
   }
 
  </style>