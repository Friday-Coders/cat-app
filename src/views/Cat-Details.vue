<template>
  <div>
    <button @click="deepDream">Deep Dream</button>
    <button>COOL 🕶</button>
    <div>
      <img :src="image" />
    </div>
  </div>
</template>

<script>
import CatApiService from "../services/CatApiService.js";
import DeepAIService from "../services/DeepAIService.js";

export default {
  name: "Cat-Details",
  data: function() {
    return {
      id: this.$route.params.catId,
      image: null
    };
  },
  created: function() {
    this.getCatDetails();
  },
  methods: {
    getCatDetails: async function() {
      const returnedCat = await CatApiService.getImage(this.id);
      this.image = returnedCat.url;
      console.log("fetched cat data", returnedCat);
    },
    deepDream: async function() {
      console.log("Qwe");

      const response = await DeepAIService.deepDream(this.image);
      this.image = response.output_url;
    }
  }
};
</script>
