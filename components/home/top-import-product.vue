<template>
  <div>
    <v-card elevation="1" class="pa-5">
      <v-row align="center" justify="center">
        <v-col cols="4" sm="6" md="4">
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
                label="Select Start Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="startDate" scrollable @input="fetchData">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="startDateModal = false">
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

        <v-col cols="4" sm="4" md="4">
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
                label="Select End Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="endDate" scrollable @input="fetchData">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="endDateModal = false">
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
        <v-col cols="4" class="d-flex justify-end">
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
              <v-btn block text color="error"
                ><v-icon left>mdi-file-pdf-box</v-icon> pdf</v-btn
              >
              <v-btn block text color="primary"
                ><v-icon>mdi-printer</v-icon> print</v-btn
              >
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
      import_data:[],
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
      startDateModal: false,
      endDateModal: false,
      startDate: null,
      endDate: null,
    }
  },
  mounted() {
    const currentDate = new Date()
    const yesterday = new Date(currentDate)
    yesterday.setDate(currentDate.getDate() - 1)

    this.startDate = this.formatDate(yesterday)
    this.endDate = this.formatDate(currentDate)
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const url = `/import_detail/most-imported-product?startDate=${this.startDate}&endDate=${this.endDate}`
        const response = await this.$axios.get(url) // Use axios to make API request
        const data = response.data
        this.import_data = data
        this.updateChartData(data)
      } catch (error) {
        this.$toast.error('ບໍ່ມີຂໍ້ມູນລາຍງານ', error)
      }
    },
    updateChartData(data) {
      this.chartData.labels = data.map((item) => item.name)
      this.chartData.datasets[0].backgroundColor = data.map(() =>
        this.getRandomColor()
      )
      this.chartData.datasets[0].data = data.map((item) => item.totalPrice)

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
    formatDate(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },

    exportToExcel() {
      const data = this.import_data

      const modifiedData = data.map((item, index) => {
        return {
          index: index + 1,
          ຊື່: item.name,
          ຈຳນວນ: item.totalQuantity,
          ຈຳນວນເງິນ: item.totalPrice,
          ວັນທີນຳເຂົ້າ: `${this.formatDateBill(item.createdAt)}`
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
