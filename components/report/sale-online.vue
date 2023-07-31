<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-dialog
          ref="startDialog"
          v-model="startModal"
          :return-value.sync="startDate"
          persistent
          width="290px"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="startDate"
              label="Start Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="startDate" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="startModal = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.startDialog.save(startDate)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>

        <v-dialog
          ref="endDialog"
          v-model="endModal"
          :return-value.sync="endDate"
          persistent
          width="290px"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="endDate"
              label="End Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="endDate" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="endModal = false">
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="$refs.endDialog.save(endDate)">
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>
      <v-col cols="9" class="d-flex justify-end">
        <v-card class="mb-2 teal white--text">
          <div class="pa-10">
            <div class="d-flex">
              <h3 class="mr-1">ລວມເງິນທັງໝົດ:</h3>
              <span> {{ formatPrice(totalSaleTotal) }} ກີບ</span>
            </div>
            <div class="d-flex">
              <h3 class="mr-1">ລວມຈຳນວນທັງໝົດ:</h3>
              <span> {{ formatPrice(totalSaleQuantity) }}</span>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- :items="filteredSalesData" -->
    <v-data-table
      :headers="newHeaders"
      :items="salesData"
      :search="newSearch"
      class="elevation-3"
      item-key="id"
    >
      <template #[`item.sale_date`]="{ value }">
        <div>{{ formatDateBill(value) }}</div>
      </template>
      <template #[`item.sale_total`]="{ value }">
        {{ formatPrice(value) }} ກີບ
      </template>
      <template #[`item.actions`]="{ item }">
        <div>
          <v-btn text small @click="review(item.id)"
            ><v-icon>mdi-eye</v-icon></v-btn
          >
        </div>
      </template>
    </v-data-table>

    <!-- ______________________dialog___________________ -->
    <v-dialog v-model="dialog" max-width="1000">
      <!-- _______________________________table show details_____________________________ -->
      <div v-if="getDetail">
        <v-data-table :headers="newdetailHeader" :items="getDetail">
          <template #[`item.profile`]="{ value }">
            <v-icon v-if="!value" color="primary" large
              >mdi-file-image-remove</v-icon
            >
            <v-img v-else :src="value" width="50" height="50"></v-img>
          </template>
          <template #[`items.`]>
            <div></div>
          </template>
          <template #top>
            <div class="d-flex align-center justify-space-between">
              <div>
                <h3 class="pa-2">ລາຍລະອຽດການສັ່ງຊື້</h3>
              </div>
              <div class="d-flex align-center justify-space-between mt-n2">
                <v-tooltip top>
                  <template #activator="{ on }">
                    <v-btn
                      text
                      class="red white--text"
                      v-on="on"
                      @click="dialog = false"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </template>
                  <span>ປິດ</span>
                </v-tooltip>
              </div>
            </div>
          </template>
          <template #[`item.total`]="{ item }">
            {{ formatPrice(item.sale_price * item.quantity) }} ກີບ
          </template>
          <template #[`item.sale_price`]="{ item }">
            {{ formatPrice(item.sale_price) }} ກີບ
          </template>
        </v-data-table>
      </div>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startModal: false,
      endModal: false,
      startDate: null,
      endDate: null,
      newSearch: null,
      newHeaders: [
        { text: 'ລະຫັດໃບບິນ', value: 'id' },
        { text: 'ຊື່ລູກຄ້າ', value: 'customerName' },
        { text: 'ເບີລູກຄ້າ', value: 'customerPhone' },
        { text: 'ຈຳນວນ', value: 'sale_quantity' },
        { text: 'ຈຳນວນເງິນ', value: 'sale_total' },
        { text: 'ວັນທີຊື້', value: 'sale_date' },
        { text: 'ລາຍລະອຽດ', value: 'actions' },
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
      loading: false,
      getDetail: [],
      dialog: false,
      salesData: [], // This will hold the data from the API
    }
  },
  computed: {
    filteredSalesData() {
      // Apply filtering based on the selected date range and other criteria
      if (this.startDate && this.endDate) {
        const start = new Date(this.startDate)
        const end = new Date(this.endDate)
        return this.salesData.filter(
          (item) =>
            new Date(item.sale_date) >= start && new Date(item.sale_date) <= end
        )
      } else {
        return this.salesData
      }
    },
    totalSaleTotal() {
      return this.salesData.reduce((total, item) => {
        return total + item.sale_total
      }, 0)
    },
    totalSaleQuantity() {
      return this.salesData.reduce((total, item) => {
        return total + item.sale_quantity
      }, 0)
    },
  },
  created() {
    // Set default start date to yesterday
    // const currentDate = new Date();
    // currentDate.setDate(currentDate.getDate() - 1);
    // Subtract 1 day
    // this.startDate = currentDate.toISOString().slice(0, 10);

    // Set default end date to today
    this.startDate = new Date().toISOString().slice(0, 10)
    this.endDate = new Date().toISOString().slice(0, 10)

    // Fetch initial sales data using the default start and end dates
    this.fetchFilteredSalesData()
  },
  watch: {
    startDate: 'fetchFilteredSalesData',
    endDate: 'fetchFilteredSalesData',
  },
  mounted() {
    this.fetchSalesData()
  },
  methods: {
    review(id) {
      this.dialog = true
      this.$axios
        .get(`/saleDetail/sale/${id}`)
        .then((data) => {
          this.getDetail = data.data.result.map((item, index) => {
            return { index: index + 1, ...item }
          })
        })
        .catch((error) => {
          this.$toast.error('ບໍ່ມີຂໍ້ມູນ!', error)
          this.getDetail = []
        })
    },
    fetchSalesData() {
      // Fetch the data from the API
      fetch(
        `http://localhost:8080/sale/sales/status-type-date?sale_status=completed&sale_type=online&startDate=${this.startDate}&endDate=${this.endDate}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Store the fetched data in the salesData array
          this.salesData = data.result
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    },

    fetchFilteredSalesData() {
      if (this.startDate && this.endDate) {
        fetch(
          `http://localhost:8080/sale/sales/status-type-date?sale_status=completed&sale_type=online&startDate=${this.startDate}&endDate=${this.endDate}`
        )
          .then((response) => response.json())
          .then((data) => {
            this.salesData = data.result
          })
          .catch((error) => {
            console.error('Error fetching data:', error)
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
