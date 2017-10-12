<template>
    <v-form>
      <h2>Sign up / register</h2>
      <v-text-field label="Email"
                    v-model="email"
                    :counter="10"
                    required></v-text-field>
      <v-text-field label="Password"
                    v-model="password"
                    required></v-text-field>
      <button v-on:click="signUp">Sign up</button>
      <span>if you already have an account <router-link to="/login">login</router-link> here</span>
    </v-form>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'signUp',
    data: function () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signUp: function () {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
         (user) => {
           this.$router.replace('Home')
         },
         (err) => {
           alert('nope' + err.message)
         }
        )
      }
    }
  }
</script>

<style scoped>

</style>
