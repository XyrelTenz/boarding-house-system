<script setup lang="ts">
import { definePageMeta } from '#imports'
import { ref } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js'
import { Bar, Line } from 'vue-chartjs'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement
)

definePageMeta({
  layout: 'boarders-layout',
})

const stats = ref([
  { title: 'Your Room', value: 'Room 101', subtitle: 'Second Floor', icon: 'mdi-bed' },
  { title: 'Payments Made', value: '$300', subtitle: 'This Month', icon: 'mdi-cash-multiple', trend: '+12%' },
  { title: 'Pending Requests', value: '2', subtitle: 'Maintenance', icon: 'mdi-alert-circle-outline' },
  { title: 'Next Payment Due', value: 'Aug 20', subtitle: '5 days remaining', icon: 'mdi-calendar-clock' },
])

const barChartData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    { label: 'Monthly Expenses ($)', backgroundColor: '#16a34a', borderColor: '#15803d', borderWidth: 1, data: [400, 450, 420, 500, 480, 460] },
  ],
})

const lineChartData = ref({
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    { label: 'Payments', borderColor: '#16a34a', backgroundColor: 'rgba(22,163,74,0.1)', pointBackgroundColor: '#16a34a', pointRadius: 6, data: [100, 100, 50, 50], fill: true, tension: 0.4 },
  ],
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top', labels: { font: { family: 'Open Sans', size: 10, weight: '600' }, color: '#374151' } },
    tooltip: { backgroundColor: '#1f2937', titleColor: '#fff', bodyColor: '#fff', borderColor: '#16a34a', borderWidth: 1 },
  },
  scales: {
    x: { grid: { color: '#e5e7eb', borderColor: '#d1d5db' }, ticks: { color: '#374151', font: { family: 'Open Sans', size: 10 } } },
    y: { grid: { color: '#e5e7eb', borderColor: '#d1d5db' }, ticks: { color: '#374151', font: { family: 'Open Sans', size: 10 } } },
  },
}
</script>

<template>
  <div class="min-h-screen flex flex-col gap-4">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
      <v-card v-for="(stat, index) in stats" :key="index" class="bg-white border border-gray-200 shadow-sm" flat>
        <v-card-text class="flex items-center justify-between gap-2 p-2">
          <div class="flex-1 flex flex-col justify-center gap-0.5">
            <p class="text-xs text-slate-600 uppercase">{{ stat.title }}</p>
            <p class="text-lg md:text-xl text-slate-600 font-semibold">{{ stat.value }}</p>
            <p class="text-xs text-slate-600">{{ stat.subtitle }}</p>
          </div>
          <v-icon :icon="stat.icon" size="20" color="#374151" class="self-center" />
        </v-card-text>
      </v-card>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <!-- Bar Chart -->
      <v-card class="bg-white border border-gray-200 shadow-sm" flat>
        <v-card-title class="flex items-center justify-between gap-2 p-3">
          <div class="flex flex-col justify-center">
            <h2 class="text-lg font-semibold text-slate-600 mb-0.5">Monthly Expenses</h2>
            <p class="text-xs text-slate-600">Track your spending patterns</p>
          </div>
          <v-icon icon="mdi-chart-bar" size="20" color="#16a34a" class="self-center" />
        </v-card-title>
        <v-card-text class="p-0">
          <div class="h-56 md:h-64 w-full">
            <Bar :data="barChartData" :options="chartOptions" />
          </div>
        </v-card-text>
      </v-card>

      <!-- Line Chart -->
      <v-card class="bg-white border border-gray-200 shadow-sm" flat>
        <v-card-title class="flex items-center justify-between gap-2 p-3">
          <div class="flex flex-col justify-center">
            <h2 class="text-lg font-semibold text-slate-600 mb-0.5">Payment History</h2>
            <p class="text-xs text-slate-600">Your payments over recent weeks</p>
          </div>
          <v-icon icon="mdi-chart-line" size="20" color="#16a34a" class="self-center" />
        </v-card-title>
        <v-card-text class="p-0">
          <div class="h-56 md:h-64 w-full">
            <Line :data="lineChartData" :options="chartOptions" />
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.v-card { border-radius: 0 !important; }
.v-chart { width: 100% !important; height: 100% !important; }
</style>
