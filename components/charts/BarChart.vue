<template>
  <div>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  props: ['options'],
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.chart.getContext('2d');
      const chartData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'My Dataset',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange'],
          },
        ],
      };
      const chartOptions = this.options || {};

      this.$data._chart = new this.Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions,
      });
    },
  },
};
</script>
