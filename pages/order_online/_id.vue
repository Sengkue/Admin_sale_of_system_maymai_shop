<template>
  <div>
    <v-row class="px-5">
      <v-col cols="12" class="d-flex justify-space-between align-center mt-2">
        <h1 class="pl-5">ລາຍການສັ່ງຊື້</h1>
        <div>
          <v-btn class="red white--text" small to="/order_online">
            <v-icon>mdi-arrow-left-circle</v-icon>
            ກັບຄືນ
          </v-btn>
        </div>
      </v-col>
      <v-col cols="4" class="pl-8">
        <h3>ລາຍລະອຽດຜູ້ສຳຊື້</h3>
        <div v-if="getTypeAndStatus.customer">
          <div class="my-2">
            ຊື່ ແລະ ນານສະກຸນ: {{ getTypeAndStatus.customer.c_fname }}
          </div>
          <div class="my-2">
            ເບີ້ໂທຜູ້ສັ່ງຊື້: {{ getTypeAndStatus.customer.c_phone }}
          </div>
          <div class="my-2">
            ວັນທີ່ສັ່ງຊື້: {{ formatDateLo(getTypeAndStatus.sale_date) }}
          </div>
        </div>
        <div v-else class="my-2">
          <p>Loading customer details...</p>
        </div>
      </v-col>

      <v-col cols="4">
        <v-img
          v-if="getTypeAndStatus.payment"
          :src="getTypeAndStatus.payment"
          width="100px"
          @click="openImageDialog = true"
          class="cursor-pointe"
        ></v-img>
        <v-img
          v-else
          src="/images/logo.png"
          width="100px"
          @click="openImageDialog = true"
          class="cursor-pointe"
        ></v-img>
      </v-col>
      <v-col cols="4">
        <div v-if="getTypeAndStatus.location">
          <h3>ທີຢູ່:</h3>
          <div class="my-2">ແຂວງ: {{ getTypeAndStatus.location.province }}</div>
          <div class="my-2">
            ເມືອງ: {{ getTypeAndStatus.location.district }}
          </div>
          <div class="my-2">ບ້ານ: {{ getTypeAndStatus.location.village }}</div>
          <div class="my-2">ສາຂາ: {{ getTypeAndStatus.location.express }}</div>
          <div class="my-2">ທີຢູ່ {{ getTypeAndStatus.location.address }}</div>
        </div>
        <div v-else>
          <p>Loading customer details...</p>
        </div>
      </v-col>
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
      <v-col cols="12">
        <!-- _______________________________table show details_____________________________ -->
        <div v-if="getDetail">
          <v-data-table :headers="newdetailHeader" :items="getDetail">
            <template #[`item.profile`]="{ value }">
              <v-icon v-if="!value" color="primary" large
                >mdi-file-image-remove</v-icon
              >
              <v-img v-else :src="value" width="50" height="50"></v-img>
            </template>
            <template #top>
              <div class="d-flex align-center justify-space-between">
                <div>
                  <h3 class="mb-0">ລາຍລະອຽດການສັ່ງຊື້</h3>
                </div>
                <div class="d-flex align-center justify-space-between">
                  <div v-if="getTypeAndStatus.customer">
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn color="green">
                          <a
                            :class="custom - link"
                            style="text-decoration: none; color: white"
                            v-if="getTypeAndStatus.customer.c_phone"
                            :href="
                              'https://wa.me/' +
                              '+856' +
                              getTypeAndStatus.customer.c_phone
                                .replace(/\s+/g, '')
                                .substr(0) +
                              '?text=ສະບາຍດີເຈົ້າ ພວກເຮົາຕິດຕໍ່ຈາກ iPay...ເດີ້. ເຫັນທ່ານສັ່ງຊື້ເຄື່ອງໃນiPay...ສະນັ້ນ, ລົບກວນທ່ານສົ່ງທີ່ຢູ່ ຫຼື ທ່ານສະດວກຮັບເຄື່ອງຜ່ານບໍລິສັດຂົນສົ່ງ, ສາຂາໃດເຈົ້າ' +
                              ' ແລະ ລົບກວນທ່ານຊ່ວຍຊຳລະຄ່າເຄື່ອງຜ່ານ QR ທີ່ອອກຊື່ເປັນ itcapital ລຸ່ມນີ້ດ້ວຍເຈົ້າ ' +
                              `https://ibb.co/my5062w`
                            "
                            target="_blank"
                            v-on="on"
                          >
                            {{ getTypeAndStatus.customer.c_phone }}
                            <v-icon class="my-icon" size="25" color="white"
                              >mdi-whatsapp</v-icon
                            >
                          </a>
                        </v-btn>
                      </template>
                      <span>ແຈ້ງໃຫ້ລຸກຄ້າຮູ້ວ່າສິນຄ້າກຳລັງອານຸມັດຈັດສົ່ງ</span>
                      <!-- Replace "Tooltip text" with your desired tooltip content -->
                    </v-tooltip>
                  </div>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn class="primary white--text" v-on="on" @click="comfirm()">
                        ຢືນຢັນການສັ່ງຊື່
                      </v-btn>
                    </template>
                    <span>ຢືນຢັນການສັ່ງຊື່</span>
                    <!-- Replace with your tooltip content -->
                  </v-tooltip>
                </div>
              </div>
            </template>
            <template #[`item.total`]="{ item }">
              {{ item.sale_price * item.quantity }}
            </template>
          </v-data-table>
        </div>
        <div v-else>
          <v-data-table :headers="newdetailHeader"></v-data-table>
        </div>
      </v-col>
    </v-row>
    <!-- ________________________dialog show image payment______________________________ -->
    <v-dialog v-model="openImageDialog" max-width="500px">
      <v-card>
        <v-img
          v-if="getTypeAndStatus.payment"
          :src="getTypeAndStatus.payment"
          width="100%"
        ></v-img>
        <v-img v-else src="/images/logo.png" width="100%"></v-img>
        <v-card-actions class="justify-end">
          <v-btn color="primary" text @click="openImageDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'AdminSaleOfSystemMaymaiShopId',

  data() {
    return {
      openImageDialog: false,
      newdetailHeader: [
        { text: 'ລໍາດັບ', value: 'index' },
        {
          text: 'ຮູບ',
          align: 'center',
          sortable: false,
          value: 'profile',
        },
        { text: 'ຊື່ສິນຄ້າ', value: 'productName' },
        { text: 'ປະເພດ', value: 'productName' },
        { text: 'ສີ', value: 'color' },
        { text: 'ຂະໜາດ', value: 'size_id' },
        { text: 'ຈໍານວນ', value: 'quantity' },
        { text: 'ລາຄາ(ກິບ)', value: 'sale_price' },
        { text: 'ລາຄາລວມ(ກິບ)', value: 'total' },
      ],
    }
  },
  computed: {
    getTypeAndStatus() {
      return this.$store.state.sale.saleOnline
    },
    getDetail() {
      return this.$store.state.saleDetail.StateSelectOne.map((item, index) => {
        return { index: index + 1, ...item }
      })
    },
  },
  mounted() {
    this.$store.dispatch('sale/selectSaleOnlineById', this.$route.params.id)
    this.$store.dispatch('saleDetail/selectBySaleId', this.$route.params.id)
  },

  methods: {
    viewDetail(id) {},
    comfirm(){
      this.$store.dispatch('sale/updateStatus', this.$route.params.id)
    }
  },
}
</script>

<style lang="scss" scoped>
.cursor-pointe {
  cursor: pointer;
}

.custom-link {
  color: blue;
  text-decoration: none;
}

.custom-link:hover {
  color: red;
  text-decoration: underline;
}
</style>
