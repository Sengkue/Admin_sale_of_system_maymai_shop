<template>
    <div>
      <div>
        <v-card class="px-5">
          <v-row>
            <v-col v-if="isLoading" cols="12" sm="12">
              <div class="d-flex justify-center">
                <v-progress-circular
                  :size="40"
                  :width="5"
                  color="teal"
                  indeterminate
                ></v-progress-circular>
              </div>
            </v-col>
            <v-col cols="12" sm="12" class="mt-2">
              <v-row class="d-flex align-center">
                <v-col cols="4">
                  <v-text-field
                    v-model="search"
                    prepend-inner-icon="mdi-magnify"
                    label="ຄົ້ນຫາ"
                    outlined
                    hide-details
                    clearable
                    dense
                    small
                    class="box2 my-n4"
                  >
                  </v-text-field
                ></v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="search"
                    outlined
                    hide-details
                    dense
                    class="box2 my-n4"
                    prepend-inner-icon="mdi-barcode-scan"
                  ></v-text-field
                ></v-col>
                <v-col cols="4" class="d-flex align-center justify-space-between">
                  <h2>ສິນຄ້າທັງໝົດໃນສະຕ໊ອກມີ >>( {{ getRow.length }} )</h2>
                  <v-menu offset-y>
                    <template #activator="{ on, attrs }">
                      <v-btn color="primary" dark v-bind="attrs" v-on="on">
                        Exports
                      </v-btn>
                    </template>
                    <v-list class="py-0">
                      <v-btn block text color="success"
                        ><v-icon left>mdi-microsoft-excel</v-icon> excel</v-btn
                      >
                      <v-btn block text color="error"
                        ><v-icon left>mdi-file-pdf-box</v-icon> pdf</v-btn
                      >
                      <v-btn block text color="primary"
                        ><v-icon>mdi-printer</v-icon> print</v-btn
                      >
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>
              <div></div>
            </v-col>
            <v-col cols="12" sm="12">
              <v-card>
                <v-data-table
                  :headers="headers"
                  :items="getRow"
                  :search="search"
                  :items-per-page="10"
                  class="elevation-1"
                  :loading="loading"
                >
                  <template #[`item.profile`]="{ item }">
                    <div>
                      <v-img :src="`${item.profile}`" width="60"></v-img>
                    </div>
                  </template>
                  <template #[`item.createdAt`]="{ value }">
                    {{ value | DateToText }}
                  </template>
                  <template #[`item.updatedAt`]="{ value }">
                    {{ value | DateToText }}
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isLoading: false,
        loading: false,
        viewLoading: false,
        search: '',
        showDialog: '',
        headers: [
          { text: 'ລຳດັບ', value: 'index' },
          { text: 'ຮູບ', value: 'profile' },
          { text: 'ລະຫັດສິນຄ້າ', value: 'Barcode' },
          { text: 'ຊື່', value: 'name' },
          { text: 'ປະເພດ', value: 'category' },
          { text: 'ຈຳນວນ', value: 'quantity' },
          { text: 'ລາຄາຊື້', value: 'cost_price' },
          { text: 'ລາຄາຂາຍ', value: 'sale_price' },
          { text: 'ວັນທີສ້າງ', value: 'createdAt' },
          { text: 'ອັບເດດເມື່ອ', value: 'updatedAt' },
        ],
      }
    },
    computed: {
      getRow() {
        return this.$store.state.product.StateSelectAll.map((item, index) => {
          return {
            index: index + 1,
            ...item,
          }
        })
      },
    },
    async mounted() {
      try {
        this.loading = true
        await this.$store.dispatch('product/selectAll')
        this.loading = false
      } catch (error) {
        this.$toast.success('error!')
      }
    },
  }
  </script>
  
  <style lang="scss" scoped>
  .my-swal-container {
    padding: 25px;
    margin: 25px;
  }
  </style>
  