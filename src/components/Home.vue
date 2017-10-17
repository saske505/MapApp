<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-map :zoom="zoom" :center="center">
          <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
          <v-marker v-for="item in markers" :key="item['.key']" :lat-lng="item.location" :visible="item.visible" v-on:l-click="alert(item)">
            <v-popup :content="customPopup(item)"></v-popup>
            <!-- <v-tooltip :content="item.tooltip"></v-tooltip> -->
          </v-marker>
        </v-map>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import firebase from 'firebase'
  import Vue2Leaflet from 'vue2-leaflet'
  import L from 'leaflet'

  delete L.Icon.Default.prototype._getIconUrl // fix missing img markers

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  })

  export default {
    name: 'about',
    message: 'Hello Vue.js!',
    title: 'Home page',
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
        tooltip: 'test',
        markers: this.$root.markers
      }
    },
    methods: {
      customPopup: function (item) {
        console.log('Data from customPopup')
        // console.log(this.$data)
        console.log(item.created_at)
        return 'Marker' +
        '<br />' +
        ' <img src=https://placehold.it/40x40  /> ' +
        '<br />' +
         item.created_at +
         '<br />' +
         item.created_by +
         '<br /> ' +
         item.location.lat +
         '<br /> ' +
         item.location.lng +
         '<br />' +
         item.description
      },
      alert (item) {
        console.log('this is ' + JSON.stringify(item))
        // console.log(item.description)
      },
      logout: function () {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login')
        })
      }
    },
    computed: {
      ttip: function () {
        return this.draggable
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

  .leaflet-container {
    top: 0px;
  }
</style>
