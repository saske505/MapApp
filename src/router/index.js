import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
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
