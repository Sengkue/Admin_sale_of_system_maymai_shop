<template>
  <div>
    <v-card flat>
      <v-row justify="center" class="mt-2">
        <h2>ຈັດການຂໍ້ມູນພະນັກງານ</h2>
      </v-row>
      <v-card-text>
        <v-data-table :headers="headers" :items="getEmployee" :search="search">
          <template #[`item.profile`]="{ value }">
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

              <v-btn color="primary" to="/employee/add">
                <v-icon>mdi-plus</v-icon>
                ເພີ່ມພະນັກງານ
              </v-btn>
            </v-toolbar>
          </template>
          <template #[`item.actions`]="{ item }">
            <v-row no-gutters justify="end">
              <v-btn
                color="#dc3455"
                dark
                small
                class="mr-2"
                @click="deleteAction(item.id)"
              >
                <v-icon left>mdi-delete</v-icon>
                ລືບ</v-btn
              >
              <v-btn color="#28a745" dark small @click="editAction(item)">
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
      headers: [
        {
          text: 'ລຳດັບ',
          value: 'index',
        },
        {
          text: 'ຮູບພາບ',
          value: 'profile',
        },
        {
          text: 'ຊື່',
          value: 'firstName',
        },
        {
          text: 'ນາມສະກຸນ',
          value: 'lastName',
        },
        {
          text: 'ເພດ',
          value: 'gender',
        },
        {
          text: 'ເບີ',
          value: 'phone',
        },
        {
          text: 'ເເຂວງ',
          value: 'province',
        },
        {
          text: 'ເມືອງ',
          value: 'district',
        },
        {
          text: 'ບ້ານ',
          value: 'village',
        },

        {
          text: 'ຈັດການ',
          value: 'actions',
        },
      ],
    }
  },
  computed: {
    getEmployee() {
      const allEmployee = this.$store.state.employee.AllEmployee
      if (allEmployee) {
        return allEmployee.map((item, index) => {
          return {
            index: index + 1,
            ...item,
          }
        })
      }
      return []
    },
  },
  mounted() {
    this.$store.dispatch('employee/selectEmployee')
  },
  methods: {
    async deleteAction(id) {
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
            await this.$axios.delete(`employee/${id}`)
            await this.$store.dispatch('employee/selectEmployee')

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
    editAction(item) {
      this.$router.push(`employee/${item.id}`)
    },
  },
}
</script>
