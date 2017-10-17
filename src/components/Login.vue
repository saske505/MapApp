<template>
    <v-form v-model="valid">
      <h2>
        Login
      </h2>
      <v-text-field label="Email"
                    v-model="email"
                    :counter="10"
                    required></v-text-field>
      <v-text-field label="Password"
                    v-model="password"
                    required></v-text-field>
      <button v-on:click="signIn">Sign in</button>
      <span>Don't have an account yet? <router-link to="/sign-up">create one</router-link> here</span>
    </v-form>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'login',
    data: function () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      valid: function () {},
      signIn: function () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('Home')
          },
          (err) => {
            alert('ooops' + err.message)
          }
        )
      }
    }
  }

</script>

<style scoped>
.login {
  margin-top:100px;
}
</style>
