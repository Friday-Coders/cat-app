<template>
  <div class="home">
    <Grid :cats="cats" @loadMore="getMyCat" />
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
      this.$emit("loading:on");
      const returnedCats = await CatApiService.getMyImages({
        page: this.page++,
        limit: 20,
        order: "DESC"
      });
      this.cats = [...this.cats, ...returnedCats];
      this.$emit("loading:off");
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
}
</style>
