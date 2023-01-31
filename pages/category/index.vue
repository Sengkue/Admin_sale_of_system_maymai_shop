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
                  <v-dialog v-model="dialog" max-width="500px" >
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
                            label="ຊື່ປະເພດສິນຄ້າ"
                            v-model="editItem.category_name"
                            required
                            :rules="[
                              (val) => !!val || 'ກະລຸນາປ້ອນຊື່ປະເພດສິນຄ້າ.',
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
             </template>
             <template #[`item.actions`] = {item}>
              <v-icon left color="green" small @click="editAction=(item)">mdi-pen</v-icon>
              <v-icon color="error" small @click="deleteAction=(item)">mdi-delete</v-icon>
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
                    text: 'Actions',
                    value: 'actions'
                },

            ],
            items: [
                {
                    id: '1',
                    category_name: 'ເສື້ອຍາວ'
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
                this.editItem = Object.assign({},null)
                this.editIndex = -1;
            })
        },
        editAction(list) {
         this.editIndex = this.items.indexOf(list);
         this.editItem = Object.assign({},list)
         this.dialog = true
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
