<template>
  <nav
    class="w-full p-2 px-6 flex justify-between items-center text-white font-semibold text-lg shadow-xl fixed top-0 z-50 backdrop-blur-sm bg-gray-800/30"
  >
    <h1>Logo</h1>
    <ul class="flex gap-4 text-sm">
      <router-link to="/" class="hover:underline"
        ><li>Dashboard</li></router-link
      >
      <router-link to="/datamaster" class="hover:underline"
        ><li>Datamaster</li></router-link
      >
    </ul>
  </nav>
</template>
