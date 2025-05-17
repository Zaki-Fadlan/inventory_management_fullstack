<template>
  <div class="h-screen overflowauto">
    <Navbar />
    <main class="min-h-screen p-16">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
<script setup lang="ts">
import Footer from "@/components/layout/Footer.vue";
import Navbar from "@/components/layout/Navbar.vue";
</script>
