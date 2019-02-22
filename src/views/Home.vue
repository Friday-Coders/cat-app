<template>
  <div class="home">
    <h1 class="f1">Home</h1>
    <Grid :cats="cats" @loadMore="getRandomCat" />
    <button @click="getRandomCat">CAT!</button>
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
    this.getRandomCat();
  },
  methods: {
    getRandomCat: async function() {
      const returnedCats = await CatApiService.searchForCats({
        limit: 5,
        page: this.page++,
        order: "RANDOM"
      });
      this.cats = [...this.cats, ...returnedCats];
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
}
</style>
