<template>
  <div class="loading flex flex-column items-center justify-center">
    <img class="cat-loader" src="../assets/cat-loader.svg">
    <div class="loading-text">Loading...</div>
    <blockquote class="fact">"{{ fact }}"</blockquote>
  </div>
</template>

<script>
import CatFactsService from "../services/CatFactsSerivece.js";

export default {
  name: "Loading",
  data: function() {
    return {
      fact:
        localStorage.getItem("fact") ||
        'The french tuxedo kitty, Félix, aka "Astrocat", was the first cat to go to space. She survived the trip.'
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
@import "../styles/variables.scss";

.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba($backgroundColor, 0.9);
}

.loading-text {
  font-size: 2em;
  font-family: $headerFont;
}

.cat-loader {
  max-width: 35vw;
  margin-bottom: 20px;
}

.fact {
  font-size: 1.5em;
  font-family: $paragraphFont;
  text-align: center;
  font-style: italic;
  max-width: 65vw;
}
</style>
