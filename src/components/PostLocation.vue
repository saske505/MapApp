<template>
  <div class="text-xs-center">
    <slot>
      <v-bottom-sheet v-model="sheet">

        <v-btn slot="activator" color="purple" dark>Click me</v-btn>
        <v-list>
          <v-subheader></v-subheader>
          <v-form>
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
            <v-btn color="warning" dark v-on:click="postLocation">Post</v-btn>
          </v-form>
        </v-list>
      </v-bottom-sheet>
      </slot>
</div>     
</template>
<script>
  export default {
    data () {
      return {
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
