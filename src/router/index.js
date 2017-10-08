import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import List from '@/components/List'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import PostLocation from '@/components/PostLocation'
import Details from '@/components/Details'
import firebase from 'firebase'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    }, {
      path: '/',
      redirect: '/login'
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/sign-up',
      name: 'signUp',
      component: SignUp
    }, {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/list',
      name: 'List',
      component: List,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/post',
      name: 'PostLocation',
      component: PostLocation,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/detail/:id',
      name: 'detail',
      component: Details
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('Home')
  else next()
})

export default router
