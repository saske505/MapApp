<template>
  <div v-if="this.location">
    {{ this.location.more }}

  </div>
</template>

<script>
  import { find } from 'lodash'

  export default {
    data () {
      return {
        location: null
      }
    },
    mounted () {
      if (navigator.onLine) {
        this.location = find(this.$root.location, (location) => location['.key'] === this.$route.params.id)
      } else {
        this.location = JSON.parse(localStorage.getItem('locations'))[this.$route.params.id]
      }
    }
  }
</script>

<style scoped>

</style>
