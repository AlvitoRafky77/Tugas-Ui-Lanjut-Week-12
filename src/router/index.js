import { createRouter, createWebHistory } from 'vue-router'

import Todo from '@/views/Todo.vue'
import Completed from '@/views/Completed.vue'
import Categories from '@/views/Categories.vue'
import CategoryDetail from '@/views/CategoryDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Todo },
    { path: '/completed', component: Completed },
    { path: '/categories', component: Categories },
    { path: '/categories/:name', component: CategoryDetail }
  ]
})

export default router
