<template>
  <div>

<h2>Database add</h2>
<form v-model="users">
  <p>
    Clicing on a button bellow to create data.
  </p>
  <v-btn @click="createProfile" color="primary">Create Profile</v-btn>
  <v-btn @click="createMarker" color="primary">Create Marker</v-btn>
</form>
</div>
</template>

<script>
// import VueFire from 'vuefire'
// import {db} from '@/firebase'

export default {
  name: 'db-add',
  methods: {
    createProfile () {
      console.log('add record')
      this.$root.$firebaseRefs.profiles.push(
        {
          'username': 'test123',
          'name': 'John',
          'surname': 'Doe',
          'email': 'test123@test.com',
          'created_at': '9th Feb 2015',
          'types': [
            'Assualt',
            'Robbery'
          ],
          'last_login': '10th Mar 2016'
        }
      )
    },
    createMarker () {
      console.log('add marker record')
      console.log(this.$refs)
      this.$root.$firebaseRefs.markers.push(
        {
          'created_at': '9th Feb 2015',
          'created_by': '-KwEYpEZI6l__y7_vWKF',
          'description': 'Something happened',
          'location': {
            'lat': -25.7583818,
            'lng': 27.9177589
          },
          'types': [
            'Assualt',
            'Robbery'
          ],
          'year': '2006'
        }
      )
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
