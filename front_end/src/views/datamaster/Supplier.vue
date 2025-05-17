<template>
  <h1 class="font-bold text-xl text-gray-700">Supplier</h1>

  <!-- Filter -->
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
              Nama Supplier
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Kontak Info
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
            v-for="(supplier, index) in suppliers"
            :key="supplier.id"
            class="hover:bg-gray-50"
          >
            <td class="px-6 py-4 whitespace-nowrap">{{ index + 1 }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ supplier.name }}</td>
            <td class="px-6 py-4 whitespace-pre-line">
              {{ supplier.contact_info }}
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
          <tr v-if="suppliers.length === 0">
            <td colspan="4" class="px-6 py-4 text-center text-gray-500">
              No suppliers found
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
        {{ isEditing ? "Edit Supplier" : "Tambah Supplier" }}
      </h3>
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Nama Supplier</label
            >
            <input
              type="text"
              v-model="formFields.name"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Alamat</label
            >
            <textarea
              v-model="formFields.address"
              rows="2"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >No. Telepon</label
            >
            <input
              type="tel"
              v-model="formFields.phone"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              v-model="formFields.email"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
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
      <p class="text-gray-600">
        Apakah Anda yakin ingin menghapus supplier ini?
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
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import type { Supplier } from "../../types/api";

const suppliers = ref<Supplier[]>([]);
const showModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const selectedSupplier = ref<number>(-1);
const isLoading = ref(false);
const error = ref<string | null>(null);

// Form fields for contact info
const formFields = reactive({
  name: "",
  address: "",
  phone: "",
  email: "",
});

// Utility functions
const parseContactInfo = (contact_info: string) => {
  const lines = contact_info.split("\n");
  const result = {
    address: lines[0] || "",
    phone: "",
    email: "",
  };

  lines.forEach((line) => {
    if (line.startsWith("Phone:")) {
      result.phone = line.replace("Phone:", "").trim();
    } else if (line.startsWith("Email:")) {
      result.email = line.replace("Email:", "").trim();
    }
  });

  return result;
};

const formatContactInfo = (address: string, phone: string, email: string) => {
  return `${address}\nPhone: ${phone}\nEmail: ${email}`;
};

const resetForm = () => {
  formFields.name = "";
  formFields.address = "";
  formFields.phone = "";
  formFields.email = "";
};

// API calls
const fetchSuppliers = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/suppliers`
    );
    suppliers.value = response.data.data;
  } catch (err: any) {
    error.value = err.response?.data?.message || "Error fetching suppliers";
    console.error("Error fetching suppliers:", err);
  } finally {
    isLoading.value = false;
  }
};

// Modal handlers
const openAddModal = () => {
  resetForm();
  isEditing.value = false;
  showModal.value = true;
};

const openEditModal = (index: number) => {
  const supplier = suppliers.value[index];
  const contactDetails = parseContactInfo(supplier.contact_info);

  formFields.name = supplier.name;
  formFields.address = contactDetails.address;
  formFields.phone = contactDetails.phone;
  formFields.email = contactDetails.email;

  selectedSupplier.value = index;
  isEditing.value = true;
  showModal.value = true;
};

const openDeleteModal = (index: number) => {
  selectedSupplier.value = index;
  showDeleteModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  selectedSupplier.value = -1;
};

// Form submission
const handleSubmit = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const payload: Supplier = {
      name: formFields.name,
      contact_info: formatContactInfo(
        formFields.address,
        formFields.phone,
        formFields.email
      ),
    };

    if (isEditing.value && selectedSupplier.value !== -1) {
      const supplierId = suppliers.value[selectedSupplier.value].id;
      await axios.put(
        `${import.meta.env.VITE_API_URL}/suppliers/${supplierId}`,
        payload
      );
    } else {
      await axios.post(`${import.meta.env.VITE_API_URL}/suppliers`, payload);
    }

    await fetchSuppliers();
    closeModal();
  } catch (err: any) {
    error.value = err.response?.data?.message || "Error saving supplier";
    console.error("Error saving supplier:", err);
  } finally {
    isLoading.value = false;
  }
};

// Delete handler
const confirmDelete = async () => {
  if (selectedSupplier.value === -1) return;

  isLoading.value = true;
  error.value = null;

  try {
    const supplierId = suppliers.value[selectedSupplier.value].id;
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/suppliers/${supplierId}`
    );
    await fetchSuppliers();
    closeDeleteModal();
  } catch (err: any) {
    error.value = err.response?.data?.message || "Error deleting supplier";
    console.error("Error deleting supplier:", err);
  } finally {
    isLoading.value = false;
  }
};

// Initialize
onMounted(() => {
  fetchSuppliers();
});
</script>
