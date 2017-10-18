<template>
  <div style="height:600px;">
    <h2>Map 2</h2>

    <p>
      Click on the map and save position to vuex
      <button v-on:click="say('hi')">Say hi</button>
      <br />
      <button v-on:click="pan()">Pan</button>
      <br />
      set zoom : <input v-model="zoom" />
      <br />
      set center : <input v-model="center" />
    </p>

    <v-map ref="map" :zoom="zoom" :center="center" v-on:l-mousemove="say('Mouse moves')" v-on:l-zoomanim="say('zoom changed')" v-on:l-move="viewMoved($event)">
      <v-tilelayer :url="url" :attribution="attribution" ></v-tilelayer>
    </v-map>

  </div>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet'
import L from 'leaflet'

export default {
  name: 'map2',
  title: 'Map 2 page',
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-tilelayer': Vue2Leaflet.TileLayer,
    'v-marker': Vue2Leaflet.Marker
  },
  computed: {
    modCenter: function () {
      return 'modcenter'
    }
  },
  data () {
    return {
      myZoom: 3,
      myCenter: 'v-map.getCenter',
      zoom: 2,
      center: L.latLng(-13.7583818, 27.9177589),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '',
      markers: [
        { id: '1', position: {lat: 51.505, lng: -0.09}, tooltip: 'tooltip for marker1', draggable: true, visible: true },
        { id: '2', position: {lat: 51.895, lng: -0.09}, tooltip: 'tooltip for marker2', draggable: true, visible: true },
        { id: '3', position: {lat: 52.005, lng: -0.09}, tooltip: 'tooltip for marker3', draggable: true, visible: true },
        { id: '4', position: {lat: -30.705, lng: 20.09}, tooltip: 'tooltip for marker4', draggable: true, visible: true }
      ]
    }
  },
  methods: {
    say: function (message) {
      console.log(message)
    },
    viewMoved: function (event) {
      console.log(event)
    },
    pan: function () {
      console.log(L.latLng(-13.7583818, 27.9177589))
    }
  }
}
</script>

<style>
  @import "~leaflet/dist/leaflet.css";
</style>
