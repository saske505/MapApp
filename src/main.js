// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase'

import {
    Vuetify,
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VCard,
    VForm,
    VTextField,
    transitions
} from 'vuetify'

import App from './App'
import router from './router'

Vue.use(VueFire)
Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VCard,
    VForm,
    VTextField,
    transitions
  }
})

Vue.config.productionTip = false

let app
let config = {
  apiKey: 'AIzaSyDIyRzOXRYzriVjb3DnqBoRMQdF1hvcMWI',
  authDomain: 'cropchat-a6b10.firebaseapp.com',
  databaseURL: 'https://cropchat-a6b10.firebaseio.com',
  projectId: 'cropchat-a6b10',
  storageBucket: 'cropchat-a6b10.appspot.com',
  messagingSenderId: '565134856668'
}

firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router
    })
  }
})
