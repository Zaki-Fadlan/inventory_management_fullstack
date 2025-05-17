<template>
  <h1 class="font-bold text-xl text-gray-700">Datamaster</h1>

  <div class="flex w-full gap-4 mt-4">
    <router-link
      to="/datamaster/produk"
      class="bg-gray-700/30 p-2 rounded-md shadow-md w-full h-[100px] flex justify-center items-center hover:underline hover:bg-gray-300 hover:cursor-pointer"
    >
      Produk
    </router-link>
    <router-link
      to="/datamaster/kategori"
      class="bg-gray-700/30 p-2 rounded-md shadow-md w-full h-[100px] flex justify-center items-center hover:underline hover:bg-gray-300 hover:cursor-pointer"
    >
      Kategori
    </router-link>
    <router-link
      to="/datamaster/customer"
      class="bg-gray-700/30 p-2 rounded-md shadow-md w-full h-[100px] flex justify-center items-center hover:underline hover:bg-gray-300 hover:cursor-pointer"
    >
      Customer
    </router-link>
    <router-link
      to="/datamaster/supplier"
      class="bg-gray-700/30 p-2 rounded-md shadow-md w-full h-[100px] flex justify-center items-center hover:underline hover:bg-gray-300 hover:cursor-pointer"
    >
      Supplier
    </router-link>
    <router-link
      to="/datamaster/transaction"
      class="bg-gray-700/30 p-2 rounded-md shadow-md w-full h-[100px] flex justify-center items-center hover:underline hover:bg-gray-300 hover:cursor-pointer"
    >
      Transaction
    </router-link>
  </div>
</template>
<script setup lang="ts">
// import card
</script>
