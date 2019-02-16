<template>
  <div class="home">
    <h1 class="f1">Home</h1>
    <div v-for="cat in cats" :key="cat.id">
      <img :src="cat.url">
    </div>
    <button @click="getRandomCat">CAT!</button>
  </div>
</template>

<script>
import CatApiService from "../services/CatApiService.js";

export default {
  name: "home",
  data: function() {
    return {
      cats: [],
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
