<template>
  <div class="home">
    <cat-filter :filters="filters" @update:filterOptions="updateFilters"/>
    <Grid :cats="cats" @loadMore="getCats"/>
  </div>
</template>

<script>
import CatApiService from "../services/CatApiService.js";
import Grid from "@/components/Grid.vue";
import CatFilter from "@/components/CatFilter.vue";

export default {
  name: "home",
  components: {
    Grid,
    CatFilter
  },
  data: function() {
    return {
      cats: [],
      fact: "No fact",
      filters: {
        limit: 20,
        page: 0,
        order: "Rand"
      }
    };
  },
  created: async function() {
    this.$emit("loading:on");
    await this.getCats();
    this.$emit("loading:off");
  },
  methods: {
    getCats: async function() {
      const returnedCats = await CatApiService.searchForCats({
        ...this.filters,
        page: this.page++
      });
      this.cats = [...this.cats, ...returnedCats];
    },
    updateFilters: async function(newFilters) {
      this.$emit("loading:on");
      Object.keys(newFilters).forEach(
        key =>
          (this.filters[key] =
            newFilters[key] && newFilters[key].value
              ? newFilters[key].value
              : newFilters[key])
      );
      Object.keys(newFilters).forEach(
        key => this.filters[key] == null && delete this.filters[key]
      );
      this.cats = [];
      this.page = 0;
      await this.getCats();
      this.$emit("loading:off");
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
}
</style>
