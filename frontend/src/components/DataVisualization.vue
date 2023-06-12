<template>
    <div>
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js';
  
  export default {
    data() {
      return {
        chart: null,
        tableData: [],
      };
    },
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        const statusCounts = this.calculateStatusCounts();
  
        const chartCanvas = this.$refs.chartCanvas;
        const ctx = chartCanvas.getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: Object.keys(statusCounts),
            datasets: [
              {
                label: 'Status Counts',
                data: Object.values(statusCounts),
                backgroundColor: 'rgba(0, 123, 255, 0.7)',
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    stepSize: 1,
                  },
                },
              ],
            },
          },
        });
      },
      calculateStatusCounts() {
        const statusCounts = {};
  
        for (const item of this.tableData) {
          const status = item.purchaseStatus;
          if (statusCounts[status]) {
            statusCounts[status]++;
          } else {
            statusCounts[status] = 1;
          }
        }
  
        return statusCounts;
      },
    },
    watch: {
      tableData() {
        if (this.chart) {
          this.chart.destroy();
        }
        this.renderChart();
      },
    },
  };
  </script>
  
  <style>
  canvas {
    width: 100%;
    height: 400px;
  }
  </style>
  