<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <mapfilters></mapfilters>
        <v-map :zoom="zoom" :center="center">
          <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
          <v-marker-cluster>
            <v-marker v-for="item in markers" :key="item['.key']" v-if="item.location !== null" :lat-lng="item.location" :visible="item.visible" v-on:l-click="alert(item)">
              <v-popup :content="customPopup(item)"></v-popup>
              <!-- <v-tooltip :content="item.tooltip"></v-tooltip> -->
            </v-marker>
          </v-marker-cluster>
        </v-map>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import firebase from 'firebase'
  import Vue2Leaflet from 'vue2-leaflet'
  import L from 'leaflet'
  import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
  import mapFilters from './map-filters'
  // import { OpenStreetMapProvider } from 'leaflet-geosearch'

  // Geo reverse

  // const provider = new OpenStreetMapProvider()
  //
  // const form = document.querySelector('form')
  // const input = form.querySelector('input[type="text"]')
  //
  // form.addEventListener('submit', (event) => {
  //   event.preventDefault()
  //   provider.search({ query: input.value }).then((results) => {
  //     console.log(results)
  //   })
  // })

  // End geo reverse

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
      'v-marker': Vue2Leaflet.Marker,
      'v-marker-cluster': Vue2LeafletMarkerCluster,
      'mapfilters': mapFilters
    },
    data () {
      return {
        zoom: 13,
        center: L.latLng(-24.7583818, 28.9177589),
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
        return 'Key : ' +
        item['.key'] +
        '<br />' +
        ' <img src=https://randomuser.me/api/portraits/men/85.jpg class=thumbnail /> ' +
        '<br />' +
         item.created_at +
        //  '<br />' +
        //  item.created_by +
        //  '<br /> ' +
        //  item.location.lat +
        //  '<br /> ' +
        //  item.location.lng +
         '<br />' +
         item.types +
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
  @import "~leaflet.markercluster/dist/MarkerCluster.css";
  @import "~leaflet.markercluster/dist/MarkerCluster.Default.css";

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
