<template>
  <div>
    <v-card elevation="1">
      <v-row align="center" justify="center">
        <v-col cols="6">
          <v-select
            v-model="selectedMonth"
            :items="months"
            label="Select Month"
            @change="fetchData"
          />
        </v-col>
        <v-col cols="6">
          <v-select
            v-model="selectedYear"
            :items="years"
            label="Select Year"
            @change="fetchData"
          />
        </v-col>
      </v-row>
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
  </div>
</template>

<script>
export default {
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
            backgroundColor: [],
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      selectedMonth: null,
      selectedYear: null,
      months: [
        { text: 'January', value: 1 },
        { text: 'February', value: 2 },
        { text: 'March', value: 3 },
        { text: 'April', value: 4 },
        { text: 'May', value: 5 },
        { text: 'June', value: 6 },
        { text: 'July', value: 7 },
        { text: 'August', value: 8 },
        { text: 'September', value: 9 },
        { text: 'October', value: 10 },
        { text: 'November', value: 11 },
        { text: 'December', value: 12 },
      ],
      years: [],
    }
  },
  mounted() {
    const currentDate = new Date()
    this.selectedMonth = currentDate.getMonth() + 1
    this.selectedYear = currentDate.getFullYear()
    this.generateYearOptions()
    this.fetchData()
  },
  methods: {
    generateYearOptions() {
      const currentYear = new Date().getFullYear()
      const startYear = 2020 // Change as per your requirement
      this.years = []
      for (let year = startYear; year <= currentYear; year++) {
        this.years.push(year)
      }
    },
    async fetchData() {
      try {
        const url = `/saleDetail/summary/month?month=${this.selectedMonth}&year=${this.selectedYear}&limit=10`
        const response = await this.$axios.get(url)
        const data = response.data
        this.updateChartData(data)
      } catch (error) {
        this.$toast.success('Error fetching data:', error)
      }
    },
    updateChartData(data) {
      this.chartData.labels = data.result.map((item) => item.productName)
      this.chartData.datasets[0].backgroundColor = data.result.map(() =>
        this.getRandomColor()
      )
      this.chartData.datasets[0].data = data.result.map(
        (item) => item.totalSalePrice
      )
    },
    getRandomColor() {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
  },
}
</script>

<style scoped>
/* Add any custom styles for the component */
</style>
