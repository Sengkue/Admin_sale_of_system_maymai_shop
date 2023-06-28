<template>
  <div>
    <v-card flat>
      <v-row justify="center" class="mt-4">
        <h2>ຈັດການຂໍ້ມູນປະເພດສິນຄ້າ</h2>
      </v-row>
      <!-- <v-divider class="mt-12"></v-divider> -->
      <v-card-text>
        <v-data-table :headers="headers" :items="getCategory" :search="search">
          <template #top>
            <v-toolbar flat>
              <!-- <v-toolbar-title>ລາຍຊື່ປະເພດສິນຄ້າ</v-toolbar-title> -->
              <!-- <v-divider inset vertical class="mx-4"></v-divider> -->
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template #activator="{ on, attrs }">
                  <v-btn
                    class="mt-n5"
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click=";(title = 'ເພີ່ມປະເພດ'), (hideBtn = 0)"
                  >
                    <v-icon left>mdi-plus</v-icon> ເພີ່ມປະເພດ
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search"
                    outlined
                    append-icon="mdi-magnify"
                    class="mt-4"
                    placeholder="ຄົ້ນຫາ"
                    clearable
                    clear-icon="mdi-close-circle-outline"
                    dense
                  ></v-text-field>
                </template>

                <v-card>
                  <v-toolbar dense color="primary" dark>
                    <v-row justify="center">
                      {{ title }}
                    </v-row>
                  </v-toolbar>
                  <v-card-text>
                    <v-form v-model="valid">
                      <v-row justify="center" class="mt-3">
                        <v-col cols="12" class="mb-n5">
                          <v-text-field
                            v-model="category"
                            label="ຊື່ປະເພດສິນຄ້າ"
                            dense
                            outlined
                            required
                            clearable
                            clear-icon="mdi-close-circle-outline"
                            :rules="[
                              (val) => !!val || 'ກະລຸນາປ້ອນຊື່ປະເພດສິນຄ້າ.',
                            ]"
                          />
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      v-show="hideBtn === 0"
                      class="btn-hover white--text"
                      color="blue"
                      :loading="loading"
                      :disabled="category == ''"
                      @click="insert()"
                    >
                      <v-icon>mdi-check</v-icon>
                      ບັນທຶກ
                    </v-btn>
                    <v-btn
                      v-show="hideBtn === 1"
                      class="btn-hover white--text"
                      color="blue"
                      :loading="loading"
                      :disabled="category == ''"
                      @click="update()"
                    >
                      <v-icon>mdi-check</v-icon>
                      ອັດເດດ
                    </v-btn>

                    <v-btn
                      class="btn-hover white--text"
                      color="red"
                      @click="close"
                    >
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
              <v-btn
                color="#dc3455"
                dark
                small
                class="mr-2"
                @click="deleteItem(item.id)"
              >
                <v-icon left>mdi-delete</v-icon>
                ລືບ</v-btn
              >
              <v-btn color="#28a745" dark small @click="edit(item)">
                <v-icon left>mdi-pen</v-icon>
                ແກ້ໄຂ</v-btn
              >
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
      category: '',
      loading: false,
      hideBtn: '',
      headers: [
        {
          text: 'ລຳດັບ',
          value: 'index',
        },
        {
          text: 'ຊື່ປະເພດສິນຄ້າ',
          value: 'category',
        },
        {
          text: 'Actions',
          value: 'actions',
        },
      ],
      title: '',
      categoryId: '',
    }
  },
  computed: {
    getCategory() {
      const allCategory = this.$store.state.category.Allcategory
      if (allCategory && allCategory.rows) {
        return allCategory.rows.map((item, index) => {
          return {
            index: index + 1,
            ...item,
          }
        })
      } else {
        return []
      }
    },
  },

  mounted() {
    this.$store.dispatch('category/selectCategory')
  },
  methods: {
    edit(item) {
      this.categoryId = item.id
      this.category = item.category
      this.dialog = true
      this.hideBtn = 1
      this.title = 'update category'
    },
    async update() {
      this.loading = true
      const updateId = this.categoryId
      const data = {
        category: this.category,
      }
      await this.$store.dispatch('category/update', { updateId, data })
      setTimeout(() => {
        this.loading = false
      this.dialog = false
        this.$store.dispatch('category/selectCategory')
        this.category = ''
      }, 1000)
    },

    async deleteItem(id) {
      await this.$swal
        .fire({
          title: 'ທ່ານແນ່ໃຈບໍ?',
          text: `ທີ່ຈະຍົກເລີກຂໍ້ມູນລາຍການນີ້!`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ຢືນຢັນລືບ!',
          cancelButtonText: 'ຍົກເລີກ',
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.loading = true
            await this.$axios.delete(`/category/${id}`)
            await this.$store.dispatch('category/selectCategory')

            this.loading = false
            this.$swal.fire({
              title: 'ລືບສຳເລັດ!',
              text: 'ຂໍ້ມູນໄດ້ຖືກລືບສຳເລັດ.',
              icon: 'success',
              confirmButtonText: 'OKAY',
              customClass: {
                container: 'my-swal-container',
              },
            })
          }
        })
    },
    async insert() {
      const data = {
        category: this.category,
      }
      await this.$store.dispatch('category/insert', data)
      await this.$store.dispatch('category/selectCategory')
      this.dialog = false
      this.category = ''
    },
    openDialog() {
      this.dialog = true
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editItem = Object.assign({}, null)
        this.editIndex = -1
      })
    },
    editAction(list) {
      this.editedIndex = this.item.indexOf(list)
      this.editItem = Object.assign({}, list)
      this.dialog = true
    },
  },
}
</script>
