<template>
    <div id="chart">
      <v-row no-gutters class="justify-center">
        <p style="font-size: 2rem">ລາຍງານຂໍ້ມູນຂາຍສິນຄ້າ</p>
      </v-row>
  
      <v-row class="justify-center">
        <v-col cols="12" md="4">
          <v-card height="300">
            <h3 style="margin-left: 150px">ຍອດຂາຍລວມທັງໝົດ</h3>
            <apexchart type="radialBar" height="320"></apexchart>
          </v-card>
        </v-col>
        <v-col cols="12" md="8">
          <v-card height="300">
            <v-card-title>
              <p style="font-weight: bold">ຍອດລວມຈາກການຂາຍສິນຄ້າລະຫວ່າງວັນທີ່</p>
            </v-card-title>
            <v-row class="justify-center ma-5">
              <v-toolbar dense flat class="mt-5">
                <v-menu offset-y>
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      class="mr-1"
                      v-model="picker"
                      label="YYYY-MM-DD"
                      color="black"
                    >
                    </v-text-field>
                    <v-btn class="mr-8" icon v-bind="attrs" v-on="on">
                      <v-icon color="#004D40" large>mdi-alarm</v-icon>
                    </v-btn>
                  </template>
                  <v-date-picker v-model="picker" color="#000000"></v-date-picker>
                </v-menu>
                <h3>ຫາ ວັນທີ່</h3>
              </v-toolbar>
              <v-toolbar dense flat class="mt-5">
                <v-menu offset-y>
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      label="YYYY-MM-DD"
                      v-model="picker2"
                    ></v-text-field>
                    <v-btn color="primary" icon v-bind="attrs" v-on="on">
                      <v-icon color="#004D40" large left>mdi-alarm</v-icon>
                    </v-btn>
                  </template>
                  <v-date-picker
                    v-model="picker2"
                    color="#039BE5"
                  ></v-date-picker>
                </v-menu>
                <v-btn class="mx-1" color="primary" style="font-size: 20px">
                  <v-icon color="white" left>mdi-air-filter</v-icon>ລາຍງານ
                </v-btn>
              </v-toolbar>
            </v-row>
            <v-row class="justify-center ma-2 mx-5">
              <v-progress-linear
                v-if="selldate != null"
                color="#00E676"
                rounded
                height="70"
              >
                <p style="font-size: 2rem; color: black">ກິບ</p>
              </v-progress-linear>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="justify-center my-3">
        <v-card width="100%" class="mx-3 mb-5 pt-2">
          <v-toolbar flat>
            <h3>ປະຫວັດຍອດຂາຍປະຈໍາ{{ selectDate }}</h3>
            <v-spacer></v-spacer>
            <v-card class="elevation-0 mt-1" color="transparent" width="100">
              <v-select
                v-model="selectDate"
                :items="date_list"
                single-line
                placeholder="Date"
                hint="Date"
              ></v-select>
            </v-card>
          </v-toolbar>
          <apexchart type="line" height="350"></apexchart>
          <v-row class="justify-center my-3">
            <h3>ລວມເປັນມູນຄ່າ: ກິບ</h3>
          </v-row>
        </v-card>
      </v-row>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        date_list: ['ວັນທີ່', 'ເດືອນ', 'ເປັນປີ'],
        selectDate: 'ວັນທີ່',
        picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        picker2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
      }
    },
  }
  </script>