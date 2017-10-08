<template>
  <div class="login">
    <v-form v-model="valid">
      <v-text-field label="Email"
                    v-model="email"
                    :rules="emailRules"
                    :counter="10"
                    required></v-text-field>
      <v-text-field label="Password"
                    v-model="password"
                    :rules="passwordRules"
                    required></v-text-field>
      <button v-on:click="signIn">Sign in</button>
      <span>Don't have an account yet? <router-link to="/sign-up">create one</router-link> here</span>
    </v-form>
  </div>
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
