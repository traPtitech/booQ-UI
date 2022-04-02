import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

export const routerHistory = createWebHistory()

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('/@/pages/DashBoardPage.vue')
  },
  {
    path: '/users/:name',
    name: 'User Page',
    component: () => import('/@/pages/UserPage.vue'),
    props: true
  },
  {
    path: '/items',
    name: 'All Items',
    component: () => import('/@/pages/ItemsPage.vue'),
    props: { type: 'all' }
  },
  {
    path: '/items/new',
    name: 'Register Item',
    component: () => import('/@/pages/RegisterItemPage.vue')
  },
  {
    path: '/items/equipment',
    name: 'Equipments',
    component: () => import('/@/pages/ItemsPage.vue'),
    props: { type: 'equipment' }
  },
  {
    path: '/items/property',
    name: 'Personal Property Items',
    component: () => import('/@/pages/ItemsPage.vue'),
    props: { type: 'property' }
  },
  {
    path: '/items/:id',
    name: 'Item',
    component: () => import('/@/pages/ItemPage.vue'),
    props: true
  },
  {
    path: '/admin',
    name: 'Admin Page',
    component: () => import('/@/pages/AdminPage.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('/@/pages/AboutPage.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('/@/pages/CartPage.vue')
  }
]

export default createRouter({
  history: routerHistory,
  routes
})
