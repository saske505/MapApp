<template>
  <v-container grid-list-md text-xs-center>

  <v-layout row wrap>

     <v-flex xs12>
     <v-card dark color="primary">
       <v-card-text>Your Privacy</v-card-text>
     </v-card>
   </v-flex>

 </v-layout>


      <v-container fluid>

        <v-radio-group v-model="column" column>
          <p>Post this incident as </p>

     <v-radio label="Anonomous" value="Anonomous" ></v-radio>
     <v-radio label="With real name" value="With real name"></v-radio>
   </v-radio-group>

 </v-container>

     <v-layout row wrap>

        <v-flex xs12>
        <v-card dark color="primary">
          <v-card-text class="px-0">Your location</v-card-text>
        </v-card>
      </v-flex>

    </v-layout>

     <v-layout row wrap>
        <v-flex xs6>
          <v-map class="mini-map" ref="myMap" :zoom="myZoom" :center="myCenter" v-on:l-mousemove="" v-on:l-zoom="changedZoom()" v-on:l-moveend="changedCenter()">
            <v-tilelayer :url="url" :attribution="attribution" ></v-tilelayer>
            <v-marker v-for="item in markers"
                      :key="item.id"
                      :lat-lng="item.position"
                      :visible="item.visible"
                      :draggable="true"
                      :tooltip="item.tooltip">
               <!-- <v-popup :content="item.tooltip"> -->
               <!-- </v-popup> -->
            </v-marker>
          </v-map>
        </v-flex>

        <v-flex xs6>
          <form>
            <v-text-field
              label="Street name"
              v-model="compGeo"
              prepend-icon="add_location"
            ></v-text-field>
            <span v-for='item in geoName'>
              <a>{{ item.label }}</a>
            </span>
          </form>
        </v-flex>

      </v-flex>
    </v-layout>

      <v-layout row wrap>
       <v-flex xs12>
         <v-card dark color="primary">
           <v-card-text class="px-0">Incident details</v-card-text>
         </v-card>
       </v-flex>



    </v-layout>

    <v-layout row wrap>

      <v-dialog
          ref="dialog"
          persistent
          v-model="modal"
          lazy
          full-width
          width="290px"
          :return-value.sync="date"
        >

                <v-text-field
                  slot="activator"
                  label="Select date"
                  v-model="date"
                  prepend-icon="event"

                ></v-text-field>

          <v-date-picker v-model="date" >
          </v-date-picker>
          <v-btn color="" @click="modal = false">OK</v-btn>
          <v-btn color="primary" @click="modal = false">Cancel</v-btn>
        </v-dialog>


<v-flex xs6>

  <v-text-field
       label="Select time"
       value="12:30:00"
       type="time"
       suffix=""
       prepend-icon="query_builder"
     ></v-text-field>

</v-flex xs6>
<v-flex xs6>

     <v-form>
       <v-select v-bind:items="items" label="Category" autocomplete multiple></v-select>
       <v-btn color="green" dark v-on:click="">Complete submission</v-btn>
     </v-form>
   </v-flex xs6>
   <v-flex xs6>
               <v-text-field textarea label="Aditional information"></v-text-field>
             </v-flex xs6>
             <v-flex xs6>

</v-flex>
</v-layout>

  </v-container>
</template>

<script>
  // import firebase from 'firebase'
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
          { id: '2', position: {lat: 51.895, lng: -0.09}, tooltip: 'tooltip for marker2', draggable: true, visible: true }
        ],
        items: [
          'murder', 'rape', 'robbery', 'shooting', 'heist'
        ],
        time: new Date(),
        date: null,
        menu: false,
        modal: false
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
            // 'geoName': 'something',
            'types': [
              'Assualt',
              'Robbery'
            ],
            'year': '2006'
          }
        )
      },
      changedCenter: function () {
        this.compCenter = this.$refs.myMap.mapObject.getCenter()
        // console.log('Method changedCenter ' + this.myCenter)
        // this.$refs.myMap.mapObject.setView(new L.LatLng(40.737, -73.923, 3))
        console.log('Method changeCenter')
        // console.log(this.compCenter.lng)
      },
      changedZoom: function () {
        this.compZoom = this.$refs.myMap.mapObject._zoom
        console.log('zoom change detected, setting zoom to ' + this.compZoom)
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
         // item.types +
         '<br />' +
         item.description
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
          // console.log('setting')
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
  .mini-map {
    /* border: solid 2px red !important; */
    height: 200px !important;
    width: 90%;
    margin-bottom: 40px;
    /* margin-top: 150px; */
  }
  .input-group--text-field.input-group--textarea .input-group__input {
    border: 1px solid black !important;
}
</style>
