<template>
  <v-card class="elevation-1">
    <v-row >
      <h3 class="mt-7 mb-5 ml-5">ສັ່ງຊື້ອອນໄລ >> ລາຍການສັ່ງຊື້ໃໝ່</h3>
    </v-row>
    <v-row class="my-5 mt-n11 d-flex justify-center">
      <v-badge color="error" :content="getTypeAndStatus.length">
        <h2>ລາຍການສັ່ງຊື້ສິນຄ້າໃໝ່</h2>
      </v-badge>
    </v-row>
    <v-divider></v-divider>
    <v-tabs-items v-model="tabs">
      <!-- ______________________________________1________________________________ -->
      <v-tab-item>
        <v-data-table
          :search="newsearch"
          :headers="newHeaders"
          :items="getStory"
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
              <v-toolbar-title>ລາຍການສັ່ງຊື້ສິນຄ້າ</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider
              ><v-spacer></v-spacer>
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
          <!-- <template #[`item.actions`]="{ item }">
        <v-icon large color="#C51162" @click="editeItem(item)">
          mdi-check-decagram
        </v-icon>
        <v-icon large color="primary" @click="viewItem(item)"> mdi-cart-check </v-icon>
      </template> -->
        </v-data-table>
      </v-tab-item>
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
                <v-toolbar-title>ລາຍການສັ່ງຊື້ສິນຄ້າ</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider
                ><v-spacer></v-spacer>
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
              <!-- <v-icon large color="green" @click="editeItem(item)">
                mdi-check-decagram
              </v-icon> -->
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
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
      <!-- _______________________________________________________-333-_______________________________________ -->
      <v-tab-item>
        <!-- v-if="Todal > 0" -->
        <v-card class="elevation-0">
          <v-row no-gutters class="justify-center ma-3 ml-1">
            <v-col cols="12" md="2" class="align-center">
              <v-card width="100%" height="52" class="ma-1 pa-3">
                <h4>
                  ໃບບີນ: <span>{{ editList.order_id }}</span>
                </h4>
              </v-card>
            </v-col>
            <v-col cols="12" md="3" class="align-center">
              <v-card width="100%" height="52" class="ma-1 pa-3">
                <h4>
                  ຜູ້ສັ່ງຊື້:<span> {{ editList.full_name }}</span>
                </h4>
              </v-card>
            </v-col>
            <v-col cols="12" md="2" class="align-center">
              <v-card width="100%" height="52" class="ma-1 pa-3">
                <h4>
                  ສ່ວນຫຼຸດ: <span> {{ discount }}</span
                  >%
                </h4>
              </v-card>
            </v-col>
            <v-col cols="12" md="5" class="align-center">
              <v-card width="100%" height="52" class="ma-1 pa-3">
                ຄອມເມັ້ນ: <span>{{ editList.customer_content }}</span>
              </v-card>
            </v-col>
          </v-row>
          <v-data-table
            :headers="recievedetailHeader"
            :items="editList.orderDetail"
            hide-default-footer
            class="elevation-2 mx-2"
          >
          </v-data-table>
        </v-card>
        <!-- <v-row v-else class="ma-5 justify-center">
            <h1 style="color: green">...ບໍ່ມີຂໍ້ມູນ...</h1></v-row
          > -->
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
    headers: [
      { text: 'ລໍາດັບ', value: 'idx' },
      {
        text: 'ໃບສັ່ງຊື້',
        align: 'start',
        value: 'order_id',
      },
      { text: 'ພະນັກງານ', value: 'emp_name' },
      { text: 'ຜູ້ສັ່ງຊື້', value: 'full_name' },
      { text: 'ເບີ້ໂທ', value: 'customer_tel' },
      { text: 'ອີມິວ', value: 'customer_email' },
      { text: 'ວັນທີ່ສັ່ງຊື້', value: 'order_date' },
      // { text: "ເວລາສັ່ງຊື້", value: "order_time" },
      { text: 'ສ່ວນຫຼຸດ', value: 'discount' },
      { text: 'ເມັ້ນຂອງລູກຄ້າ', value: 'customer_content' },
      { text: 'ໃຫ້ຄໍາແນະນໍາ', value: 'receive_content' },
      { text: 'ລາຍລະອຽດ', value: 'data-table-expand' },
    ],
    detailHeader: [
      { text: 'ລໍາດັບ', value: 'idx' },
      {
        text: 'ຮູບ',
        align: 'center',
        sortable: false,
        value: 'image',
      },
      { text: 'ຊື່ສິນຄ້າ', value: 'pro_name' },
      { text: 'ປະເພດ', value: 'category' },
      { text: 'ສີ', value: 'color' },
      { text: 'ຂະໜາດ', value: 'size' },
      { text: 'ຈໍານວນ', value: 'qty' },
      { text: 'ລາຄາ(ກິບ)', value: 'price' },
      { text: 'ລາຄາລວມ(ກິບ)', value: 'price*qty' },
    ],
    newHeaders: [
      { text: 'ລໍາດັບ', value: 'idx' },
      { text: 'ຜູ້ສັ່ງຊື້', value: 'customerName' },
      { text: 'ເບີ້ໂທ', value: 'customerPhone' },
      // { text: "ອີມິວ", value: "customer_email" },
      { text: 'ວັນທີ່ສັ່ງຊື້', value: 'sale_date' },
      // { text: "ເວລາສັ່ງຊື້", value: "order_time" },
      // { text: "ຈ່າຍຜ່ານ", value: "pay_method" },
      // { text: "ເມັ້ນຂອງລູກຄ້າ", value: "customer_content" },
      // { text: "ສ່ວນຫຼຸດ", value: "discount" },
      { text: 'ຮັບສັ່ງຊື້', value: 'actions' },
      // { text: "ລາຍລະອຽດ", value: "data-table-expand" },
    ],
    newdetailHeader: [
      { text: 'ລໍາດັບ', value: 'idx' },
      {
        text: 'ຮູບ',
        align: 'center',
        sortable: false,
        value: 'image',
      },
      { text: 'ຊື່ສິນຄ້າ', value: 'pro_name' },
      { text: 'ປະເພດ', value: 'category' },
      { text: 'ສີ', value: 'color' },
      { text: 'ຂະໜາດ', value: 'size' },
      { text: 'ຈໍານວນ', value: 'qty' },
      { text: 'ລາຄາ(ກິບ)', value: 'price' },
      { text: 'ລາຄາລວມ(ກິບ)', value: 'price*qty' },
    ],
    recievedetailHeader: [
      { text: 'ລໍາດັບ', value: 'idx' },
      {
        text: 'ຮູບ',
        sortable: false,
        value: 'image',
      },
      { text: 'ຊື່ສິນຄ້າ', value: 'pro_name' },
      { text: 'ປະເພດ', value: 'category' },
      { text: 'ສີ', value: 'color' },
      { text: 'ຂະໜາດ', value: 'size' },
      { text: 'ຈໍານວນ', value: 'qty' },
      { text: 'ຫົວໜ່ວຍ', value: 'unit' },
      { text: 'ລາຄາ(ກິບ)', value: 'price' },
      { text: 'ລາຄາລວມ(ກິບ)', value: 'price*qty' },
      { text: 'ລົບອອກ', value: 'actions', align: 'center', sortable: false },
    ],
  }),

  computed: {
    getTypeAndStatus() {
      return this.$store.state.sale.TypeAndStatus
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
