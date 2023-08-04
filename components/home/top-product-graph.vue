<template>
  <div>
    <div>
      <h1>ສິນຄ້າຍອດນິຍົມໃນຮ້ານ</h1>
    </div>
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
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch(
          'http://localhost:8080/saleDetail/summary/group?limit=10'
        )
        const data = await response.json()
        this.updateChartData(data)
      } catch (error) {
        console.error('Error fetching data:', error)
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
