<template>
  <v-app light>
    <v-navigation-drawer
      clipped
      v-model="drawer"
      enable-resize-watcher
      app
    >
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <!-- <img src="https://randomuser.me/api/portraits/men/85.jpg" /> -->
               <v-icon large color='blue'>account_circle</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Not logged in</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
      <v-list dense>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="item.path"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon" v-bind:color="item.color"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>

        <!-- <v-post></v-post> -->
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app clipped-left color="blue darken-3">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" light></v-toolbar-side-icon>

      <v-toolbar-title>{{ this.$route.name }}</v-toolbar-title>
      <v-spacer></v-spacer></v-spacer>

    </v-toolbar>
    <main>
      <v-content>
              <v-container fluid fill-height>
                <v-layout justify-center align-center>
                    <router-view></router-view>
                </v-layout>
              </v-container>
      </v-content>

    </main>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>
<script>
  import { reduce } from 'lodash'
  // import Post from '@/components/PostLocation'
  export default {
    components: {
      // 'v-post': Post
    },
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
          icon: 'warning',
          title: 'Report a crime',
          path: '/PostLocation'
          // color: 'orange darken-2'
        }, {
          icon: 'vpn_key',
          title: 'Login',
          path: '/login'
        }, {
          icon: 'perm_identity',
          title: 'Sign-Up',
          path: '/sign-up'
        // }, {
        //   icon: 'forum',
        //   title: 'Chat',
        //   path: '/chat'
        }, {
          icon: 'room',
          title: 'Create data',
          path: '/db-add'
        }, {
          icon: 'room',
          title: 'View data',
          path: '/db-view'
        }],
        miniVariant: true,
        right: false,
        rightDrawer: false,
        title: '',
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false
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
    },
    created () {
      console.log(this.$router.options.routes)
    }
}

</script>

<style lang="stylus">
  @import './stylus/main';

  html { overflow-y: scroll !important; }

  .dialog__container{
    /*position: fixed;*/
  }

</style>
