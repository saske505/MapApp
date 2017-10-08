<template id="home">
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-map :zoom="zoom" :center="center">
          <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
          <v-marker :lat-lng="marker"></v-marker>
        </v-map>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import firebase from 'firebase'
  import Vue2Leaflet from 'vue2-leaflet'
  import L from 'leaflet'
  //  import postLocation from '@/components/PostLocation'
  export default {
    name: 'about',
    components: {
      'v-map': Vue2Leaflet.Map,
      'v-tilelayer': Vue2Leaflet.TileLayer,
      'v-marker': Vue2Leaflet.Marker
    },
    data () {
      return {
        zoom: 13,
        center: L.latLng(-25.7583818, 27.9177589),
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution: '',
        marker: L.latLng(-25.7583818, 27.9177589)
      }
    },
    methods: {
      logout: function () {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login')
        })
      }
    }
  }
</script>
<style>
  .leaflet-fake-icon-image-2x {
    background-image: url(/marker-icon-2x.png);
  }

  .leaflet-fake-icon-shadow {
    background-image: url(/leaflet/dist/images/marker-shadow.png);
  }

  @import "~leaflet/dist/leaflet.css";

  #side {
    float: left;
    width: 200px;
  }


  #top_div {
    position: absolute;
    overflow-x: auto;
    top: 0;
    right: 0;
    left: 0;
   bottom:0;
  }

  #bottom_div {
    position: absolute;
    top: 50%;
    right: 0;
    left: 200px;
    bottom: 0;
  }
</style>
