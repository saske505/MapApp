<template>
  <div>

<h2>Database view</h2>
<h2>Profiles</h2>

<tr v-for="user in this.$root.profiles">
  <td>
    {{user['.key']}}
  </td>
  <td>
    {{user.created_at}}
  </td>
  <td>
    {{user.email}}
  </td>
  <td>
    {{user.last_login}}
  </td>
  <td>
    {{user.name}}
  </td>
  <td>
    {{user.surname}}
  </td>
  <td>
    {{user.types}}
  </td>
</tr>

<h2>Markers</h2>

<tr v-for="marker in this.$root.markers">
  <td>
    {{marker.created_at}}
  </td>
  <td>
    {{marker.location}}
  </td>
  <td>
    <!-- {{user.last_login}} -->
  </td>
  <td>
    <!-- {{user.name}} -->
  </td>
  <td>
    <!-- {{user.surname}} -->
  </td>
  <td>
    <!-- {{user.types}} -->
  </td>
</tr>

<v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :hover="hover"
      :transition="transition"
    >
      <v-btn
        slot="activator"
        color="blue darken-2"
        dark
        fab
        hover
        v-model="fab"
      >
        <v-icon>account_circle</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="green"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-speed-dial>

</div>

</template>

<script>
// import VueFire from 'vuefire'
// import {db} from '@/firebase'

export default {
  name: 'db-view',
  methods: {
    customFunc () {
      console.log('Do something')
    }
  },
  data () {
    return {
      users: {
        'email': this.email,
        'password': this.password
      }
    }
  }
}
// this.$firebaseRefs.users.push({name: 'Tom Bombadil'})
</script>
