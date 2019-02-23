<template>
  <div class="loading flex flex-column items-center justify-center">
    <div>Loading</div>
    <p>{{ fact }}</p>
  </div>
</template>

<script>
import CatFactsService from "../services/CatFactsSerivece.js";

export default {
  name: "Loading",
  data: function() {
    return {
      fact: localStorage.getItem("fact") || "blah blah"
    };
  },
  props: {
    isLoading: Boolean
  },
  watch: {
    isLoading: function(value) {
      if (value) {
        this.fact = localStorage.getItem("fact");
        this.getFact();
      }
    }
  },
  methods: {
    getFact: async function() {
      const response = await CatFactsService.getFact();
      localStorage.setItem("fact", response.text);
      console.log("fetched cat fact", response);
    }
  }
};
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(black, 0.4);
}
</style>
