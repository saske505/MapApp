<template>
  <div>
    <h2>Vuex test</h2>
    <div>
      <div id="app">
        <p>{{ count }}</p>
        <p>
          <button @click="increment">+</button>
          <button @click="decrement">-</button>
        </p>
        <p>
          <button @click="foo">foo</button>
        </p>
      </div>
    </div>
  </div>
</template>


<script>
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    'lastMapPosition': {
      lng: 0,
      lat: 0
    },
    count: 0
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--,
    bar: state => {
      console.log('hello arrow function')
      console.log(this)
      state.lastMapPosition.x = 'test'
    }
  }
})

export default {
  computed: {
    count () {
      return store.state.count
    }
  },
  methods: {
    increment () {
      store.commit('increment')
    },
    decrement () {
      store.commit('decrement')
    },
    foo () {
      store.commit('bar')
    }
  }
}
</script>
