<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex md10 xs12 offset-md1 offset-sm-0>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="e1 > 1">Privacy</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="e1 > 2">Incident</v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step step="3">Confirm</v-stepper-step>
      </v-stepper-header>
      <v-stepper-content step="1">
        <v-card flat color="grey lighten-1" class="mb-5">
          <h4>
            Report a crime
          </h4>
          <v-checkbox label="Anonymously" v-model='checkboxAnon' ></v-checkbox>
          <v-checkbox
          label="Logged in user - Use your profile info"
          class="pb-0"
          ></v-checkbox>
          <v-btn color="primary" @click.native="e1 = 2">Continue</v-btn>
          <v-btn flat light>Cancel</v-btn>
        </v-card>
      </v-stepper-content>
      <v-stepper-content step="2">
                <v-card flat color="grey lighten-1" class="mb-5">
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
                </v-card>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-card flat color="grey lighten-1" class="mb-5">
          <p>Verify info</p>
          <v-btn color="primary" @click.native="e1 = 1">Continue</v-btn>
          <v-btn light>Cancel</v-btn>
        </v-card>
      </v-stepper-content>
    </v-stepper>
  </v-flex>
</v-layout>
</v-container>

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
        checkboxAnon: true,
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

<style>
.stepper {
  /*min-height: 500px;*/
}
.stepper__content {
  /*border: solid 1px red;*/
  height: 400px;
}

.tab-reverse-transition-enter {
  /*border: solid 5px blue solid;*/
}

.tab-transition-leave-active {
  /*border: solid 5px yellow;*/
  margin-top:10px;
  height: 600px;
}

.stepper__header {
  /*z-index: 999999 !important;*/
  /*position:absolute;*/
}
</style>
