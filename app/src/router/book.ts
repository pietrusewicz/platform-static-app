export default [
  {
    name: "BookList",
    path: "/books/",
    component: () => import("@/views/book/ViewList.vue"),
  },
  {
    name: "BookCreate",
    path: "/books/create",
    component: () => import("@/views/book/ViewCreate.vue"),
  },
  {
    name: "BookUpdate",
    path: "/books/edit/:id",
    component: () => import("@/views/book/ViewUpdate.vue"),
  },
  {
    name: "BookShow",
    path: "/books/show/:id",
    component: () => import("@/views/book/ViewShow.vue"),
  },
];
