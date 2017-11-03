<template>
  <div>
    <h1>Report a crime</h1>
    <v-stepper v-model="e1" class="mt-3">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="e1 > 1">Name of step 1</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="e1 > 2">Name of step 2</v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step step="3">Name of step 3</v-stepper-step>
      </v-stepper-header>
      <v-stepper-content step="1">
          <p>
            Report a crime here
          </p>
          Post as
          <v-checkbox
            label="Ross Mckenzie"
            class="pb-0"
          ></v-checkbox>
          <v-checkbox
            label="Anonymous"
          ></v-checkbox>
        <v-btn color="primary" @click.native="e1 = 2">Continue</v-btn>
        <v-btn flat light>Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
          <v-form>
            <p>Crime details</p>
            <v-text-field label="Location"
                          v-model="location"></v-text-field>
            <v-text-field label="Info"
                          v-model="info"></v-text-field>
            <v-text-field label="More"
                          v-model="more"></v-text-field>
            <v-select v-bind:items="items"
                      v-model="types"
                      label="Select"
                      autocomplete></v-select>
            <!-- <v-btn color="warning" dark v-on:click="postLocation">Post</v-btn> -->
          </v-form>
        <v-btn color="primary" @click.native="e1 = 3">Continue</v-btn>
        <v-btn flat dark>Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
          <p>Verify info</p>
        <v-btn color="primary" @click.native="e1 = 1">Continue</v-btn>
        <v-btn light>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper>
  </div>

</template>
<script>
  export default {
    data () {
      return {
        e1: 0,
        'location': '',
        'info': '',
        'created_at': '',
        'more': '',
        types: null,
        items: [
          'murder', 'rape', 'robbery', 'shooting', 'heist'
        ],
        sheet: false
      }
    },
    methods: {
      postLocation () {
        this.$root.$firebaseRefs.location.push(
          {
            'location': this.location,
            'info': this.info,
            'created_at': -1 * new Date().getTime(),
            'more': this.more,
            'types': this.types
          }
        ).then(
          this.$router.push('/'))
      }
    }
  }
</script>
