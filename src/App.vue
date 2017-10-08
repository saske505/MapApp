<template>
  <v-app light>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="item.path"
        >
          <v-list-tile-action>
            <v-icon light v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" light></v-toolbar-side-icon>
      <v-btn
        icon
        light
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        light
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        light
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        light
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <main>              <router-view></router-view>
           
    </main>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { reduce } from 'lodash'
  export default {
    data () {
      return {
        clipped: true,
        drawer: true,
        fixed: false,
        items: [{
          icon: 'home',
          title: 'Home',
          path: '/'
        }, {
          icon: 'add',
          title: 'Post',
          path: '/post'
        }, {
          icon: 'list',
          title: 'List',
          path: '/list'
        }],
        miniVariant: true,
        right: false,
        rightDrawer: false,
        title: ''
      }
    },
    methods: {
      displayDetails (id) {
        this.$router.push({ name: 'detail', params: { id: id } })
      },
      getLocation () {
        if (navigator.onLine) {
          this.saveLocationToCache()
          return reduce(this.$root.location, (locations, firebaseEntry) => {
            locations[firebaseEntry['.key']] = {
              url: firebaseEntry['url'],
              comment: firebaseEntry['comment'],
              info: firebaseEntry['info'],
              created_at: firebaseEntry['created_at']
            }
            return location
          }, {})
        } else {
          return JSON.parse(localStorage.getItem('location'))
        }
      },
      saveLocationsToCache () {
        this.$root.$firebaseRefs.location.orderByChild('created_at').once('value', (snapchot) => {
          let cachedLocations = {}
          snapchot.forEach((locationSnapchot) => {
            cachedLocations[locationSnapchot.key] = locationSnapchot.val()
          })
          localStorage.setItem('locations', JSON.stringify(cachedLocations))
        })
      }
    },
    mounted () {
      this.saveLocationsToCache()
    }
}

</script>
<style lang="stylus">
  @import './stylus/main';
</style>
