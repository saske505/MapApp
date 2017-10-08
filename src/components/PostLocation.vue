<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-form v-model="valid">
          <v-text-field label="Location"
                        v-model="location"></v-text-field>
          <v-text-field label="Info"
                        v-model="info"></v-text-field>
          <v-text-field label="More"
                        v-model="more"></v-text-field>
          <v-select v-bind:items="types"
                    v-model="a1"
                    label="Select"
                    autocomplete></v-select>
          <v-btn color="warning" dark v-on:click="postLocation">Post</v-btn>
          
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        'id': null,
        'location': '',
        'info': '',
        'created_at': '',
        'more': '',
        a1: null,
        types: [
          'murder', 'rape', 'robbery', 'shooting', 'heist'
        ]
      }
    },
    methods: {
      postLocation () {
        this.$root.$firebaseRefs.location.push(
          {
            'id': 0,
            'location': this.location,
            'info': this.info,
            'created_at': -1 * new Date().getTime(),
            'more': this.more
          }
        ).then(
          this.$router.push('/')
          )
      }
    }
  }
</script>
