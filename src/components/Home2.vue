<template>

    <v-container grid-list-md text-xs-center>
     <v-layout row wrap>

        <v-flex xs12>
        <v-card dark color="primary">
          <v-card-text class="px-0">Your location</v-card-text>
        </v-card>
      </v-flex>

    </v-layout>

     <v-layout row wrap>
        <v-flex xs6>
          <v-map class="test" ref="myMap" :zoom="myZoom" :center="myCenter" v-on:l-mousemove="" v-on:l-zoom="changedZoom()" v-on:l-moveend="changedCenter()">
            <v-tilelayer :url="url" :attribution="attribution" ></v-tilelayer>
            <v-marker v-for="item in markers"
                      :key="item.id"
                      :lat-lng="item.position"
                      :visible="item.visible"
                      :draggable="true"
                      :tooltip="item.tooltip">
               <v-popup :content="item.tooltip">
               </v-popup>
            </v-marker>
          </v-map>
        </v-flex>

        <v-flex xs6>
        <form>
        <v-text-field
          label="Name"
          v-model="name"
          :error-messages="nameErrors"
          :counter="10"
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
          required
        ></v-text-field>
        <v-text-field
          label="E-mail"
          v-model="email"
          :error-messages="emailErrors"
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
          required
        ></v-text-field>
        <v-select
          label="Item"
          v-model="select"
          :items="items"
          :error-messages="selectErrors"
          @change="$v.select.$touch()"
          @blur="$v.select.$touch()"
          required
        ></v-select>
        <v-checkbox
          label="Do you agree?"
          v-model="checkbox"
          :error-messages="checkboxErrors"
          @change="$v.checkbox.$touch()"
          @blur="$v.checkbox.$touch()"
          required
        ></v-checkbox>

        <v-btn color="primary">Primary</v-btn>
        <v-btn @click="submit">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
        </form>
      </v-flex>

        <p>
             Geo Reverse <input v-model="compGeo">
             <br />
             <span v-for='item in geoName'>
               {{ item.label }} <br />
               {{ item.x}}
             </span>
        </p>


        <button @click="createMarker">upload</button>

      </v-flex>
    </v-layout>

    <v-layout row fill-height>
      <v-flex xs12>
        <v-card dark color="primary">
          <v-card-text class="px-0">Form</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  import firebase from 'firebase'
  // import Vue from 'vue'
  import Vue2Leaflet from 'vue2-leaflet'
  import L from 'leaflet'
  import { OpenStreetMapProvider } from 'leaflet-geosearch'

  // -----------------
  // Geo revrse start
  // ----------------

  // setup
  const provider = new OpenStreetMapProvider()

  // form.addEventListener('submit', (event) => {
  //   event.preventDefault();
  //
  // provider.search({ query: input1.value }).then((results) => {
  //   console.log(results)
  // })

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
      // 'v-marker-cluster': Vue2LeafletMarkerCluster
      // 'mapfilters': mapFilters
    },

    data () {
      return {
        geoName: [],
        myZoom: 1,
        myCenter: new L.LatLng(41, -1.219482),
        zoom: 0,
        center: [41, -1.219482],
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
      createMarker () {
        console.log('add marker record')
        this.$root.$firebaseRefs.markers.push(
          {
            'created_at': '9th Feb 2015',
            'created_by': 'the-id-of-user',
            'description': 'Something happened',
            'location': {
              'x': '800-123-4567',
              'y': '877-123-1234'
            },
            'geoName': 'something',
            'types': [
              'Assualt',
              'Robbery'
            ],
            'year': '2006'
          }
        )
      },
      customPopup: function (item) {
        // console.log('Data from customPopup')
        // console.log(this.$data)
        // console.log(item.created_at)

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
        console.log(provider)
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
      },
      compGeo: {
        get: function (value) {
          console.log('getting')
          console.log(value)
        },
        set: function (value) {
          console.log('setting')
          provider.search({ query: value }).then((results) => {
            console.log(results)
            this.geoName = results
          })
        }

      }
    }
  }
</script>
<style>

  @import '~leaflet/dist/leaflet.css';
  input {
    /* border: solid 10px lightgrey !important; */
    /* float: right; */
    /* margin-right:20px; */
    /* clear:right; */
  }
  .test {
    /* border: solid 2px red !important; */
    height: 250px !important;
    width: 250px;
    /* margin-top: 150px; */
  }
</style>
