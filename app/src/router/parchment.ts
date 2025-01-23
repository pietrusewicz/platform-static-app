export default [
  {
    name: "ParchmentList",
    path: "/parchments/",
    component: () => import("@/views/parchment/ViewList.vue"),
  },
  {
    name: "ParchmentCreate",
    path: "/parchments/create",
    component: () => import("@/views/parchment/ViewCreate.vue"),
  },
  {
    name: "ParchmentUpdate",
    path: "/parchments/edit/:id",
    component: () => import("@/views/parchment/ViewUpdate.vue"),
  },
  {
    name: "ParchmentShow",
    path: "/parchments/show/:id",
    component: () => import("@/views/parchment/ViewShow.vue"),
  },
];
