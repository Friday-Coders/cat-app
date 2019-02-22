<template>
  <div class="home">
    <Grid :cats="cats" />
  </div>
</template>

<script>
import CatApiService from "../services/CatApiService.js";
import Grid from "@/components/Grid.vue";

export default {
  name: "home",
  components: {
    Grid
  },
  data: function() {
    return {
      cats: [],
      fact: "No fact",
      page: 0
    };
  },
  created: async function() {
    this.getMyCat();
  },
  methods: {
    getMyCat: async function() {
      const returnedCats = await CatApiService.getMyImages();
      this.cats = returnedCats;
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
}
</style>
