import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/components/layout/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "Dashboard",
        component: () => import("../views/Dashboard.vue"),
      },
      {
        path: "/datamaster",
        name: "Datamaster",
        component: () => import("../views/datamaster/Datamaster.vue"),
      },
      {
        path: "/datamaster/produk",
        name: "Produk",
        component: () => import("../views/datamaster/Produk.vue"),
      },
      {
        path: "/datamaster/kategori",
        name: "Kategori",
        component: () => import("../views/datamaster/Kategori.vue"),
      },
      {
        path: "/datamaster/customer",
        name: "Customer",
        component: () => import("../views/datamaster/Customer.vue"),
      },
      {
        path: "/datamaster/supplier",
        name: "Supplier",
        component: () => import("../views/datamaster/Supplier.vue"),
      },
      {
        path: "/datamaster/transaction",
        name: "Transaction",
        component: () => import("../views/datamaster/Transaction.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
