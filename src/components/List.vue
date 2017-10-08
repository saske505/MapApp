<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar class="teal" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title class="text-xs-center">New Chat</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list subheader>
          <v-subheader>Recent chat</v-subheader>
          <v-list-tile avatar v-for="(location, id) in getLocations()" v-bind:key="location.location" @click="">
            <v-list-tile-avatar>

            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="location.info"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon v-bind:color="location.created_at ? 'teal' : 'grey'">chat_bubble</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>       
      </v-card>
    </v-flex>
  </v-layout>

</template>
<script>
import { reduce } from 'lodash'
export default {
  methods: {
    displayDetails (id) {
      this.$router.push({ name: 'detail', params: { id: id } })
    },
    getLocations () {
      if (navigator.onLine) {
        this.saveLocationsToCache()
        return reduce(this.$root.location, (locations, firebaseEntry) => {
          locations[firebaseEntry['.key']] = {
            info: firebaseEntry['info'],
            location: firebaseEntry['location'],
            more: firebaseEntry['more'],
            created_at: firebaseEntry['created_at']
          }
          return locations
        }, {})
      } else {
        return JSON.parse(localStorage.getItem('locations'))
      }
    },
    saveLocationsToCache () {
      this.$root.$firebaseRefs.location.orderByChild('created_at').once('value', (snapchot) => {
        let cachedLocations = {}
        snapchot.forEach((locationSnapchot) => {
          cachedLocations[locationSnapchot.key] = locationSnapchot.val()
        })
        localStorage.setItem('location', JSON.stringify(cachedLocations))
      })
    }
  },
  mounted () {
    this.saveLocationsToCache()
  }
}
</script>
