<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-map :zoom="zoom" :center="center">
          <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
          <v-marker v-for="item in markers" :key="item.id" :lat-lng="item.position" :visible="item.visible"></v-marker>
        </v-map>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import firebase from 'firebase'
  import Vue2Leaflet from 'vue2-leaflet'
  import L from 'leaflet'

  delete L.Icon.Default.prototype._getIconUrl

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  })

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
        markers: [
          { id: '1', position: {lat: 51.505, lng: -0.09}, tooltip: 'tooltip for marker1', draggable: true, visible: true },
          { id: '2', position: {lat: 51.895, lng: -0.09}, tooltip: 'tooltip for marker2', draggable: true, visible: false },
          { id: '3', position: {lat: 52.005, lng: -0.09}, tooltip: 'tooltip for marker3', draggable: true, visible: true },
          { id: '4', position: {lat: 53.705, lng: -0.09}, tooltip: 'tooltip for marker4', draggable: true, visible: false }
        ]
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

  @import '~leaflet/dist/leaflet.css';

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
