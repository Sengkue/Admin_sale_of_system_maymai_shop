<template>
    <v-card class="elevation-0">
      <v-row justify="center">
        <h2 class="mt-5 mb-5">ຈັດການຂໍ້ມູນຜູ້ສະໜອງ</h2>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="suplier"
        :search="search"
        item-key="idx"
        sort-by="name"
        class="elevation-2 table"
      >
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>ຈັດການຂໍ້ມູນຜູ້ສະໜອງ</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              outlined
              v-model="search"
              append-icon="mdi-magnify"
              label="ຄົ້ນຫາ"
              single-line
              hide-details
              dense
            >
            </v-text-field>
            <v-spacer></v-spacer>
            <v-btn
              class="mb-2"
              style="font-size: 17px; font-weight: bold"
              color="primary"
              to="supplier/add"
            >
              <v-icon large>mdi-plus</v-icon>
              ເພີ່ມຜູ້ສະໜອງ
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
        </template>
  
        <template v-slot:item="{ item }">
          <tr v-ripple="{ class: `white--text` }">
            <td>{{ item.idx }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.tel }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.address }}</td>
            <td>
              <v-row>
                <v-icon @click="EditSuplier(item)" class="mr-2" color="primary"
                  >mdi-pencil</v-icon
                >
                <v-icon color="red" @click="DeleteSuplier(item)"
                  >mdi-trash-can-outline</v-icon
                >
              </v-row>
            </td>
          </tr>
        </template>
      </v-data-table>
  
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card rounded>
          <v-card-title class="headline justify-center"
            >Delete suplier</v-card-title
          >
          <v-divider class></v-divider>
          <v-card-text>Are you sure you want to delete this item?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="closeDelete">Cancel</v-btn>
            <v-btn color="green accent-3" text @click="deleteSuplierConfirm"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </template>
  <script>
  export default {
    data() {
      return {
        search: '',
        dialogDelete: false,
        deleteItem: [],
        headers: [
          { text: 'ລໍາດັບ', value: 'idx' },
          { text: 'ຊື່ຜູ້ສະໜອງ', value: 'name' },
          { text: 'ເບີ້ໂທ', value: 'tel' },
          { text: 'ອີເມວ', value: 'email' },
          { text: 'ທີ່ຢູ່', value: 'address' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        suplier: [
          {
            idx: '1',
            name: 'tou',
            tel: '02097181800',
            email: 'touyang@gmail.com',
            address: 'dongdork',
          },
        ],
      }
    },
    EditSuplier(item) {
      this.$router.push(`edite/${item.sup_id}`)
    },
  }
  </script>