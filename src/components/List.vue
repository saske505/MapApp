<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <div v-for="(location, id) in getLocations()" class="image-card" @click.prevent="displayDetails(id)">
        <div v-if="location.url !== '' && location.comment !==''" class="image-card__picture">
          <img :src="location.url" />
        </div>
        <div class="image-card__comment mdl-card__actions">
          <span>{{ location.info }}</span>
          <span>{{ location.location }}</span>
          <span>{{ location.more }}</span>
          <span>{{ location.created_at }}</span>
        </div>
      </div>
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
