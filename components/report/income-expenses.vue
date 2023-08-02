<template>
  <div>
    <v-card elevation="1" class="pa-5">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="4" md="4">
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

        <v-col cols="12" sm="4" md="4">
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
        <v-col cols="12" sm="4" md="4" class="d-flex justify-end">
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
        <v-col cols="12" sm="8" md="8">
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
      </v-col>
      <v-col cols="12" sm="4" md="4">
        <v-row class="pa-3" align="center" justify="center">
          <v-col cols="12">
            <v-card elevation="1" class="pa-3 py-7" color="primary">
              <div class="white--text">
                <h2>ລາຍຮັບທັງໝົດ:</h2>
                <h4>{{ formatPrice(totalIncome) }} ກີບ</h4>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card elevation="1" class="pa-3 py-7" color="error">
              <div class="white--text">
                <h2>ລາຍຈ່າຍທັງໝົດ:</h2>
                <h4>{{ formatPrice(totalExpenses) }} ກີບ</h4>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card elevation="1" class="pa-3 py-7  " color="success">
              <div class="white--text">
                <h2>ກຳໄລ:</h2>
                <h4>{{ formatProfit(formatPrice(profit)) }} ກີບ</h4>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      </v-row>
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
            label: 'ລາຍຮັບ',
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            data: [],
          },
          {
            label: 'ລາຍຈ່າຍ',
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            data: [],
          },
          {
            label: 'ກຳໄລ',
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
      report_data: [],
    }
  },
  mounted() {
    const currentDate = new Date()
    this.startDate = currentDate.toISOString().slice(0, 10)
    this.endDate = currentDate.toISOString().slice(0, 10)
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const url = `/import_detail/income-expenses-date-range?startDate=${this.startDate}&endDate=${this.endDate}`
        const response = await this.$axios.get(url)
        const data = response.data
        this.report_data = data
        this.totalIncome = data.totalIncome
        this.totalExpenses = parseInt(data.totalExpenses, 10)
        this.profit = data.totalProfit
        this.updateChartData(data)
      } catch (error) {
        this.$toast.error('Error fetching data:', error)
      }
    },
    updateChartData(data) {
      this.chartData.labels = data.summaryData.map((item) => item.month)
      this.chartData.datasets[0].data = data.summaryData.map(
        (item) => item.totalIncome
      )
      this.chartData.datasets[1].data = data.summaryData.map(
        (item) => item.totalExpenses
      )
      this.chartData.datasets[2].data = data.summaryData.map(
        (item) => item.profit
      )

      // Change chart type to "bar" from "pie"
      this.chartData.datasets[0].type = 'bar'
      this.chartData.datasets[1].type = 'bar'
      this.chartData.datasets[2].type = 'bar'
    },
    formatProfit(profit) {
      // Format the profit value as a string with proper sign
      const formattedProfit = profit >= 0 ? `+${profit}` : `${profit}`
      return formattedProfit
    },
    exportToExcel() {
      const data = this.report_data.summaryData
      const totalIncome = this.report_data.totalIncome
      const totalExpenses = this.report_data.totalExpenses
      const totalProfit = this.report_data.totalProfit

      const modifiedData = data.map((item, index) => {
        return {
          index: index + 1,
          ເດືອນ: item.month,
          ປີ: item.year,
          ລາຍຮັບ: item.totalIncome,
          ລາຍຈ່າຍ: item.totalExpenses,
          ກຳໄລ: item.profit,
          // ວັນທີນຳເຂົ້າ: `${this.formatDateBill(item.createdAt)}`
        }
      })

      const totalRow = {
        index: 'Total',
        ເດືອນ: '',
        ປີ: '',
        ລາຍຮັບ: totalIncome,
        ລາຍຈ່າຍ: totalExpenses,
        ກຳໄລ: totalProfit,
      }

      modifiedData.push(totalRow)

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
