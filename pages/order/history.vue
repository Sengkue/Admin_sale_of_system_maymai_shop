<template>
  <div>
    <!-- :items="import_history" -->
    <v-data-table
      :headers="Headers"
      :items="getOrder"
      show-expand
      :search="search"
      single-expand
      :expanded.sync="expanded"
      class="elevation-1"
    >
      <template #[`item.employeeName`]="{ item }">
        <div v-if="item.employeeName === null">
          <div class="primary--text">ເຈົ້າຂອງຮ້ານ</div>
        </div>
        <div v-else>{{ item.employeeName }}</div>
      </template>
      <template #top>
        <v-row justify="center">
          <h2 class="mt-5 mb-7">ປະຫວັດນໍາເຂົ້າສິນຄ້າ</h2>
        </v-row>
        <v-divider></v-divider>
        <div>
          <v-toolbar flat>
            <v-toolbar-title>ປະຫວັດນໍາເຂົ້າສິນຄ້າ</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider
            ><v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="ຄົ້ນຫາ"
              single-line
              outlined
              dense
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>

            <router-link to="/order">
              <v-btn
                class="mx-2"
                style="font-size: 17px; font-weight: bold"
                color="primary"
              >
                <v-icon large> mdi-plus </v-icon>
                ສັ່ງຊື້ສິນຄ້າ
              </v-btn>
            </router-link>
          </v-toolbar>
          <v-divider></v-divider>
          <v-divider></v-divider>
        </div>
      </template>
      <template #[`item.order_date`]="{ item }">
        <div>
          {{ formatDateLo(item.order_date) }}
        </div>
      </template>
      <template #[`item.status`]="{ item }">
        <div v-if="item.status == 'pending'" class="red--text">
          {{ item.status }}...
        </div>
        <div v-if="item.status == 'completed'" class="green--text">
          {{ item.status }}
        </div>
      </template>

      <template #[`item.actions`]="{ item }">
        <v-icon
          class="mr-2"
          color="blue"
          @click="
            $store.commit('order_detail/setOrderId', item.id),
              $router.push('/import')
          "
        >
          mdi-cart-check
        </v-icon>
        <v-icon
          class="mr-2"
          color="blue"
          @click="$router.push('/order/bill/' + item.id)"
        >
          mdi-eye
        </v-icon>
        <v-icon color="error" :loading="loading" @click="deleteItem(item.id)">mdi-close</v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading:false,
      search: '',
      expanded: [],
      Headers: [
        {
          text: 'ລໍາດັບ',
          value: 'index',
        },
        {
          text: 'ໃບນໍາເຂົ້າວັດຖຸດິບ',
          value: 'id',
        },
        { text: 'ພະນັກງານ', align: 'center', value: 'employeeName' },
        { text: 'status', align: 'center', value: 'status' },

        { text: 'ວັນທີ່ສັ່ງຊື້', align: 'center', value: 'order_date' },
        { text: 'actions', value: 'actions' },
      ],
      detaillist: [],
      detail: [],
    }
  },
  computed: {
    getOrder() {
      return this.$store.state.order.Allorder.map((item, index) => {
        return {
          index: index + 1,
          ...item,
        }
      })
    },
  },
  mounted() {
    this.$store.dispatch('order/selectAll')
  },
  methods: {
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
            await this.$axios.delete(`/order/${id}`)
             this.$store.dispatch('order/selectAll')
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
