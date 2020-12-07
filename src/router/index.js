import Vue from 'vue'
import VueRouter from 'vue-router'
import homePage from '@/views/home-page'
import boardApp from '@/views/board-app'
import userDetails from '@/views/user-details'
import appLogin from '@/views/app-login'
import appSignup from '@/views/app-signup'
import taskDetails from '@/views/task-details'
import boardActivities from '@/views/board-activities'
import userCalendar from '@/views/user-calendar'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homePage',
    component: homePage
  },
  {
    path: '/login',
    name: 'appLogin',
    component: appLogin
  },
  {
    path: '/signup',
    name: 'appSignup',
    component: appSignup
  },
  // {
  //   path: '/board/:boardId?/:task?/:taskId?',
  //   name: 'boradApp',
  //   component: boardApp
  // },
  {
    path: '/board/:boardId?/',
    name: 'boardApp',
    component: boardApp,
    children: [
      {
        path: 'task/:taskId',
        component: taskDetails
      },
      {
        path: 'activities',
        component: boardActivities
      }
    ]
  },
  {
    path: '/user/:userId',
    name: 'userDetails',
    component: userDetails
  },
  {
    path: '/calendar',
    name: 'userCalendar',
    component: userCalendar
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
