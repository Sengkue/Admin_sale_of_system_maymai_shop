<template>
    <div>
      <v-card elevation="1" class="pa-5">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="6" md="4">
            <v-dialog
              ref="startDateDialog"
              v-model="startDateModal"
              :return-value.sync="startDate"
              persistent
              width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="startDate"
                  label="ເລືອກມື້ເລີ່ມຕົ້ນ"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="startDate"
                scrollable
                @input="fetchData"
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="startDateModal = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.startDateDialog.save(startDate)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-dialog
              ref="endDateDialog"
              v-model="endDateModal"
              :return-value.sync="endDate"
              persistent
              width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="endDate"
                  label="ເລືອກມື້ສິ້ນສຸດ"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="endDate"
                scrollable
                @input="fetchData"
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="endDateModal = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.endDateDialog.save(endDate)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
        </v-row>
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
        <v-row class="pa-3" align="center" justify="center">
          <v-col cols="6" sm="4">
            <v-card elevation="1" class="pa-3" color="primary">
              <div class="white--text">
                <div>Total Income:</div>
                <div>{{ totalIncome }}</div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="6" sm="4">
            <v-card elevation="1" class="pa-3" color="error">
              <div class="white--text">
                <div>Total Expenses:</div>
                <div>{{ totalExpenses }}</div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="6" sm="4">
            <v-card elevation="1" class="pa-3" color="success">
              <div class="white--text">
                <div>Profit:</div>
                <div>{{ formatProfit(profit) }}</div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      chartId: {
        type: String,
        default: 'bar-chart', // Default chart ID for the bar chart
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
        default: () => ({}),
      },
      plugins: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        chartData: {
          labels: [],
          datasets: [
            {
              label: 'Income',
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              data: [],
            },
            {
              label: 'Expenses',
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              data: [],
            },
            {
              label: 'Profit',
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              data: [],
            },
          ],
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
        },
        startDateModal: false,
        endDateModal: false,
        startDate: null,
        endDate: null,
        totalIncome: 0,
        totalExpenses: 0,
        profit: 0,
      };
    },
    mounted() {
      const currentDate = new Date();
      this.startDate = currentDate.toISOString().slice(0, 10);
      this.endDate = currentDate.toISOString().slice(0, 10);
      this.fetchData();
    },
    methods: {
      async fetchData() {
        try {
          const url = `/import_detail/income-expenses-date-range?startDate=${this.startDate}&endDate=${this.endDate}`;
          const response = await this.$axios.get(url);
          const data = response.data;
          this.totalIncome = data.totalIncome;
          this.totalExpenses = parseInt(data.totalExpenses, 10);
          this.profit = data.totalProfit;
          this.updateChartData(data);
        } catch (error) {
          this.$toast.error('Error fetching data:', error);
        }
      },
      updateChartData(data) {
        this.chartData.labels = data.summaryData.map((item) => item.month);
        this.chartData.datasets[0].data = data.summaryData.map(
          (item) => item.totalIncome
        );
        this.chartData.datasets[1].data = data.summaryData.map(
          (item) => item.totalExpenses
        );
        this.chartData.datasets[2].data = data.summaryData.map(
          (item) => item.profit
        );
  
        // Change chart type to "bar" from "pie"
        this.chartData.datasets[0].type = 'bar';
        this.chartData.datasets[1].type = 'bar';
        this.chartData.datasets[2].type = 'bar';
      },
      formatProfit(profit) {
        // Format the profit value as a string with proper sign
        const formattedProfit = profit >= 0 ? `+${profit}` : `${profit}`;
        return formattedProfit;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any custom styles for the component */
  </style>
  