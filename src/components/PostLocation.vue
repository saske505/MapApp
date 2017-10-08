<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-form v-model="valid">
          <v-text-field label="Location"
                        v-model="location"></v-text-field>
          <v-text-field label="Info"
                        v-model="info"></v-text-field>
          <v-text-field label="More"
                        v-model="more"></v-text-field>

          <button v-on:click="postLocation">Post</button>
          <span>Don't have an account yet? <router-link to="/sign-up">create one</router-link> here</span>
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
        'more': ''
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

