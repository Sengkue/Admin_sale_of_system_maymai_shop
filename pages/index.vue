<template>
  <div>
    <v-row>
      <v-col cols="12"></v-col>
      <v-col cols="12" sm="3" lg="3">
        <v-card
          v-ripple="{ class: `green--text` }"
          elevation="2"
          class="white--text pa-2"
          style="
            background: linear-gradient(to right, #5e1b1b, #e60000);
            cursor: pointer;
          "
        >
          <div class="d-flex justify-space-between align-center">
            <div
              class="py-2 text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
            >
              <h3 style="color: #e0f7fa">ລາຍຮັບທັງໝົດ</h3>
              <span>{{
                cardImcome ? '350,000,000 ກິບ' : '50,000,000 ກິບ'
              }}</span>
            </div>
            <div>
              <v-icon color="white" size="50">mdi-wallet-giftcard</v-icon>
            </div>
          </div>
          <v-divider class="white mt-n2 mb-1"></v-divider>
          <div class="d-flex">
            <v-icon v-ripple color="white" @click="Income()">{{
              `mdi-arrow-${cardImcome ? 'down' : 'up'}-circle-outline`
            }}</v-icon>
            <div>{{ cardImcome ? 'ພາຍໃນປີ' : 'ພາຍໃນເດືອນ' }}</div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3" lg="3" md="3">
        <v-card
          v-ripple="{ class: `green--text` }"
          elevation="2"
          class="white--text pa-2"
          style="background: linear-gradient(120deg, #6b7012, #ebff0b)"
        >
          <div class="d-flex justify-space-between align-center">
            <div
              class="py-2 text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
            >
              <h3 style="color: #e0f7fa">ລາຍຈ່າຍທັງໝົດ</h3>
              <span>{{
                cardExpenses ? '120,000,000 ກິບ' : '50,000,000 ກິບ'
              }}</span>
            </div>
            <div>
              <v-icon color="white" size="50"
                >mdi-credit-card-multiple-outline</v-icon
              >
            </div>
          </div>
          <v-divider class="white mt-n2 mb-1"></v-divider>
          <div class="d-flex">
            <v-icon v-ripple color="white" @click="Expenses()">{{
              `mdi-arrow-${cardExpenses ? 'down' : 'up'}-circle-outline`
            }}</v-icon>
            <div>{{ cardExpenses ? 'ພາຍໃນປີ' : 'ພາຍໃນເດືອນ' }}</div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3" lg="3">
        <v-card
          v-ripple="{ class: `green--text` }"
          elevation="2"
          class="white--text pa-2"
          style="background: linear-gradient(120deg, #1a7e27, #09ff19)"
        >
          <div class="d-flex justify-space-between align-center">
            <div
              class="py-2 text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
            >
              <h3 style="color: #e0f7fa">ກຳໄລທັງໝົດ</h3>
              <span>{{
                cardProfit ? '120,000,000 ກິບ' : '50,000,000 ກິບ'
              }}</span>
            </div>
            <div>
              <v-icon color="white" size="50">mdi-chart-bar</v-icon>
            </div>
          </div>
          <v-divider class="white mt-n2 mb-1"></v-divider>
          <div class="d-flex">
            <v-icon v-ripple color="white" @click="Profit()">{{
              `mdi-arrow-${cardProfit ? 'down' : 'up'}-circle-outline`
            }}</v-icon>
            <div>{{ cardProfit ? 'ພາຍໃນປີ' : 'ພາຍໃນເດືອນ' }}</div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3" lg="3">
        <v-card
          v-ripple="{ class: `green--text` }"
          elevation="2"
          class="white--text pa-2"
          style="background: linear-gradient(to right, #63145e, #ff10d7)"
        >
          <div class="d-flex justify-space-between align-center">
            <div
              class="py-2 text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
            >
              <h3 style="color: #e0f7fa">ສະຕ໋ອກສິນຄ້າທັງໝົດ</h3>
              <span>500</span>
            </div>
            <div>
              <v-icon color="white" size="50">mdi-newspaper</v-icon>
            </div>
          </div>
          <v-divider class="white mt-n2 mb-1"></v-divider>
          <div class="d-flex">
            <v-icon color="white">mdi-check-decagram</v-icon>
            <div>ຕັ້ງແຕ່ຕົ້ນ</div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mb-5 mt-0">
      <v-col v-ripple="{ class: `green--text` }" cols="12" sm="3" lg="3">
        <v-card
          elevation="2"
          class="white--text pa-2"
          style="background: linear-gradient(to right, #5e1b5d, #ff0cdb)"
        >
          <div class="d-flex justify-space-between align-center">
            <div
              class="py-2 text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
            >
              <h3 style="color: #e0f7fa">ລູກຄ້າທັງໝົດ</h3>
              <span>12,000 ຄົນ</span>
            </div>
            <div>
              <v-icon color="white" size="50">mdi-account-group</v-icon>
            </div>
          </div>
          <v-divider class="white mt-n2 mb-1"></v-divider>
          <div class="d-flex">
            <v-icon color="white">mdi-arrow-up-circle-outline</v-icon>
            <div>ຕັ້ງແຕ່ຕົ້ນ</div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3" lg="3" md="3">
        <v-card
          v-ripple="{ class: `green--text` }"
          elevation="2"
          class="white--text pa-2"
          style="background: linear-gradient(to right, #1b5e2c, #0eff12)"
        >
          <div class="d-flex justify-space-between align-center">
            <div
              class="py-2 text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
            >
              <h3 style="color: #e0f7fa">ໃບບິນຍົກເລີກ</h3>
              <span>59 </span>
            </div>
            <div>
              <v-icon color="white" size="50">mdi-account-group</v-icon>
            </div>
          </div>
          <v-divider class="white mt-n2 mb-1"></v-divider>
          <div class="d-flex">
            <v-icon color="white">mdi-arrow-up-circle-outline</v-icon>
            <div>ຕັ້ງແຕ່ຕົ້ນ</div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3" lg="3">
        <v-card
          v-ripple="{ class: `green--text` }"
          elevation="2"
          class="white--text pa-2"
          style="background: linear-gradient(to right, #5c5e1b, #fff70e)"
        >
          <div class="d-flex justify-space-between align-center">
            <div
              class="py-2 text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
            >
              <h3 style="color: #e0f7fa">ໃບບິນສັ່ງຊື້ໃໝ່</h3>
              <!-- <h2 class="flashing-ligh" :class="animateClass">{{ 0 }}</h2> -->
              <h2>0</h2>
            </div>
            <div>
              <v-icon color="white" size="50">mdi-cash-multiple</v-icon>
            </div>
          </div>
          <v-divider class="white mt-n2 mb-1"></v-divider>
          <div class="d-flex">
            <v-icon color="white">mdi-arrow-up-circle-outline</v-icon>
            <div>ພາຍໃນເດືອນນີ້</div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3" lg="3">
        <v-card
          v-ripple="{ class: `green--text` }"
          elevation="2"
          class="white--text pa-2"
          style="background: linear-gradient(to right, #5e1b1b, #e60000)"
        >
          <div class="d-flex justify-space-between align-center">
            <div
              class="py-2 text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
            >
              <h3 style="color: #e0f7fa">ຮ້ານຄ້າແຍກທັງໝົດ</h3>
              <span>{{ 0 }}</span>
            </div>
            <div>
              <v-icon color="white" size="50">mdi-store-outline</v-icon>
            </div>
          </div>
          <v-divider class="white mt-n2 mb-1"></v-divider>
          <div class="d-flex">
            <v-icon color="white" larg>mdi-check-decagram</v-icon>
            <div>ຕັ້ງແຕ່ຕົ້ນ</div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row no-gutters justify="center">
      <!-- <v-row no-gutters>
      <v-col cols="12" md="4" class="px-2 py-1">
        <v-card elevation="1">
          <bar :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
            :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
        </v-card>
      </v-col>
      <v-col cols="12" md="4" class="px-2 py-1">
        <v-card elevation="1">
          <pie :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
            :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
        </v-card>
      </v-col>
      <v-col cols="12" md="4" class="px-2 py-1">
        <v-card>
          <Doughnut :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId"
            :dataset-id-key="datasetIdKey" :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width"
            :height="height" />
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="4" class="px-2 py-1">
        <v-card>
          <line :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
            :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
        </v-card>
      </v-col>
    </v-row> -->
      <!-- <v-col cols="12" >
        <Map></Map>
      </v-col> -->
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'PieChart',
  components: {},
  props: {
    chartId: {
      type: String,
      default: 'pie-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: '',
      type: String,
    },

    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // chartData: {
      //   labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs', 'nodejs'],
      //   datasets: [
      //     {
      //       backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#00D855'],
      //       data: [40, 20, 80, 10, 5]
      //     }
      //   ]
      // },
      // chartOptions: {
      //   responsive: true,
      //   maintainAspectRatio: false
      // },
      // center: { lat: 17.974855, lng: 102.630867 },
      // markers: [],
      // currentPlace: null
      cardImcome:false,
      cardExpenses:false,
      cardProfit:false,
    }
  },
  computed: {},
  // watch: {
  //   markers(val) {
  //     this.center = {
  //       lat: parseFloat(val.lat),
  //       lng: parseFloat(val.lng),

  //     }
  //     console.log(val)
  //   }
  // },

  // mounted() {
  //   this.geolocate();
  // },

  methods: {
    // +++++++++++++++++++++++++++++ card
    Income() {
      this.cardImcome = !this.cardImcome
    },
    Expenses() {
      this.cardExpenses = !this.cardExpenses
    },
    Profit() {
      this.cardProfit = !this.cardProfit
    },
    Stock() {
      this.cardStock = !this.cardStock
    },
  },
}
</script>
