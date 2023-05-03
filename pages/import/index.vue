<template>
    <v-card class="elevation-0">
      <v-data-table
        :headers="headers"
        :items="importList"
        :search="search"
        item-key="name"
        v-model="selected"
        sort-by="calories"
        class="elevation-2"
      >
        <template #top>
          <v-row justify="center">
            <h2 class="mt-5 mb-7">ນໍາເຂົ້າສິນຄ້າ</h2>
          </v-row>
          <v-divider></v-divider>
          <div>
            <v-toolbar flat>
              <router-link to="/views.Admin/service/import/history">
                <v-btn
                  class="mt-4"
                  text
                  style="font-size: 20px; "
                >
                  <v-icon large left>mdi-history</v-icon>
                  ປະຫວັດການນໍາເຂົ້າສິນຄ້າ
                </v-btn>
              </router-link>
  
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-toolbar-title>ລາຍການນໍາເຂົ້າສິນຄ້າ</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-autocomplete
                v-model="select"
                auto-select-first
                chips
                clearable
                outlined
                dense
                @change="Selected"
                deletable-chips
                :items="orderid"
                prepend-icon="mdi-file-find"
                label="ປ້ອນເລກໃບສັ່ງຊື້ສິນຄ້າ"
                single-line
                hide-details
              ></v-autocomplete>
              <v-spacer></v-spacer>
  
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title
                    style="
                      font-size: 25px;
                      font-weight: bold; 
                    "
                    >ທ່ານຕ້ອງການລຶບຂໍ້ມູນລາຍການນີ້ບໍ...?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="error"
                      text
                      style="font-size: 20px"
                      @click="close"
                      >ຍົກເລິກ</v-btn
                    >
                    <v-btn
                      color="primary"
                      text
                      style="font-size: 20px; "
                      @click="deleteItemConfirm"
                      >ຢຶນຢັນລຶບ</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
            <v-divider class=""></v-divider>
            <v-divider class=""></v-divider>
          </div>
        </template>
  
        <template #body="{ items, headers }">
          <tbody>
            <tr
              v-for="(item, idx) in items"
              :key="idx"
              v-ripple="{ class: `white--text` }"
            >
              <td v-for="(header, key) in headers" :key="key">
                <div v-if="headers[key] == headers[0]">
                  {{ idx + 1 }}
                </div>
                <v-card
                  v-if="headers[key] == headers[1]"
                  width="70"
                  height="100"
                  :img="fectImg(item[header.value])"
                >
                </v-card>
                <v-edit-dialog
                  v-else
                  v-ripple="{ class: `error--text` }"
                  :return-value.sync="item[header.value]"
                  @save="save"
                  @cancel="cancel"
                  @open="open"
                  @close="close"
                  large
                >
                  {{ item[header.value] }}
                  <template #input>
                    <v-text-field
                      v-if="
                        headers[key] == headers[6] || headers[key] == headers[8]
                      "
                      v-model="item[header.value]"
                      label="Edit"
                      single-line
                      @keypress="CheckNumber($event)"
                    >
                    </v-text-field>
                    <v-text-field
                      v-else
                      v-model="item[header.value]"
                      label="Edit"
                      single-line
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
              <td>
                <v-icon color="red" large @click="deleteItem(idx)">
                  mdi-delete
                </v-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
  
      <v-row class="mt-4 mr-3">
         <v-spacer></v-spacer>
         <v-btn
          @click="clear"
          style="font-size: 20px; font-weight: bold"
          color="#FF8A65"
          rounded
          class="mt-2 mr-7 mb-5"
        >
          <v-icon left large>mdi-close-circle</v-icon>ຍົກເລິກ
        </v-btn>
  
        <v-btn
          @click="saveOrder"
          style="font-size: 20px; font-weight: bold"
          color="#1DE9B6"
          rounded
          class="mt-2 mr-5 mb-5"
          :disabled="emty"
        >
          <v-icon large left>mdi-check-circle</v-icon>ຢຶນຢັນນໍາເຂົ້າສິນຄ້າ
        </v-btn>
      </v-row>
    </v-card>
  </template>
  <script>
  export default {
    data() {
      return {
        dialog: false,
        filter: {},
        sortDesc: false,
        dialogDelete: false,
        search: '',
        headers: [
          { text: 'ລໍາດັບ', value: 'idx', sortable: false },
          {
            text: 'ຮູບ',
            align: 'start',
            sortable: false,
            value: 'image',
          },
          { text: 'ຊື່ສິນຄ້າ', value: 'pro_name' },
          { text: 'ປະເພດສິນຄ້າ', value: 'category' },
          { text: 'ສີ', value: 'color' },
          { text: 'ຂະໜາດ', value: 'size' },
          { text: 'ຈໍານວນ', value: 'qty' },
          // { text: 'ຫົວໜ່ວຍ', value: 'unit' },
          { text: 'ລາຄາ', value: 'price' },
        ],
        selected: [],
        select: null,
        did: null,
        editedItem: {
          pro_name: '',
          category: '',
          unit: '',
          color: '',
          size: '',
          qty: 0,
          price: 0,
          image: null,
        },
        importby: {
          import_id: '',
          emp_id: '',
          detail: [],
        },
      }
    },
  }
  </script>