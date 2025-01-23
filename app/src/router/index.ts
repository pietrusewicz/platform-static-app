import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import bookRoutes from '@/router/book';
import parchmentRoutes from '@/router/parchment';
import reviewRoutes from '@/router/review';
import userRoutes from '@/router/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',    
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    ...bookRoutes,
    ...parchmentRoutes,
    ...reviewRoutes,
    ...userRoutes,
  ],
})

export default router
