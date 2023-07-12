<template>
  <div>
    <v-row>
      <v-card width="100%" class="teal">
        <v-card-text class="text-center white--text">
          <h1 class="mt-3 pt-2">
            ລາຍການສັ່ງຊື້ໃໝ່
            <v-chip close-icon="mdi-close-outline" class="red white--text mt-n9 ml-n2">{{ getTypeAndStatus.length }}</v-chip>
          </h1>
        </v-card-text>
      </v-card>
    </v-row>

    <v-row justify="center">
      <v-expansion-panels accordion>
        <v-expansion-panel v-for="(item, i) in getTypeAndStatus" :key="i">
          <v-expansion-panel-header>
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex align-center">
                <div> {{ item.index }}</div>
                <v-divider vertical class="mx-5"></v-divider>
                <div>ຊື່: {{ item.customerName }}</div>
                <v-divider vertical class="mx-5"></v-divider>
                <div>
                  ເບີ້ໂທລະສັບ: {{ item.customerPhone }}
                  <a
                    :href="getWhatsAppChatURL(item.customerPhone)"
                    target="_blank"
                  >
                    <v-btn icon color="primary">
                      <v-icon>mdi-whatsapp</v-icon>
                    </v-btn>
                  </a>
                </div>
                <v-divider vertical class="mx-5"></v-divider>
                <div>ວັນທີ່ສັ່ງຊື້: {{ formatDateLo(item.sale_date) }}</div>
              </div>
              <div>
                <v-btn
                  text
                  color="primary"
                  elevation="0"
                  @click="viewDetail(item.id)"
                  >ເບິ່ງລາຍລະອຽດ</v-btn
                >
              </div>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-data-table
              :headers="newdetailHeader"
              :items="getDetail"
              item-key="idx"
            >
              <template #[`item.profile`]="{ value }">
                <v-icon v-if="!value" color="primary" large
                  >mdi-file-image-remove</v-icon
                >
                <v-img v-else :src="value" width="50" height="50"></v-img>
              </template>
              <template #top>
                <div class="d-flex align-center justify-space-between">
                  <h3 class="mb-0">ລາຍລະອຽດການສັ່ງຊື້</h3>
                  <div>
                    <v-btn class="green white--text">ຢືນຢັນການສັ່ງຊື່</v-btn>
                  </div>
                </div>
              </template>
              <template #[`item.total`]="{ item }">
                {{ item.sale_price * item.quantity }}
              </template>
              <template #bottom>
                <div>
                  sdfsdfsdfsdfsdfsdfsd
                </div>
              </template>
            </v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'AdminSaleOfSystemMaymaiShopSuccess',

  data() {
    return {
      newHeaders: [
        { text: 'ລໍາດັບ', value: 'index' },
        { text: 'ຜູ້ສັ່ງຊື້', value: 'customerName' },
        { text: 'ເບີ້ໂທ', value: 'customerPhone' },
        { text: 'ວັນທີ່ສັ່ງຊື້', value: 'sale_date' },
        // { text: "ຮັບສັ່ງຊື້", value: "actions" },
        { text: 'ລາຍລະອຽດ', value: 'data-table-expand' },
      ],
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
      return this.$store.state.sale.TypeAndStatus.map((item, index) => {
        return {
          index: index + 1,
          ...item,
        }
      })
    },
    getDetail() {
      return this.$store.state.saleDetail.StateSelectOne.map((item, index) => {
        return { index: index + 1, ...item }
      })
    },
  },

  mounted() {
    this.$store.dispatch('sale/selectByTypeAndStatus')
  },

  methods: {
    viewDetail(id) {
      this.$store.dispatch('saleDetail/selectBySaleId', id)
    },
    getWhatsAppChatURL(phoneNumber) {
      const formattedPhoneNumber = phoneNumber.replace(/\D/g, '')
      const message = encodeURIComponent(
        `Hello, we are contacting you from KChange company. Here is the link or URL: https://www.example.com`
      )
      const whatsappURL = `https://wa.me/${formattedPhoneNumber}?text=${message}`
      return whatsappURL
    },
  },
}
</script>
