<template>
  <div id="chart">
    <v-row no-gutters class="justify-center">
      <h1>ລາຍງານຂໍ້ມູນລູກຄ້າ</h1>
    </v-row>
    <v-row no-gutters class="ml-7">
      <v-col cols="mx-2" md="3">
        <v-card class="mx-2" height="180" elevation="2">
          <v-row no-gutters class="justify-center">
            <div>
              <v-icon size="120" color="#4FC3F7">mdi-account-group</v-icon>
              <div class="pa-2">
                <h3>
                  ທັງໜົດ
                  <span>{{ getCustomer.length }} ຄົນ</span>
                </h3>
              </div>
            </div>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters class="justify-center">
      <v-card class="ma-2 ml-9" width="100%">
        <v-data-table :headers="headers" :items="getCustomer" :search="search">
          <template #[`item.c_profile`]="{ value }">
            <v-img :src="value" width="60"></v-img>
          </template>

          <template #top>
            <v-toolbar flat>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                placeholder="ຄົ້ນຫາ"
                outlined
                dense
                class="mt-4"
              ></v-text-field>
              <v-spacer></v-spacer>

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
                  <!-- <v-btn block text color="error"
                    ><v-icon left>mdi-file-pdf-box</v-icon> pdf</v-btn
                  >
                  <v-btn block text color="primary"
                    ><v-icon>mdi-printer</v-icon> print</v-btn
                  > -->
                </v-list>
              </v-menu>
            </v-toolbar>
          </template>
          <template #[`item.createdAt`]="{ item }">
            {{ formatDateLo(item.createdAt) }}
          </template>
        </v-data-table>
      </v-card>
    </v-row>
  </div>
</template>
<script>
import * as XLSX from 'xlsx'
export default {
  data() {
    return {
      search: null,
      headers: [
        { text: 'ລຳດັບ', value: 'index' },
        { text: 'ຮູບ', value: 'c_profile' },
        { text: 'ຊື່', value: 'c_fname' },
        { text: 'ນາມສະກຸນ', value: 'c_lname' },
        // { text: "email", value: "email" },
        { text: 'ເບີ', value: 'c_phone' },
        { text: 'ວັນທີສ້າງ', value: 'createdAt' }
      ],
    }
  },
  computed: {
    getCustomer() {
      return this.$store.state.customer.StateSelectAll.map((item, index) => {
        return {
          index: index + 1,
          ...item,
        }
      })
    },
  },
  mounted() {
    this.$store.dispatch('customer/selectAll')
  },
  methods: {
    exportToExcel() {
      // Get the data to export
      const data = this.$store.state.customer.StateSelectAll
      const modifiedData = data.map((item, index) => {
        return {
          index: index + 1,
          ຊື່: item.c_fname.toUpperCase(), // modify the name value to uppercase
          ນາມສະກຸນ: item.c_lname ? item.c_lname.toLowerCase() : '---', // modify the surname value to lowercase
          ເພດ: item.c_gender,
          ເບີ: `+${item.c_phone}`,
          ວັນທີສ້າງ: `${this.formatDateBill(item.createdAt)}`,
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
