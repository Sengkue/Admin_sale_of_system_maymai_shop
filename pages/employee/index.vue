<template>
    <v-container>
      <v-card class="ma-1 mt-4">
        <v-row justify="center">
          <h2>ຈັດການຂໍ້ມູນພະນັກງານ</h2>
        </v-row>
  
        <v-card-text class="mt-5">
          <v-data-table
            dense
            :headers="headers"
            :search="search"
            :items="item"
            sort-by="calories"
          >
            <template #top>
              <v-toolbar flat>
                <v-toolbar-title>ລາຍຊື່ພະນັກງານ</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px" persistent>
                  <template #activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      class="mt-n5"
                    >
                      <v-icon left>mdi-plus</v-icon> ເພີ່ມ
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-text-field
                      append-icon="mdi-magnify"
                      placeholder="ຄົ້ນຫາ"
                      outlined
                      dense
                      v-model="search"
                      class="mt-4"
                    ></v-text-field>
                  </template>
  
                  <v-card>
                    <v-toolbar dense color="primary" dark>
                      <v-row justify="center"> 
                          {{ formTitle }}
                      </v-row>
                    </v-toolbar>
                    <v-card-text>
                      <v-form v-model="valid">
                        <v-row justify="center" class="mt-3">
                          <v-col cols="12" class="mb-n5">
                            <v-text-field
                              dense
                              outlined
                              v-model="editItem.category_name"
                              label="ຊື່ພະນັກງານ"
                              required
                              :rules="[
                                (val) => !!val || 'ກະລຸນາປ້ອນຊື່ພະນັກງານ.',
                              ]"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-card-text>
                    <v-divider></v-divider>
  
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="btn-hover" color="blue" @click="close">
                        <v-icon>mdi-check</v-icon>
                        ບັນທຶກ
                      </v-btn>
  
                      <v-btn class="btn-hover" color="red" @click="close">
                        <v-icon>mdi-close</v-icon>
                        ຍົກເລີກ
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
              <v-divider></v-divider>
            </template>
  
            <template #[`item.actions`]="{ item }">
              <v-row no-gutters justify="end">
                <v-btn
                  @click="deleteAction(item)"
                  small
                  color="#dc3455"
                  class="mr-2"
                >
                  <v-icon left>mdi-delete</v-icon>
                  ລືບ
                </v-btn>
                <v-btn color="#28a745" dark small @click="editAction(item)">
                  <v-icon left>mdi-pen</v-icon>
                  ແກ້ໄຂ
                </v-btn>
              </v-row>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  <script>
  export default {
    data() {
      return {
        editItem: {},
        editedIndex: -1,
        valid: false,
        dialog: false,
        search: '',
        headers: [
          {
            text: 'ລຳດັບ',
            value: 'id',
          },
          {
            text: 'ຊື່ພະນັກງານ',
            value: 'personnel_name',
          },
          {
            text: 'address',
            value: 'address',
          },
          {
            text: 'tel',
            value: 'tel',
          },
        ],
        item: [
          {
            id: '1',
            personnel_name: 'ຕູ້ຢ່າງ',
            address:'ຄັງແຄະ',
            tel:'02097181800'
          }
        ],
      }
    },
    computed: {
     formTitle() {
      return this.editedIndex === -1 ? "ເພີ່ມຂໍ້ມູນ" : "ແກ້ໄຂຂໍ້ມູນ";
     }
    },
    methods: {
      openDialog() {
          this.dialog = true
      },
      close() {
          this.dialog = false;
          this.$nextTick(() => {
              this.editItem = Object.assign({}, null);
              this.editedIndex = -1;
          })
      },
      editAction(list){
        this.editedIndex = this.item.indexOf(list);
        this.editItem = Object.assign({}, list);
        this.dialog = true;
      }
    }
  }
  </script>
  <!-- <style>
  .v-data-table th {
    background: rgb(215, 215, 209);
    font-size: 1.1rem !important;
  }
  </style> -->