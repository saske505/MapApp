import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
// import List from '@/components/List'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import PostLocation from '@/components/PostLocation'
import Details from '@/components/Details'
// import firebase from 'firebase'
import dbAdd from '@/components/db-add'
import dbView from '@/components/db-view'
import vuex from '@/components/vuex'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
      component: Home
    }, {
      path: '/postLocation',
      name: 'PostLocation',
      component: PostLocation,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/detail/:id',
      name: 'detail',
      component: Details
    }, {
      path: '/db-add',
      name: 'db-add',
      component: dbAdd
    }, {
      path: '/db-view',
      name: 'db-view',
      component: dbView
    }, {
      path: '/vuex',
      name: 'vuex',
      component: vuex
    }
  ]
})

// router.beforeEach((to, from, next) => {
  // let currentUser = firebase.auth().currentUser
  // let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  // if (requiresAuth && !currentUser) next('login')
  // else if (!requiresAuth && currentUser) next('Home')
  // else next()
// })
