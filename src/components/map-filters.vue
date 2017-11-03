<template>
  <div class="map-filter-btn">
    <v-bottom-sheet v-model="sheet">
      <v-btn slot="activator" color="purple" dark>Filter Map</v-btn>
      <v-list>
        <v-subheader>Filter by</v-subheader>
        <v-list-tile
          v-for="tile in tiles"
          :key="tile.title"
          @click="sheet = false"
        >
          <v-list-tile-avatar>
            <v-avatar size="32px" tile>
              <v-icon v-html="tile.icon" v-bind:color="tile.color"></v-icon>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-bottom-sheet>
  </div>
</template>

<script>
  export default {
    data: () => ({
      sheet: false,
      tiles: [
        { icon: 'search', title: 'Latest' },
        { icon: 'list', title: 'Confirmed' },
        { icon: 'home', title: 'Option1' },
        { icon: 'warning', title: 'Option2' },
        { icon: 'edit', title: 'Option2' }
      ]
    })
  }
</script>

<style>
.map-filter-btn {
  position: fixed;
  right: 10px;
  top: 20px;
  z-index: 10000;
}
</style>
