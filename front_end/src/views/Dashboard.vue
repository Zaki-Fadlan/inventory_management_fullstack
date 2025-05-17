<template>
  <h1 class="font-bold text-xl text-gray-700">Dashboard</h1>
  <!-- Filter -->
  <div class="flex gap-4 justify-center items-center">
    <div>
      <label for="start_date">Dari: </label>
      <input
        type="date"
        id="start_date"
        name="start_date"
        v-model="startDate"
        class="px-2 py-1 border-1 rounded-xl"
      />
    </div>
    <div>
      <label for="end_date">Sampai: </label>
      <input
        type="date"
        id="end_date"
        name="end_date"
        v-model="endDate"
        class="px-2 py-1 border-1 rounded-xl"
      />
    </div>
    <button
      @click="onFilterClick"
      class="bg-gray-600 text-white px-2 py-1 rounded-xl shadow-xl outline-none hover:bg-gray-700 hover:cursor-pointer"
    >
      Filter
    </button>
  </div>
  <div class="flex w-full gap-4 mt-4">
    <div class="bg-gray-200 p-4 rounded-md shadow-md w-2/3">
      <h2 class="text-lg font-semibold mb-4">Grafik Penjualan Tahun 2025</h2>
      <LineChart
        v-if="salesChartData"
        :data="salesChartData"
        :options="chartOptions"
        class="max-h-[425px] bg-white rounded-md shadow-md px-2"
      />
    </div>
    <div class="bg-gray-200 p-4 rounded-md shadow-md w-1/3">
      <h2 class="text-lg font-semibold mb-4">Top 10 Produk</h2>
      <div class="overflow-x-auto">
        <table v-if="topProducts.length" class="min-w-full">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Produk
              </th>
              <th
                class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase"
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="product in topProducts"
              :key="product.name"
              class="hover:bg-gray-50"
            >
              <td class="px-4 py-2 whitespace-nowrap">{{ product.name }}</td>
              <td class="px-4 py-2 text-right whitespace-nowrap">
                Rp {{ product.total.toLocaleString("id-ID") }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="flex w-full gap-4 mt-4 bg-gray-200 p-4 shadow-md rounded-md">
    <div class="w-full">
      <h2 class="text-lg font-semibold mb-4">Penjualan per Kategori</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Kategori
              </th>

              <th
                class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase"
              >
                Total Penjualan
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="category in categorySales"
              :key="category.name"
              class="hover:bg-gray-50"
            >
              <td class="px-4 py-2 whitespace-nowrap">{{ category.name }}</td>

              <td class="px-4 py-2 text-right whitespace-nowrap">
                Rp {{ category.total.toLocaleString("id-ID") }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { Line as LineChart } from "vue-chartjs";
import axios from "axios";
import type { Report } from "../types/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const report = ref<Report | null>(null);
const startDate = ref("");
const endDate = ref("");

const isLoading = ref(false);
const error = ref<string | null>(null);

const fetchReport = async (start?: string, end?: string) => {
  isLoading.value = true;
  error.value = null;

  try {
    let url = `${import.meta.env.VITE_API_URL}/report`;
    if (start && end) {
      url += `?start_date=${start}&end_date=${end}`;
    }

    const response = await axios.get(url);
    report.value = response.data.data;
  } catch (err: any) {
    error.value = err.response?.data?.message || "Error fetching report";
    console.error("Error fetching report:", err);
  } finally {
    isLoading.value = false;
  }
};
const onFilterClick = () => {
  const start = startDate.value;
  const end = endDate.value;

  if ((start && !end) || (!start && end)) {
    alert("Mohon isi kedua tanggal: mulai dan sampai.");
    return;
  }

  if (start && end) {
    fetchReport(start, end);
  } else {
    fetchReport();
  }
};
const monthMap: Record<string, string> = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "Mei",
  June: "Jun",
  July: "Jul",
  August: "Agu",
  September: "Sep",
  October: "Okt",
  November: "Nov",
  December: "Des",
};

const salesChartData = computed<ChartData<"line">>(() => ({
  labels:
    report.value?.monthlySale?.map(
      (item: any) => `${monthMap[item.month]} ${item.year}`
    ) || [],

  datasets: [
    {
      label: "Penjualan (Rp)",
      data:
        report.value?.monthlySale?.map((item: any) => item.total_sales_rp) ||
        [],
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
      fill: false,
    },
  ],
}));

const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (tickValue: string | number) {
          if (typeof tickValue === "number") {
            return `Rp ${tickValue.toLocaleString("id-ID")}`;
          }
          return tickValue;
        },
      },
    },
  },
};

const topProducts = computed(
  () =>
    report.value?.topProduct?.map((item: any) => ({
      name: item.product_name,
      total: Number(item.total_sales_rp),
    })) || []
);

const categorySales = computed(
  () =>
    report.value?.soldPerCategory?.map((item: any) => ({
      name: item.category_name,
      total: item.total_sales_rp || 0,
    })) || []
);
onMounted(() => {
  fetchReport();
});
</script>
