<template>
  <div>

<h2>Database view</h2>
<h2>Profiles</h2>

<v-data-table
      v-bind:headers="headersProfiles"
      v-bind:items="itemsProfiles"
    >
    <template slot="items" scope="props">
      <!-- <td>{{ user.name }}</td> -->
      <td>{{ props.item['.key'] }}</td>
      <td>{{ props.item.email }}</td>
      <td>{{ props.item.created_at }}</td>
    </template>
</v-data-table>

<h2>Markers</h2>

<v-data-table
      v-bind:headers="headersMarkers"
      v-bind:items="itemsMarkers"
    >
    <template slot="items" scope="props">
      <!-- <td>{{ user.name }}</td> -->
      <td>{{ props.item['.key'] }}</td>
      <td>{{ props.item.description }}</td>
      <td>{{ props.item.created_at }}</td>
      <td>{{ props.item.created_by }}</td>
      <td>{{ props.item.location.lat }} <br /> {{ props.item.location.lng }}</td>
      <td>{{ props.item.types }}</td>
      <td>{{ props.item.year }}</td>
    </template>
</v-data-table>

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
      headersProfiles: [
          { text: 'ID' },
          { text: 'Email' },
          { text: 'sss' }
      ],
      headersMarkers: [
          { text: 'ID' },
          { text: 'Description' },
          { text: 'Created_at' },
          { text: 'Created_by' },
          { text: 'Location' },
          { text: 'types' },
          { text: 'year' }
      ],
      itemsProfiles: this.$root.profiles,
      itemsMarkers: this.$root.markers,
      users: {
        'email': this.email,
        'password': this.password
      }
    }
  }
}
// this.$firebaseRefs.users.push({name: 'Tom Bombadil'})
</script>
