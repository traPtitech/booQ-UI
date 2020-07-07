import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const routerHistory = createWebHistory()

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('/@/pages/DashBoard.vue')
  },
  {
    path: '/users',
    name: 'All Users',
    component: () => import('/@/pages/Users.vue')
  },
  {
    path: '/users/:name',
    name: 'User Page',
    component: () => import('/@/pages/User.vue')
  },
  {
    path: '/items',
    name: 'All Items',
    component: () => import('/@/pages/Items.vue'),
    props: { type: 'all' }
  },
  {
    path: '/items/new',
    name: 'Register Item',
    component: () => import('/@/pages/RegisterItem.vue')
  },
  {
    path: '/items/equipment',
    name: 'Equipments',
    component: () => import('/@/pages/Items.vue'),
    props: { type: 'equipment' }
  },
  {
    path: '/items/property',
    name: 'Personal Property Items',
    component: () => import('/@/pages/Items.vue'),
    props: { type: 'property' }
  },
  {
    path: '/items/:id',
    name: 'Item',
    component: () => import('/@/pages/Item.vue')
  },
  {
    path: '/admin',
    name: 'Admin Page',
    component: () => import('/@/pages/Admin.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('/@/pages/About.vue')
  }
]

export default createRouter({
  history: routerHistory,
  routes
})
