<template>
  <v-card class="elevation-1">
    <v-row>
      <h3 class="mt-7 mb-5 ml-5">ສັ່ງຊື້ອອນໄລ >> ລາຍການສັ່ງຊື້ໃໝ່</h3>
    </v-row>
    <v-row class="my-5 mt-n11 d-flex justify-center">
      <v-badge
        v-if="getTypeAndStatus.length > 0"
        color="error"
        :content="getTypeAndStatus.length"
      >
        <h2>ລາຍການສັ່ງຊື້ສິນຄ້າໃໝ່</h2>
      </v-badge>
      <h2 v-else>ລາຍການສັ່ງຊື້ສິນຄ້າໃໝ່</h2>
    </v-row>
    <v-divider></v-divider>
    <v-tabs-items v-model="tabs">
      <v-tab-item> </v-tab-item>
      <!-- _______________________________________________________________-2-___________________________________ -->
      <v-tab-item>
        <v-card flat>
          <v-data-table
            :search="newsearch"
            :headers="newHeaders"
            :items="getTypeAndStatus"
            :single-expand="true"
            :expanded.sync="newexpanded"
            item-key="idx"
            show-expand
            class="elevation-3"
          >
            <template #[`item.sale_date`]="{ value }">
              <div>
                {{ formatDateLo(value) }}
              </div>
            </template>
            <template #top>
              <v-toolbar flat>
                <v-text-field
                  v-model="newsearch"
                  append-icon="mdi-magnify"
                  label="ຄົ້ນຫາຂໍ້ມູນ"
                  single-line
                  outlined
                  dense
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>
            <template #[`item.actions`]="{ item }">
              <v-tooltip bottom color="green">
                <template #activator="{ on, attrs }">
                  <v-icon
                    large
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    @click="viewItem(item)"
                  >
                    mdi-cart-check
                  </v-icon>
                </template>
                <span>ກວດສອບ ແລະ ຢືນຢັນ</span>
              </v-tooltip>
              <v-tooltip bottom color="error">
                <template #activator="{ on, attrs }">
                  <v-icon
                    large
                    color="error"
                    v-bind="attrs"
                    v-on="on"
                    @click="deleteItem(item.id)"
                  >
                    mdi-close-outline
                  </v-icon>
                </template>
                <span>ຍົກເລີກລາຍການສັ່ງຊື້</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    tabs: 1,
    text: '',
    dialog: false,
    search: '',
    newsearch: '',
    dialogDelete: false,
    expanded: [],
    newexpanded: [],
    editList: [],
    discount: 0,
    deleteList: [],
    newHeaders: [
      { text: 'ລໍາດັບ', value: 'index' },
      { text: 'ຜູ້ສັ່ງຊື້', value: 'customerName' },
      { text: 'ເບີ້ໂທ', value: 'customerPhone' },
      { text: 'ວັນທີ່ສັ່ງຊື້', value: 'sale_date' },
      { text: 'ຮັບສັ່ງຊື້', value: 'actions' },
    ],
  }),

  computed: {
    getTypeAndStatus() {
      return this.$store.state.sale.TypeAndStatus.map((item, index) => {
        return { index: index + 1, ...item }
      })
    },
  },
  watch: {
    dialog(val) {
      val || this.closeDelete()
    },
  },
  mounted() {
    this.$store.dispatch('sale/selectByTypeAndStatus', {
      type: 'online',
      status: 'pending',
    })
  },
  methods: {
    viewItem(item) {
      this.$router.push('/order_online/' + item.id)
    },
    deleteItem(id) {
      this.$swal
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
            await this.$axios.delete(`/sale/${id}`)
            await this.$store.dispatch('sale/selectByTypeAndStatus', {
              type: 'online',
              status: 'pending',
            })
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
  },
}
</script>
<style lang="scss" scoped>
.tcenter {
  width: 200px;
  min-width: 100px;
}
.tcenter >>> input {
  text-align: center;
}
</style>
