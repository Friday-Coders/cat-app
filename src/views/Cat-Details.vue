<template>
  <div>
    <button @click="deepDream">Deep Dream</button>
    <button>COOL 🕶</button>
    <button v-if="this.isMine" @click="deleteCat">Delete</button>
    <button @click="writeOnImage">Write On Image</button>
    <div>
      <img :src="image">
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
      this.$emit("loading:on");
      const returnedCat = await CatApiService.getImage(this.id);
      this.image = returnedCat.url;
      this.$emit("loading:off");
      console.log("fetched cat data", returnedCat);
    },
    checkIfMine: async function() {
      const mycats = await CatApiService.getMyImages();
      this.isMine = mycats.some(cat => cat.id == this.id);
    },
    deepDream: async function() {
      this.$emit("loading:on");
      const response = await DeepAIService.deepDream(this.image);
      this.image = response.output_url;
      this.$emit("loading:off");
    },
    deleteCat: async function() {
      this.$emit("loading:on");
      await CatApiService.deleteImage(this.id);
      this.$router.push("/");
      this.$emit("loading:off");
    },
    writeOnImage: function() {
      const vm = this;
      this.$emit("loading:on");
      const response = MemeGeneratorService.generateMemeFromImageUrl(
        this.image,
        "Hello",
        "Hello World"
      );
      this.image = response;
      const img = new Image();
      img.onload = function() {
        vm.$emit("loading:off");
      };
      img.src = response;
    }
  }
};
</script>
