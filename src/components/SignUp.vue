<template>
    <v-form>
      <v-text-field label='Name'></v-text-field>
      <v-text-field label='Surname'></v-text-field>
      <v-text-field label="Email"
                    v-model="email"
                    required></v-text-field>
      <v-text-field label="Password"
                    v-model="password"
                    required></v-text-field>
      <v-btn color='primary' v-on:click="signUp">Register</v-btn>
      <p>If you already have an account <router-link to="/login">login</router-link> here</p>
      <v-card>
        <v-card-text>

            <a class="btn-large social facebook pt-2 pb-2">
              <v-icon>mdi-facebook</v-icon> Register with Facebook
            </a>
            <br />
            <br />
            <a class="btn-large social google pt-2 pb-2"><v-icon>mdi-google</v-icon> Register with Google</a>

        </v-card-text>
      </v-card>
    </v-form>
</template>

<script>
  import firebase from 'firebase'
  import('@/assets/css/materialdesignicons.min.css')
  import('../../node_modules/materialize-social/materialize-social.css')

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
