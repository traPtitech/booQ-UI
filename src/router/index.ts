import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const routerHistory = createWebHistory()

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: () =>
      import(/* webpackChunkname: "DashBoard" */ '/@/pages/DashBoard.vue')
  },
  {
    path: '/users',
    name: 'All Users',
    component: () =>
      import(/* webpackChunkname: "Users" */ '/@/pages/Users.vue')
  },
  {
    path: '/users/:name',
    name: 'User Page',
    component: () => import(/* webpackChunkname: "User" */ '/@/pages/User.vue')
  },
  {
    path: '/items',
    name: 'All Items',
    component: () =>
      import(/* webpackChunkname: "Items" */ '/@/pages/Items.vue')
  },
  {
    path: '/items/new',
    name: 'Register Item',
    component: () =>
      import(/* webpackChunkname: "RegisterItem" */ '/@/pages/RegisterItem.vue')
  },
  {
    path: '/items/equipment',
    name: 'Equipments',
    component: () => import(/* webpackChunkname: "Item" */ '/@/pages/Items.vue')
  },
  {
    path: '/items/property',
    name: 'Personal Property Items',
    component: () => import(/* webpackChunkname: "Item" */ '/@/pages/Items.vue')
  },
  {
    path: '/items/:id',
    name: 'Item',
    component: () => import(/* webpackChunkname: "Item" */ '/@/pages/Item.vue')
  },
  {
    path: '/admin',
    name: 'Admin Page',
    component: () =>
      import(/* webpackChunkname: "Admin" */ '/@/pages/Admin.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkname: "About" */ '/@/pages/About.vue')
  }
]

export default createRouter({
  history: routerHistory,
  routes
})
