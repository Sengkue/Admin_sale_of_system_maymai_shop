<template>
  <div>
    <v-row >
          <v-col cols="12" sm="3" lg="3" v-ripple="{ class: `green--text` }">
            <v-card
              elevation="2"
              class="white--text pa-2"
              style="background: linear-gradient(to right, #1b5e20, #00e676)"
            >
              <div class="d-flex justify-space-between align-center">
                <div
                  class="py-2 text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
                >
                  <h3 style="color: #e0f7fa">ລາຍຮັບທັງໝົດ</h3>
                  <span>120,000,000 ກິບ</span>
                </div>
                <div >
                  <v-icon color="white" size="40">mdi-wallet-giftcard</v-icon>
                </div>
              </div>
              <v-divider class="white mt-n2 mb-1" ></v-divider>
              <div class="d-flex">
                <v-icon color="white">mdi-arrow-down-circle-outline</v-icon>
                <div>Dialy Orders</div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="3" lg="3" md="3">
            <v-card
              elevation="2"
              v-ripple="{ class: `green--text` }"
              class="white--text pa-2"
              style="background: linear-gradient(120deg, #880e4f, #ff80ab)"
            >
            <div class="d-flex justify-space-between align-center">
                <div
                  class="py-2 text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
                >
                  <h3 style="color: #e0f7fa">ລາຍຈ່າຍທັງໝົດ</h3>
                  <span>50,000,000 ກິບ</span>
                </div>
                <div >
                  <v-icon color="white" size="40">mdi-credit-card-multiple-outline</v-icon>
                </div>
              </div>
              <v-divider class="white mt-n2 mb-1" ></v-divider>
              <div class="d-flex">
                <v-icon color="white">mdi-arrow-up-circle-outline</v-icon>
                <div>Less Sales</div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="3" lg="3">
            <v-card
              v-ripple="{ class: `green--text` }"
              elevation="2"
              class="white--text pa-2"
              style="background: linear-gradient(120deg, #1a237e, #82b1ff)"
            >
            <div class="d-flex justify-space-between align-center">
                <div
                  class="py-2 text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
                >
                  <h3 style="color: #e0f7fa">ກຳໄລທັງໝົດ</h3>
                  <span>70,000,000 ກິບ</span>
                </div>
                <div >
                  <v-icon color="white" size="40">mdi-chart-bar</v-icon>
                </div>
              </div>
              <v-divider class="white mt-n2 mb-1" ></v-divider>
              <div class="d-flex">
                <v-icon color="white">mdi-exclamation-thick</v-icon>
                <div>From Last MOnth</div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="3" lg="3">
            <v-card
              v-ripple="{ class: `green--text` }"
              elevation="2"
              class="white--text pa-2"
              style="background: linear-gradient(to right, #e65100, #ffcc80)"
            >
            <div class="d-flex justify-space-between align-center">
                <div
                  class="py-2 text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
                >
                  <h3 style="color: #e0f7fa">ສະຕ໋ອກສິນຄ້າທັງໝົດ</h3>
                  <span>500</span>
                </div>
                <div >
                  <v-icon color="white" size="40">mdi-newspaper</v-icon>
                </div>
              </div>
              <v-divider class="white mt-n2 mb-1" ></v-divider>
              <div class="d-flex">
                <v-icon color="white">mdi-check-decagram</v-icon>
                <div>Recent History</div>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="mb-5 mt-0">
          <v-col cols="12" sm="3" lg="3" v-ripple="{ class: `green--text` }">
            <v-card
              elevation="2"
              class="white--text pa-2"
              style="background: linear-gradient(to right, #1b5e20, #00e676)"
            >
              <div class="d-flex justify-space-between align-center">
                <div
                  class="py-2 text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
                >
                  <h3 style="color: #e0f7fa">ລູກຄ້າທັງໝົດ</h3>
                  <span>12,000 ຄົນ</span>
                </div>
                <div >
                  <v-icon color="white" size="40">mdi-account-group</v-icon>
                </div>
              </div>
              <v-divider class="white mt-n2 mb-1" ></v-divider>
              <div class="d-flex">
                <v-icon color="white">mdi-arrow-up-circle-outline</v-icon>
                <div>Dialy Orders</div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="3" lg="3" md="3">
            <v-card
              elevation="2"
              v-ripple="{ class: `green--text` }"
              class="white--text pa-2"
              style="background: linear-gradient(120deg, #880e4f, #ff80ab)"
            >
            <div class="d-flex justify-space-between align-center">
                <div
                  class="py-2 text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
                >
                  <h3 style="color: #e0f7fa">ຜູ້ສະໜອງທັງໝົດ</h3>
                  <span>59 </span>
                </div>
                <div >
                  <v-icon color="white" size="40">mdi-account-group</v-icon>
                </div>
              </div>
              <v-divider class="white mt-n2 mb-1" ></v-divider>
              <div class="d-flex">
                <v-icon color="white">mdi-arrow-up-circle-outline</v-icon>
                <div>Less Sales</div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="3" lg="3">
            <v-card
              v-ripple="{ class: `green--text` }"
              elevation="2"
              class="white--text pa-2"
              style="background: linear-gradient(120deg, #1a237e, #82b1ff)"
            >
            <div class="d-flex justify-space-between align-center">
                <div
                  class="py-2 text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
                >
                  <h3 style="color: #e0f7fa">ໃບບິນສັ່ງຊື້ທັງໝົດ</h3>
                  <span>12,000</span>
                </div>
                <div >
                  <v-icon color="white" size="40">mdi-cash-multiple</v-icon>
                </div>
              </div>
              <v-divider class="white mt-n2 mb-1" ></v-divider>
              <div class="d-flex">
                <v-icon color="white">mdi-exclamation-thick</v-icon>
                <div>From Last MOnth</div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="3" lg="3">
            <v-card
              v-ripple="{ class: `green--text` }"
              elevation="2"
              class="white--text pa-2"
              style="background: linear-gradient(to right, #e65100, #ffcc80)"
            >
            <div class="d-flex justify-space-between align-center">
                <div
                  class="py-2 text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
                >
                  <h3 style="color: #e0f7fa">ໃບບິນຂາຍສິນຄ້າທັງໝົດ</h3>
                  <span>500</span>
                </div>
                <div >
                  <v-icon color="white" size="40">mdi-cash-multiple</v-icon>
                </div>
              </div>
              <v-divider class="white mt-n2 mb-1" ></v-divider>
              <div class="d-flex">
                <v-icon color="white">mdi-check-decagram</v-icon>
                <div>Recent History</div>
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
  components: {

  },
  props: {
    chartId: {
      type: String,
      default: 'pie-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },

    styles: {
      type: Object,
      default: () => { }
    },
    plugins: {
      type: Array,
      default: () => []
    }
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
    }
  },
  computed: {
   
  },
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
    // addMarker(event) {
    //   const marker = {
    //     lat: parseFloat(event.latLng.lat()),
    //     lng: parseFloat(event.latLng.lng()),
    //   };
    //   console.log(marker);
    //   this.markers.push(marker);
    //   this.$refs.mmm.panTo(marker);
    //   this.currentPlaces = null;
    // },
    // setPlace(place) {
    //   this.currentPlace = place;
    // },

  }

}
</script>
