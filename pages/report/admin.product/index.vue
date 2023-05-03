<template>
    <div id="chart">
      <v-row no-gutters class="justify-center">
        <h1>ລາຍງານຂໍ້ມູນສິນຄ້າທີ່ມີໃນຮ້ານ</h1>
      </v-row>
      <v-row class="mx-0 mt-3 py-3 justify-center">
        <v-tabs
          v-model="page"
          fixed-tabs
          slider-color="#00E676"
          large
          color="#00C853"
        >
          <v-tab v-for="item in items" :key="item" large
            ><span>{{ item }}</span></v-tab
          >
        </v-tabs>
      </v-row>
      <v-tabs-items v-model="page">
        <v-tab-item>
          <v-card flat>
            <v-row no-gutters class="ml-7 mt-7">
              <h3>ສິນຄ້າທັງໝົດ: 100 ລາຍການ</h3>
              <v-spacer></v-spacer>
              <v-btn class color="primary">
                <v-icon dark left>mdi-printer</v-icon>print
              </v-btn>
            </v-row>
            <apexchart type="bar"></apexchart>
          </v-card>
        </v-tab-item>
  
        <v-tab-item>
          <v-card flat>
            <v-row no-gutters class="ml-7 mt-7">
              <h3>ສິນຄ້າທີ່ໄດ້ຂາຍດີ: ລາຍການ</h3>
              <v-spacer></v-spacer>
              <v-btn class color="primary">
                <v-icon dark left>mdi-printer</v-icon>print
              </v-btn>
            </v-row>
            <apexchart type="bar" height="500"></apexchart>
          </v-card>
        </v-tab-item>
  
        <v-tab-item>
          <v-card flat>
            <v-row no-gutters class="ml-7 mt-7">
              <h3>ສິນຄ້ານິຍົມສັ່ງຊື້: ລາຍການ</h3>
              <v-spacer></v-spacer>
              <v-btn class color="primary">
                <v-icon dark left>mdi-printer</v-icon>print
              </v-btn>
            </v-row>
            <apexchart type="bar" height="500"></apexchart>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        page: 'ສິນຄ້າໃນສະຕ໊ອກ',
        items: [
          'ສິນຄ້າໃນສະຕ໊ອກ',
          'ສິນຄ້າທີ່ໄດ້ຂາຍດີ',
          'ສິນຄ້ານິຍົມສັ່ງຊື້',
          // 'ສິນຄ້ານິຍົມສັ່ງຕັດ',
        ],
      }
    },
  }
  </script>
  <style scoped>
  span {
    font-size: 1.5rem;
  }
  </style>