<template>
  <div>
    <div>
      <v-card class="px-5">
        <v-row>
          <v-col cols="12" sm="12">
            <div class="d-flex justify-center">
              <v-card class="px-5 py-2" elevation="0">
                <h2>ຈັດການຂໍ້ມນຜູ້ສະໜອງ</h2>
              </v-card>
            </div>
          </v-col>
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
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                v-model="search"
                  prepend-inner-icon="mdi-magnify"
                  label="ຄົ້ນຫາ"
                  outlined
                  hide-details
                  clearable
                  dense
                  small
                  class="box2"
                >
                </v-text-field></v-col
              >
              <v-col cols="12" sm="6">
                <div class="d-flex justify-end">
                  <v-btn class="mt-1" color="teal" dark @click="Insert"
                    ><v-icon>mdi-plus-box</v-icon>ເພີ່ມໃໝ່</v-btn
                  >
                </div>
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
                    <v-img
                      :src="`${item.profile}`"
                      width="60"
                    ></v-img>
                  </div>
                </template>
                <template #[`item.createdAt`]="{ value }">
                  {{ value | DateToText }}
                </template>
                <template #[`item.updatedAt`]="{ value }">
                  {{ value | DateToText }}
                </template>
                <template #[`item.actions`]="{ item }">
                    <v-tooltip top color="red">
                      <template #activator="{ on }">
                        <v-btn
                          icon
                          text
                          color="red"
                          @click="deleteItem(item.id)"
                          v-on="on"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </template>
                      Delete
                    </v-tooltip>

                    <v-tooltip top color="green">
                      <template #activator="{ on }">
                        <v-btn
                          class=" mx-n3"
                          icon
                          text
                          color="green"
                          @click="edit(item)"
                          v-on="on"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      Edit
                    </v-tooltip>

                    <v-tooltip top color="blue">
                      <template #activator="{ on }">
                        <v-btn
                          color="blue"
                          text
                          icon
                          @click="viewDetail(item)"
                          v-on="on"
                        >
                          <v-icon>mdi-eye</v-icon>
                        </v-btn>
                      </template>
                      View
                    </v-tooltip>
                  </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <div v-if="getEdit">
      <productEditproduct />
    </div>
    <div v-if="getView">
      <productViewproduct />
    </div>
    <div v-if="getInsert">
      <productInsertproduct />
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
        { text: "ລຳດັບ", value: "index" },
        { text: "ຮູບ", value: "profile" },
        { text: "Barcode", value: "Barcode" },
        { text: "ຊື່", value: "name" },
        { text: "ປະເພດ", value: "category" },
        { text: "ຈຳນວນ", value: "quantity" },
        { text: "ລາຄາຊື້", value: "cost_price" },
        { text: "ລາຄາຂາຍ", value: "sale_price" },
        // { text: "ຜູ້ສະໜອງ", value: "supplier_name" },
        // { text: "ຄຳອະທິບາຍ", value: "description" },
        { text: "Create", value: "createdAt" },
        { text: "updatedAt", value: "updatedAt" },
        { text: "Actions", value: "actions" },
      ],
    };
  },
  computed: {
    getRow() {
      return this.$store.state.product.StateSelectAll.map((item, index) => {
        return {
          index: index + 1,
          ...item,
        };
      });
    },
    getEdit() {
      return this.$store.state.product.edit;
    },
    getView() {
      return this.$store.state.product.view;
    },
    getInsert() {
      return this.$store.state.product.insert;
    },
    getOneUser() {
      return this.$store.state.product.StateSelectOne;
    },
  },
  async mounted() {
    try {
      this.loading = true;
      await this.$store.dispatch("product/selectAll");
      this.loading = false;
    } catch (error) {
      this.$toast.success("error!");
    }
  },

  methods: {
    async deleteItem(item) {
      const deleteId = item;
      await this.$swal
        .fire({
          title: "ທ່ານແນ່ໃຈບໍ?",
          text: `ທີ່ຈະລືບຂໍ້ມູນລາຍການນີ້!`,
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
            await this.$store.dispatch("product/delete", { deleteId });
            await this.$store.dispatch("product/selectAll");

            this.loading = false;
            this.$swal.fire({
              title: "ລືບສຳເລັດ!",
              text: "ຂໍ້ມູນໄດ້ຖືກລືບແລ້ວ.",
              icon: "success",
              confirmButtonText: "OKAY",
              customClass: {
                container: "my-swal-container",
              },
            });
          }
        });
    },
    async viewDetail(item) {
      this.isLoading = true;
      const id = item.id;
      await this.$store.dispatch("product/selectOne", { id });
      this.$store.commit("product/setView", true);
      this.isLoading = false;
    },
    async edit(item) {
      this.isLoading = true;
      const id = item.id;
      await this.$store.dispatch("product/selectOne", { id });
      this.$store.commit("product/setEdit", true);
      this.$store.dispatch('province/selectProvince')
    this.$store.dispatch('district/selectDistrict')
      this.isLoading = false;
    },
    Insert() {
      this.$router.push('/product/add')
    },
  },
};
</script>

<style lang="scss" scoped>
.my-swal-container {
  padding: 25px;
  margin: 25px;
}
</style>
