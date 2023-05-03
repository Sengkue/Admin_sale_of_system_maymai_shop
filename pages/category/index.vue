<template>
  <div>
    <v-card flat>
      <v-row justify="center" class="mt-4">
        <h2>ຈັດການຂໍ້ມູນປະເພດສິນຄ້າ</h2>
      </v-row>
      <!-- <v-divider class="mt-12"></v-divider> -->
      <v-card-text>
        <v-data-table :headers="headers" :items="items" :search="search">
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title>ລາຍຊື່ປະເພດສິນຄ້າ</v-toolbar-title>
              <v-divider inset vertical class="mx-4"></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template #activator="{ on, attrs }">
                  <v-btn class="mt-n5" color="primary" dark v-bind="attrs" v-on="on">
                    <v-icon left>mdi-plus</v-icon> ເພີ່ມ
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-text-field  v-model="search" outlined append-icon="mdi-magnify" class="mt-4" placeholder="ຄົ້ນຫາ" dense
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
                          <v-text-field  v-model="editItem.category_name"  label="ຊື່ປະເພດສິນຄ້າ"  dense outlined  required
                            :rules="[
                              (val) => !!val || 'ກະລຸນາປ້ອນຊື່ປະເພດສິນຄ້າ.',
                            ]"/>
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
          </template>
          <template #[`item.actions`]="{ item }">
            <v-row no-gutters justify="end">
              <v-btn color="#dc3455" dark small class="mr-2" @click="deleteAction(item)">
                <v-icon left>mdi-delete</v-icon>
                ລືບ</v-btn>
              <v-btn color="#28a745" dark small @click="editAction(item)">
                <v-icon left>mdi-pen</v-icon>
                ແກ້ໄຂ</v-btn>
            </v-row>
          </template>

        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editItem: {},
      editIndex: -1,
      search: '',
      valid: false,
      dialog: false,
      headers: [
        {
          text: 'ລຳດັບ',
          value: 'id'
        },
        {
          text: 'ຊື່ປະເພດສິນຄ້າ',
          value: 'category_name'
        },
        {
          text: 'ຂະໜາດ',
          value: 'size'
        },
        {
          text: 'Actions',
          value: 'actions'
        },

      ],
      items: [
        {
          id: '1',
          category_name: 'ເສື້ອຍາວ',
          size: 'S'
        },
        {
          id: '2',
          category_name: 'ເສື້ອກັດໜາວ',
          size: 'L'
        },
        {
          id: '3',
          category_name: 'ສົນຂາຍາວ',
          size: 'L'
        }
      ]

    }
  },
  computed: {
    formTitle() {
      return this.editIndex === -1 ? "ເພີ່ມຂໍ້ມູນ" : "ແກ້ໄຂຂໍ້ມູນ"
    }
  },
  methods: {
    openDialog() {
      this.dialog = true
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editItem = Object.assign({}, null)
        this.editIndex = -1;
      })
    },
    editAction(list) {
      this.editedIndex = this.item.indexOf(list);
      this.editItem = Object.assign({}, list);
      this.dialog = true;
    }
  }
}
</script>

<!-- <style scoped>
@font-face {
  font-family: 'Noto-Sans-Lao';
  src: url('../assets/fonts/NotoSansLao-Regular.ttf') format('ttf'),
  local('Noto-Sans-Lao');
}

*{
  font-family: 'NotoSansLao-Regular' !important;
}

.main {
  background-color: #e0e5eb;
  color: black;
}
</style>
 -->
