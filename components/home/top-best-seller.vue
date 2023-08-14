<template>
  <div>
    <v-card elevation="1" class="pa-5">
      <v-row align="center" justify="center">
        <v-col cols="3">
          <v-select
            v-model="selectedMonth"
            :items="months"
            label="Select Month"
            @change="fetchData"
          />
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="selectedYear"
            :items="years"
            label="Select Year"
            @change="fetchData"
          />
        </v-col>
        <v-col cols="6" class="d-flex justify-end">
          <v-menu offset-y>
            <template #activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Exports
              </v-btn>
            </template>
            <v-list class="py-0">
              <v-btn block text color="success" @click="exportToExcel"
                ><v-icon left>mdi-microsoft-excel</v-icon> excel</v-btn
              >
              <!-- <v-btn block text color="error"
                  ><v-icon left>mdi-file-pdf-box</v-icon> pdf</v-btn
                >
                <v-btn block text color="primary"
                  ><v-icon>mdi-printer</v-icon> print</v-btn
                > -->
            </v-list>
          </v-menu>
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
    </v-card>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'
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
        { text: 'ມັງກອນ', value: 1 },
        { text: 'ກຸມພາ', value: 2 },
        { text: 'ມີນາ', value: 3 },
        { text: 'ເມສາ', value: 4 },
        { text: 'ພຶດສະພາ', value: 5 },
        { text: 'ມິຖຸນາ', value: 6 },
        { text: 'ກໍລະກົດ', value: 7 },
        { text: 'ສິງຫາ', value: 8 },
        { text: 'ກັນຍາ', value: 9 },
        { text: 'ຕຸລາ', value: 10 },
        { text: 'ພະຈິກ', value: 11 },
        { text: 'ທັນວາ', value: 12 },
      ],

      years: [],
      import_data: [],
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
        const url = `/saleDetail/bestSeller?month=${this.selectedMonth}&year=${this.selectedYear}&limit=1000`
        const response = await this.$axios.get(url)
        const data = response.data
        this.import_data = data
        this.updateChartData(data)
      } catch (error) {
        this.$toast.error('Error fetching data:', error)
      }
    },
    updateChartData(data) {
      this.chartData.labels = data.result.map((item) => {
        return `${item.productName} - ${item.color} - ${item.size}`
      })

      this.chartData.datasets[0].backgroundColor = data.result.map(() =>
        this.getRandomColor()
      )
      this.chartData.datasets[0].data = data.result.map(
        (item) => item.totalSalePrice
      )

      // Change chart type to "bar" from "pie"
      this.chartData.datasets[0].type = 'bar'
    },

    getRandomColor() {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
    exportToExcel() {
      const data = this.import_data.result

      const modifiedData = data.map((item, index) => {
        return {
          ລຳດັບ: index + 1,
          // product_id: item.product_id,
          ຊື່: item.productName,
          ຈຳນວນ: item.totalQuantity,
          ຈຳນວນເງິນ: item.totalSalePrice,
          ຂະໜາດ: item.size, // Add size property
          ເສີມ: item.color, // Add color property
        }
      })

      const ws = XLSX.utils.json_to_sheet(modifiedData)

      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

      const date = new Date().toISOString().slice(0, 10)
      const filename = `data_${date}.xlsx`
      XLSX.writeFile(wb, filename)
    },
  },
}
</script>

<style scoped>
/* Add any custom styles for the component */
</style>
