<template>
  <h1 class="font-bold text-xl text-gray-700">Produk</h1>

  <!-- Actions -->
  <div class="flex gap-4 justify-end items-center">
    <button
      @click="openAddModal"
      class="bg-gray-600 text-white px-2 py-1 rounded-md shadow-xl outline-none hover:bg-gray-700 hover:cursor-pointer"
    >
      Tambah Data
    </button>
  </div>

  <!-- Table -->
  <div class="flex w-full gap-4 mt-4">
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
              ID Produk
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Nama
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Harga
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Stok
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Kategori
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Supplier
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
            v-for="(product, index) in products"
            :key="product.id"
            class="hover:bg-gray-50"
          >
            <td class="px-6 py-4 whitespace-nowrap">{{ index + 1 }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ product.product_id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ product.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ formatPrice(product.price) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ product.stock }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ product.category?.name || "-" }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ product.supplier?.name || "-" }}
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
          <tr v-if="products.length === 0">
            <td colspan="8" class="px-6 py-4 text-center text-gray-500">
              No products found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Add/Edit Modal -->
  <div
    v-if="showModal"
    class="fixed inset-0 bg-gray-300 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
  >
    <div class="relative bg-white rounded-lg shadow-xl p-6 m-4 max-w-xl w-full">
      <h3 class="text-lg font-semibold mb-4">
        {{ isEditing ? "Edit Produk" : "Tambah Produk" }}
      </h3>
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >ID Produk</label
            >
            <input
              type="text"
              v-model="formData.product_id"
              placeholder="PROD001"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Nama Produk</label
            >
            <input
              type="text"
              v-model="formData.name"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Harga</label>
            <input
              type="number"
              v-model="formData.price"
              min="0"
              step="0.01"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Stok</label>
            <input
              type="number"
              v-model="formData.stock"
              min="0"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Kategori</label
            >
            <select
              v-model="formData.category_id"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Supplier</label
            >
            <select
              v-model="formData.supplier_id"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option
                v-for="supplier in suppliers"
                :key="supplier.id"
                :value="supplier.id"
              >
                {{ supplier.name }}
              </option>
            </select>
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
            :disabled="isLoading"
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
      <p class="text-gray-600">Apakah Anda yakin ingin menghapus produk ini?</p>
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
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import type { Product, Category, Supplier } from "../../types/api";

const products = ref<Product[]>([]);
const categories = ref<Category[]>([]);
const suppliers = ref<Supplier[]>([]);
const showModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const selectedProduct = ref<number>(-1);
const isLoading = ref(false);
const error = ref<string | null>(null);

const formData = reactive<Product>({
  product_id: "",
  name: "",
  price: 0,
  stock: 0,
  category_id: 0,
  supplier_id: 0,
});

const resetForm = () => {
  formData.product_id = "";
  formData.name = "";
  formData.price = 0;
  formData.stock = 0;
  formData.category_id = categories.value[0]?.id || 0;
  formData.supplier_id = suppliers.value[0]?.id || 0;
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};

const fetchProducts = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    // Fetch products with categories and suppliers
    const [productsRes, categoriesRes, suppliersRes] = await Promise.all([
      axios.get(`${import.meta.env.VITE_API_URL}/products`),
      axios.get(`${import.meta.env.VITE_API_URL}/categories`),
      axios.get(`${import.meta.env.VITE_API_URL}/suppliers`),
    ]);

    const categoriesMap = new Map(
      categoriesRes.data.data.map((c: Category) => [c.id, c])
    );
    const suppliersMap = new Map(
      suppliersRes.data.data.map((s: Supplier) => [s.id, s])
    );

    products.value = productsRes.data.data.map((product: Product) => ({
      ...product,
      category: categoriesMap.get(product.category_id),
      supplier: suppliersMap.get(product.supplier_id),
    }));
  } catch (err: any) {
    error.value = err.response?.data?.message || "Error fetching products";
    console.error("Error fetching products:", err);
  } finally {
    isLoading.value = false;
  }
};

const fetchCategories = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/categories`
    );
    categories.value = response.data.data;
  } catch (err: any) {
    console.error("Error fetching categories:", err);
  }
};

const fetchSuppliers = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/suppliers`
    );
    suppliers.value = response.data.data;
  } catch (err: any) {
    console.error("Error fetching suppliers:", err);
  }
};

const openAddModal = () => {
  resetForm();
  isEditing.value = false;
  showModal.value = true;
};

const openEditModal = (index: number) => {
  const product = products.value[index];
  formData.product_id = product.product_id;
  formData.name = product.name;
  formData.price = product.price;
  formData.stock = product.stock;
  formData.category_id = product.category_id;
  formData.supplier_id = product.supplier_id;
  selectedProduct.value = index;
  isEditing.value = true;
  showModal.value = true;
};

const openDeleteModal = (index: number) => {
  selectedProduct.value = index;
  showDeleteModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  selectedProduct.value = -1;
};

const handleSubmit = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const payload: Product = {
      product_id: formData.product_id,
      name: formData.name,
      price: formData.price,
      stock: formData.stock,
      category_id: formData.category_id,
      supplier_id: formData.supplier_id,
    };

    if (isEditing.value && selectedProduct.value !== -1) {
      const productId = products.value[selectedProduct.value].id;
      await axios.put(
        `${import.meta.env.VITE_API_URL}/products/${productId}`,
        payload
      );
    } else {
      await axios.post(`${import.meta.env.VITE_API_URL}/products`, payload);
    }

    await fetchProducts();
    closeModal();
  } catch (err: any) {
    error.value = err.response?.data?.message || "Error saving product";
    console.error("Error saving product:", err);
  } finally {
    isLoading.value = false;
  }
};

const confirmDelete = async () => {
  if (selectedProduct.value === -1) return;

  isLoading.value = true;
  error.value = null;

  try {
    const productId = products.value[selectedProduct.value].id;
    await axios.delete(`${import.meta.env.VITE_API_URL}/products/${productId}`);
    await fetchProducts();
    closeDeleteModal();
  } catch (err: any) {
    error.value = err.response?.data?.message || "Error deleting product";
    console.error("Error deleting product:", err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  // Fetch categories and suppliers first, then products
  await Promise.all([fetchCategories(), fetchSuppliers()]);
  await fetchProducts();
});
</script>
