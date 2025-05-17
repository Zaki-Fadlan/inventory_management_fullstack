<template>
  <h1 class="font-bold text-xl text-gray-700">Transaksi</h1>

  <!-- Filter -->
  <div class="flex gap-4 justify-between items-center mb-4">
    <div class="flex gap-2">
      <button
        @click="activeTab = 'all'"
        :class="{
          'px-3 py-1 rounded-md': true,
          'bg-gray-600 text-white': activeTab === 'all',
          'bg-gray-100 text-gray-700': activeTab !== 'all',
        }"
      >
        Semua
      </button>
      <button
        @click="activeTab = 'purchase'"
        :class="{
          'px-3 py-1 rounded-md': true,
          'bg-gray-600 text-white': activeTab === 'purchase',
          'bg-gray-100 text-gray-700': activeTab !== 'purchase',
        }"
      >
        Pembelian
      </button>
      <button
        @click="activeTab = 'sale'"
        :class="{
          'px-3 py-1 rounded-md': true,
          'bg-gray-600 text-white': activeTab === 'sale',
          'bg-gray-100 text-gray-700': activeTab !== 'sale',
        }"
      >
        Penjualan
      </button>
    </div>
    <button
      @click="openAddModal"
      class="bg-gray-600 text-white px-2 py-1 rounded-md shadow-xl outline-none hover:bg-gray-700 hover:cursor-pointer"
    >
      Tambah Transaksi
    </button>
  </div>

  <!-- Table -->
  <div class="w-full overflow-x-auto">
    <table class="min-w-full bg-white shadow-md rounded-lg">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            No
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            ID Transaksi
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Tipe
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Produk
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Jumlah
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Customer
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Total
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Waktu
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="(transaction, index) in filteredTransactions"
          :key="transaction.id"
          class="hover:bg-gray-50"
        >
          <td class="px-6 py-4 whitespace-nowrap">{{ index + 1 }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ transaction.transaction_id }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span
              :class="{
                'px-2 py-1 text-xs font-medium rounded-full': true,
                'bg-blue-100 text-blue-800': transaction.type === 'purchase',
                'bg-green-100 text-green-800': transaction.type === 'sale',
              }"
            >
              {{ transaction.type === "purchase" ? "Pembelian" : "Penjualan" }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ getProductName(transaction.product_id) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ transaction.quantity }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ getCustomerName(transaction.customer_id) || "-" }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ formatPrice(calculateTotal(transaction)) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{
              new Date(transaction.timestamp).toLocaleString("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <button
              @click="openEditModal(index)"
              class="text-indigo-600 hover:text-indigo-900 mr-2"
            >
              Edit
            </button>
            <button
              @click="openDeleteModal(index)"
              class="text-red-600 hover:text-red-900"
            >
              Delete
            </button>
          </td>
        </tr>
        <tr v-if="filteredTransactions.length === 0">
          <td colspan="8" class="px-6 py-4 text-center text-gray-500">
            No transactions found
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Add/Edit Modal -->
  <div
    v-if="showModal"
    class="fixed inset-0 bg-gray-300 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
  >
    <div class="relative bg-white rounded-lg shadow-xl p-6 m-4 max-w-xl w-full">
      <h3 class="text-lg font-semibold mb-4">
        {{ isEditing ? "Edit Transaksi" : "Tambah Transaksi" }}
      </h3>
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >ID Transaksi</label
            >
            <input
              type="text"
              v-model="formData.transaction_id"
              placeholder="TRX001"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Tipe Transaksi</label
            >
            <select
              v-model="formData.type"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="purchase">Pembelian</option>
              <option value="sale">Penjualan</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Produk</label
            >
            <select
              v-model="formData.product_id"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option
                v-for="product in products"
                :key="product.id"
                :value="product.product_id"
              >
                {{ product.name }} - {{ formatPrice(product.price) }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Jumlah</label
            >
            <input
              type="number"
              v-model="formData.quantity"
              min="1"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div v-if="formData.type === 'sale'">
            <label class="block text-sm font-medium text-gray-700"
              >Customer</label
            >
            <select
              v-model="formData.customer_id"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option
                v-for="customer in customers"
                :key="customer.id"
                :value="customer.customer_id"
              >
                {{ customer.name }} ({{ customer.type.toUpperCase() }})
              </option>
            </select>
          </div>
          <div v-if="selectedProduct" class="bg-gray-50 p-4 rounded-md">
            <p class="text-sm text-gray-600">
              Total: {{ formatPrice(calculateFormTotal()) }}
            </p>
            <p class="text-sm text-gray-600">
              Stock: {{ selectedProduct.stock }}
            </p>
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            @click="closeModal"
            class="bg-gray-50 px-4 py-2 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Batal
          </button>
          <button
            type="submit"
            :disabled="isLoading || !isValidTransaction"
            class="bg-gray-600 text-white px-4 py-2 rounded-md shadow-sm text-sm font-medium hover:bg-gray-700 disabled:opacity-50"
          >
            {{ isEditing ? "Simpan" : "Tambah" }}
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <div
    v-if="showDeleteModal"
    class="fixed inset-0 bg-gray-300 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
  >
    <div class="relative bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm w-full">
      <h3 class="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
      <p class="text-gray-600">
        Apakah Anda yakin ingin menghapus transaksi ini?
      </p>
      <div class="mt-6 flex justify-end space-x-3">
        <button
          @click="closeDeleteModal"
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Batal
        </button>
        <button
          @click="confirmDelete"
          :disabled="isLoading"
          class="bg-red-600 text-white px-4 py-2 rounded-md shadow-sm text-sm font-medium hover:bg-red-700 disabled:opacity-50"
        >
          Hapus
        </button>
      </div>
    </div>
  </div>

  <!-- Loading Overlay -->
  <div
    v-if="isLoading"
    class="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center"
  >
    <div
      class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700"
    ></div>
  </div>

  <!-- Error Toast -->
  <div
    v-if="error"
    class="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md shadow-lg"
    role="alert"
  >
    <span class="block sm:inline">{{ error }}</span>
    <button
      @click="error = null"
      class="absolute top-0 bottom-0 right-0 px-4 py-3"
    >
      <span class="sr-only">Close</span>
      <svg
        class="h-6 w-6 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import axios from "axios";
import type { Transaction, Product, Customer } from "../../types/api";

const transactions = ref<Transaction[]>([]);
const products = ref<Product[]>([]);
const customers = ref<Customer[]>([]);
const showModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const selectedTransaction = ref<number>(-1);
const isLoading = ref(false);
const error = ref<string | null>(null);
const activeTab = ref<"all" | "purchase" | "sale">("all");

// Form data
const formData = reactive<Transaction>({
  transaction_id: "",
  product_id: "",
  quantity: 1,
  type: "purchase",
  customer_id: undefined,
  timestamp: new Date().toISOString(),
});

// Computed properties
const filteredTransactions = computed(() => {
  if (activeTab.value === "all") return transactions.value;
  return transactions.value.filter((t) => t.type === activeTab.value);
});

const selectedProduct = computed(() => {
  return products.value.find((p) => p.product_id === formData.product_id);
});

const isValidTransaction = computed(() => {
  if (!selectedProduct.value) return false;
  if (formData.type === "sale") {
    // For sales, check stock availability
    return formData.quantity <= selectedProduct.value.stock;
  }
  return formData.quantity > 0;
});

// Helper functions
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};

const getProductName = (productId: string): string => {
  const product = products.value.find((p) => p.product_id === productId);
  return product ? product.name : "-";
};

const getCustomerName = (customerId: string | undefined): string => {
  if (!customerId) return "-";
  const customer = customers.value.find((c) => c.customer_id === customerId);
  return customer ? customer.name : "-";
};

const calculateTotal = (transaction: Transaction): number => {
  const product = products.value.find(
    (p) => p.product_id === transaction.product_id
  );
  return product ? product.price * transaction.quantity : 0;
};

const calculateFormTotal = (): number => {
  if (!selectedProduct.value) return 0;
  return selectedProduct.value.price * formData.quantity;
};

const resetForm = () => {
  formData.transaction_id = "";
  formData.product_id = products.value[0]?.product_id || "";
  formData.quantity = 1;
  formData.type = "purchase";
  formData.customer_id = undefined;
};

// API calls
const fetchTransactions = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/transactions`
    );
    transactions.value = response.data.data;
  } catch (err: any) {
    error.value = err.response?.data?.message || "Error fetching transactions";
    console.error("Error fetching transactions:", err);
  } finally {
    isLoading.value = false;
  }
};

const fetchProducts = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/products`
    );
    products.value = response.data.data;
  } catch (err: any) {
    console.error("Error fetching products:", err);
  }
};

const fetchCustomers = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/customers`
    );
    customers.value = response.data.data;
  } catch (err: any) {
    console.error("Error fetching customers:", err);
  }
};

// Modal handlers
const openAddModal = () => {
  resetForm();
  isEditing.value = false;
  showModal.value = true;
};

const openEditModal = (index: number) => {
  const transaction = transactions.value[index];
  Object.assign(formData, transaction);
  selectedTransaction.value = index;
  isEditing.value = true;
  showModal.value = true;
};

const openDeleteModal = (index: number) => {
  selectedTransaction.value = index;
  showDeleteModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  selectedTransaction.value = -1;
};

// Form submission
const handleSubmit = async () => {
  if (!isValidTransaction.value) {
    error.value = "Invalid transaction. Please check quantity and stock.";
    return;
  }

  isLoading.value = true;
  error.value = null;

  try {
    const payload: Transaction = {
      transaction_id: formData.transaction_id,
      product_id: formData.product_id,
      quantity: formData.quantity,
      type: formData.type,
      customer_id: formData.type === "sale" ? formData.customer_id : undefined,
      timestamp: new Date().toISOString(),
    };

    if (isEditing.value && selectedTransaction.value !== -1) {
      const transactionId = transactions.value[selectedTransaction.value].id;
      await axios.put(
        `${import.meta.env.VITE_API_URL}/transactions/${transactionId}`,
        payload
      );
    } else {
      await axios.post(`${import.meta.env.VITE_API_URL}/transactions`, payload);
    }

    await fetchProducts(); // Refresh products to update stock
    await fetchTransactions();
    closeModal();
  } catch (err: any) {
    error.value = err.response?.data?.message || "Error saving transaction";
    console.error("Error saving transaction:", err);
  } finally {
    isLoading.value = false;
  }
};

const confirmDelete = async () => {
  if (selectedTransaction.value === -1) return;

  isLoading.value = true;
  error.value = null;

  try {
    const transactionId = transactions.value[selectedTransaction.value].id;
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/transactions/${transactionId}`
    );
    await fetchProducts(); // Refresh products to update stock
    await fetchTransactions();
    closeDeleteModal();
  } catch (err: any) {
    error.value = err.response?.data?.message || "Error deleting transaction";
    console.error("Error deleting transaction:", err);
  } finally {
    isLoading.value = false;
  }
};

// Initialize
onMounted(async () => {
  await Promise.all([fetchProducts(), fetchCustomers()]);
  await fetchTransactions();
});
</script>
