// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase'
import Vue2Leaflet from 'vue2-leaflet'
import VueResource from 'vue-resource'

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
    VAvatar,
    VSubheader,
    VSelect,
    VDialog,
    transitions
} from 'vuetify'

import App from './App'
import router from './router'

Vue.use(VueFire)
Vue.use(VueResource)
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
    VAvatar,
    VSubheader,
    VSelect,
    VDialog,
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
let database = firebase.database()
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router,
      firebase: {
        location: database.ref('location').orderByChild('created_at')
      },
      data: {
        dialog: false
      }
    })
  }
})

Vue.component('v-map', Vue2Leaflet.Map)
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer)
Vue.component('v-marker', Vue2Leaflet.Marker)
