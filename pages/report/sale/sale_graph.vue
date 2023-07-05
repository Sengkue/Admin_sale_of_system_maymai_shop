<template>
  <div>
    <v-row>
      <v-col cols="8">
        <v-row>
          <v-col cols="12">
            <div class="d-flex justify-space-between">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Picker in menu"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    filled
                    dense
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
              <div class="mx-5 mt-2">
                <v-icon large>mdi-arrow-right-thin</v-icon>
              </div>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Picker in menu"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    dense
                    filled
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>

              <v-btn
                large
                class="primary"
                style="height: 53px; margin-left: 10px"
                >ສ້າງລາຍງານ</v-btn
              >
            </div>
          </v-col>
          <v-col cols="12" class="px-2 py-1">
            <v-card elevation="1">
              <bar
                :chart-options="chartOptions"
                :chart-data="chartData"
                :chart-id="chartId"
                :dataset-id-key="datasetIdKey"
                :plugins="plugins"
                :css-classes="cssClasses"
                :styles="styles"
                :width="width"
                :height="height"
              />
            </v-card>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-row no-gutters>
            <!-- <v-col cols="12" md="4" class="px-2 py-1">
                <v-card elevation="1">
                  <pie
                    :chart-options="chartOptions"
                    :chart-data="chartData"
                    :chart-id="chartId"
                    :dataset-id-key="datasetIdKey"
                    :plugins="plugins"
                    :css-classes="cssClasses"
                    :styles="styles"
                    :width="width"
                    :height="height"
                  />
                </v-card>
              </v-col> -->
          </v-row>
        </v-row></v-col
      >
      <v-col cols="4">
        <v-row>
          <v-col cols="12">
            <v-card
              elevation="2"
              v-ripple="{ class: `green--text` }"
              class="white--text pa-2"
              style="background: linear-gradient(to right, #5e1b1b, #e60000)"
            >
              <div class="d-flex justify-space-between align-center">
                <div>
                  <v-icon color="white" size="40"
                    >mdi-chart-line-variant</v-icon
                  >
                </div>
                <div
                  class="py-2 text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
                >
                  <h3 style="color: #e0f7fa">ລາຍຮັບ</h3>
                  <span>120,000ກິບ</span>
                </div>
              </div>
              <v-divider class="white mt-n2 mb-1"></v-divider>
              <div class="d-flex">
                <v-icon color="white">mdi-arrow-up-circle-outline</v-icon>
                <div>ເພີ່ມຂື່ນ</div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card
              elevation="2"
              v-ripple="{ class: `green--text` }"
              class="white--text pa-2"
              style="background: linear-gradient(to right, #5e391b, #e69600)"
            >
              <div class="d-flex justify-space-between align-center">
                <div>
                  <v-icon color="white" size="40"
                    >mdi-chart-line-variant</v-icon
                  >
                </div>
                <div
                  class="py-2 text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
                >
                  <h3 style="color: #e0f7fa">ລາຍຈ່າຍ</h3>
                  <span>120,000 ກິບ</span>
                </div>
              </div>
              <v-divider class="white mt-n2 mb-1"></v-divider>
              <div class="d-flex">
                <v-icon color="white">mdi-arrow-up-circle-outline</v-icon>
                <div>ເພີ່ມຂື່ນ</div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card
              elevation="2"
              v-ripple="{ class: `green--text` }"
              class="white--text pa-2"
              style="background: linear-gradient(to right, #1b365e, #0064e6)"
            >
              <div class="d-flex justify-space-between align-center">
                <div>
                  <v-icon color="white" size="40"
                    >mdi-chart-line-variant</v-icon
                  >
                </div>
                <div
                  class="py-2 text-caption text-sm-body-2 text-md-body-1 text-lg-h6"
                >
                  <h3 style="color: #e0f7fa">ກຳໄລ</h3>
                  <span>80,000,000ກິບ</span>
                </div>
              </div>
              <v-divider class="white mt-n2 mb-1"></v-divider>
              <div class="d-flex">
                <v-icon color="white">mdi-arrow-up-circle-outline</v-icon>
                <div>ເພີ່ມຂື່ນ</div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'IShopAdminIndex',
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
      default: 540,
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
      date: new Date().toISOString().substr(0, 7),
      menu: false,
      chartData: {
        labels: [
          'phone',
          'shose',
          'Tshirt',
          'Sportswear',
          'Beanies',
          'Hat',
          'jacket',
        ],
        datasets: [
          {
            backgroundColor: [
              '#41B883',
              '#E46651',
              '#00D8FF',
              '#DD1B16',
              '#00D855',
              '#800000',
              '#FFFF00',
            ],
            data: [40, 20, 80, 10, 5, 20, 11],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
  computed: {},
  watch: {},

  mounted() {},

  methods: {},
}
</script>
