import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import AllPostsUsersView from '@/views/AllPostsUsersView.vue'
import CreatePostView from '@/views/CreatePostView.vue'
import OnePostView from '@/views/OnePostView.vue'
import ModifyPostView from '@/views/ModifyPostView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'SignupView',
    component: SignupView
  },
  {
    path: '/publications',
    name: 'AllPostsAndUsers',
    component: AllPostsUsersView
  },
  {
    path: '/publier',
    name: 'createPost',
    component: CreatePostView
  },
  {
    path: '/publications/:id',
    name: 'OnePostView',
    component: OnePostView
  },
  {
    path: '/modifier/:id',
    name: 'ModifyPostView',
    component: ModifyPostView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
