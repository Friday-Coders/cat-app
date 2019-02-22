<template>
  <div>
    <button @click="deepDream">Deep Dream</button>
    <button>COOL 🕶</button>
    <button v-if="this.isMine" @click="deleteCat">Delete</button>
    <button @click="writeOnImage">Write On Image</button>
    <div>
      <img :src="image" />
    </div>
  </div>
</template>

<script>
import CatApiService from "../services/CatApiService.js";
import DeepAIService from "../services/DeepAIService.js";
import MemeGeneratorService from "../services/MemeGeneratorService.js";

export default {
  name: "Cat-Details",
  data: function() {
    return {
      id: this.$route.params.catId,
      image: null,
      isMine: false
    };
  },
  created: function() {
    this.getCatDetails();
    this.checkIfMine();
  },
  methods: {
    getCatDetails: async function() {
      const returnedCat = await CatApiService.getImage(this.id);
      this.image = returnedCat.url;
      console.log("fetched cat data", returnedCat);
    },
    checkIfMine: async function() {
      const mycats = await CatApiService.getMyImages();
      this.isMine = mycats.some(cat => cat.id == this.id);
    },
    deepDream: async function() {
      const response = await DeepAIService.deepDream(this.image);
      this.image = response.output_url;
    },
    deleteCat: async function() {
      await CatApiService.deleteImage(this.id);
      this.$router.push("/");
    },
    writeOnImage: function() {
      const response = MemeGeneratorService.generateMemeFromImageUrl(
        this.image,
        "Hello",
        "Hello World"
      );

      this.image = response;
    }
  }
};
</script>
