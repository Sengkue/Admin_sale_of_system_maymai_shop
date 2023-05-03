<template>
    <div>
      <v-data-table
        :headers="Headers"
        :items="import_history"
        show-expand
        :search="search"
        single-expand
        :expanded.sync="expanded"
        class="elevation-1"
      >
        <template #top>
          <v-row justify="center">
            <h2 class="mt-5 mb-7">ປະຫວັດນໍາເຂົ້າສິນຄ້າ</h2>
          </v-row>
          <v-divider></v-divider>
          <div>
            <v-toolbar flat>
              <v-toolbar-title>ປະຫວັດນໍາເຂົ້າສິນຄ້າ</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider
              ><v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="ຄົ້ນຫາ"
                single-line
                outlined
                dense
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>
  
              <router-link to="/views.Admin/service/import">
                <v-btn
                  class="mx-2"
                  style="font-size: 17px; font-weight: bold"
                  color="primary"
                  
                >
                  <v-icon large> mdi-plus </v-icon>
                  ນໍາເຂົ້າສິນຄ້າ
                </v-btn>
              </router-link>
            </v-toolbar>
            <v-divider></v-divider>
            <v-divider></v-divider>
          </div>
        </template>
  
        <template #[`item.actions`]="{ item }">
          <v-icon class="mr-2" color="blue" @click="editeItem(item)">
            mdi-cart-check
          </v-icon>
        </template>
        <template #expanded-item="{ headers, item }">
          <td :colspan="headers.length"></td>
          <v-data-table
            v-if="item.id != '' || item.id != null"
            :headers="headersdetail"
            :items="item.detail"
            :search="search"
            v-model="selected"
            hide-default-footer
            sort-by="calories"
            class="elevation-0 my-2"
            style="background: #fafafaff"
          >
            <template #item="{ item }">
              <tr v-ripple="{ class: `white--text` }">
                <td>{{ item.idx }}</td>
                <td>
                  <v-img
                    :src="fectImg(item.image)"
                    contain
                    height="100"
                    width="70"
                  >
                  </v-img>
                </td>
                <td>{{ item.pro_name }}</td>
                <td>{{ item.category }}</td>
                <td>{{ item.unit }}</td>
                <td>{{ item.color }}</td>
                <td>{{ item.size }}</td>
                <td>{{String(item.qty).replace(/(.)(?=(\d{3})+$)/g,'$1 ')}}</td>
                <td>{{String(item.price).replace(/(.)(?=(\d{3})+$)/g,'$1 ') }}</td>
              </tr>
            </template>
          </v-data-table>
        </template>
      </v-data-table>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        search: '',
        expanded: [],
        Headers: [
          {
            text: 'ລໍາດັບ',
            value: 'idx',
          },
          {
            text: 'ໃບນໍາເຂົ້າວັດຖຸດິບ',
            value: 'id',
          },
          { text: 'ພະນັກງານ', align: 'center', value: 'employee' },
  
          { text: 'ວັນທີ່ນໍາເຂົ້າ', align: 'center', value: 'date' },
          { text: 'ເວລານໍາເຂົ້າ', align: 'center', value: 'time' },
          { text: 'detail', value: 'data-table-expand' },
        ],
  
        headersdetail: [
          {
            text: 'ລໍາດັບ',
            value: 'idx',
          },
          {
            text: 'ຮູບ',
            align: 'center',
            sortable: false,
            value: 'detail.image',
          },
          { text: 'ສິນຄ້າ', value: 'detail.pro_name' },
          { text: 'ປະເພດ', value: 'detail.category' },
          { text: 'ຫົວໜ່ວຍ', value: 'detail.unit' },
          { text: 'ສີ', value: 'detail.color' },
          { text: 'ຂະໜາດ', value: 'detail.size' },
          { text: 'ຈໍານວນ', value: 'detail.qty' },
          { text: 'ລາຄາ', value: 'detail.price' },
        ],
        detaillist: [],
        detail: [],
      }
    },
  }
  </script>