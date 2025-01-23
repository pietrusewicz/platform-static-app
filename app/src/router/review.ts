export default [
  {
    name: "ReviewList",
    path: "/reviews/",
    component: () => import("@/views/review/ViewList.vue"),
  },
  {
    name: "ReviewCreate",
    path: "/reviews/create",
    component: () => import("@/views/review/ViewCreate.vue"),
  },
  {
    name: "ReviewUpdate",
    path: "/reviews/edit/:id",
    component: () => import("@/views/review/ViewUpdate.vue"),
  },
  {
    name: "ReviewShow",
    path: "/reviews/show/:id",
    component: () => import("@/views/review/ViewShow.vue"),
  },
];
