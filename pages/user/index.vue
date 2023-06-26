<template>
  <div>
    <div>
      <v-card class="px-5">
        <v-row>
          <v-col cols="12" sm="12">
            <v-card class="py-2 px-5 teal text-center" dark>
              <h2>ຈັດການຂໍ້ມູນຜູ້ໃຊ້</h2>
            </v-card>
          </v-col>
          <v-col v-if="isLoading" cols="12" sm="12">
            <div class="d-flex justify-center">
              <v-progress-circular color="teal" indeterminate :size="40" :width="5"></v-progress-circular>
            </div>
          </v-col>

          <v-col cols="12" sm="12" class="mt-2">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field v-model="search" label="ຄົ້ນຫາ" small outlined hide-details clearable
                  prepend-inner-icon="mdi-magnify" dense>
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <div class="d-flex justify-end">
                  <v-btn class="mt-1" color="teal" dark @click="Insert()">
                    <v-icon>mdi-plus-box</v-icon>
                    ເພີ່ມໃໝ່
                  </v-btn>

                </div>
              </v-col>
            </v-row>
            <div></div>
          </v-col>
          <v-col cols="12" sm="12">
            <v-card>
              <v-data-table :headers="headers" :items="getRow" :search="search" :items-per-page="10" :loading="loading"
                class="elevation-1">
                <template #[`item.profile`]="{ item }">
                  <div>
                    <img v-if="item.owner && item.owner.profile" :src="item.owner.profile" alt="Profile Image" width="80"
                      height="80" />
                    <div v-if="item.owner ===  null && item.employee ===  null"><v-icon large color="error">mdi-account-remove</v-icon></div>
                    <img v-if="item.employee && item.employee.profile" :src="item.employee.profile" alt="Profile Image"
                      width="80" height="80" />
                  </div>
                </template>
                <template #[`item.name`]="{ item }">
                  <div>
                    <div v-if="item.owner && item.owner.firstName">{{ item.owner.firstName }}</div>
                    <div v-if="item.employee && item.employee.firstName">{{ item.employee.firstName }}</div>

                  </div>
                </template>

                <template #[`item.createdAt`]="{ value }">
                  {{ formatDate(value) }}
                </template>
                <template #[`item.actions`]="{ item }">
                  <v-tooltip top color="red">
                    <template #activator="{ on }">
                      <v-btn class="ma-n1" icon text color="red" @click="deleteItem(item.id)" v-on="on">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                    Delete
                  </v-tooltip>

                  <v-tooltip top color="green">
                    <template #activator="{ on }">
                      <v-btn class="ma-n1" icon text color="green" @click="edit(item.id)" v-on="on">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    Edit
                  </v-tooltip>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <div v-if="getEdit">
      <userEditUsers />
    </div>
    <div v-if="getView">
      <userView />
    </div>
    <div v-if="getInsert">
      <UserInsertUsers />
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
      search: "",
      showDialog: "",
      headers: [
        { text: "#", value: "index" },
        { text: "Profile", value: "profile" },
        { text: "name", value: "name" },
        { text: "phone", value: "phone" },
        { text: "STATUS", value: "status" },
        { text: "Create", value: "createdAt" },
        { text: "Actions", value: "actions" },
      ],

    };
  },
  computed: {
    getRow() {
      const { result } = this.$store.state.user.AllUser;

      if (result) {
        return result.map((item, index) => {
          return {
            index: index + 1,
            ...item
          };
        });
      }

      return [];
    },

    getEdit() {
      return this.$store.state.user.edit;
    },
    getView() {
      return this.$store.state.user.view;
    },
    getInsert() {
      return this.$store.state.user.insert;
    },
    getAllUser() {
      return this.$store.state.user.StateSelectAll;
    },
  },
  mounted() {
    this.$store.dispatch('user/selectUser')
  },

  methods: {
    async deleteItem(item) {
      await this.$swal
        .fire({
          title: "ທ່ານແນ່ໃຈບໍ?",
          text: `ທີ່ຈະຍົກເລີກຂໍ້ມູນລາຍການນີ້!`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ຢືນຢັນລືບ!",
          cancelButtonText: "ຍົກເລີກ",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.loading = true;
            await this.$axios.delete(`/user/${item}`);
            await this.$store.dispatch('user/selectUser')
            this.loading = false;
            this.$swal.fire({
              title: "ລືບສຳເລັດ!",
              text: "ຂໍ້ມູນໄດ້ຖືກລືບສຳເລັດ.",
              icon: "success",
              confirmButtonText: "OKAY",
              customClass: {
                container: "my-swal-container",
              },
            });
          }
        });
    },

    async edit(id) {
      this.isLoading = true;
      await this.$store.dispatch("user/selectOne",id);
      await this.$store.dispatch('employee/selectEmployee')
      await this.$store.dispatch('owner/selectOwner')
      this.$store.commit("user/setEdit", true);
      this.isLoading = false;
    },
    async Insert() {
      this.isLoading = false;
      await this.$store.commit("user/setInsert", true);
      await this.$store.dispatch('employee/selectEmployee')
      await this.$store.dispatch('owner/selectOwner')
      this.isLoading = false;
    },
  },
};
</script>
  
<style lang="scss" scoped></style>
  