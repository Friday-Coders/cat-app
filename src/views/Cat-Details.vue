<template>
  <div>
    <button @click="deepDream">Deep Dream</button>
    <button @click="coolifyCat" :disabled="disableCool">COOL 🕶</button>
    <button v-if="this.isMine" @click="deleteCat">Delete</button>
    <button @click="writeOnImage">Write On Image</button>
    <div>
      <canvas ref="canvas" class="canvas" v-show="showCanvas"></canvas>
      <img ref="catPhoto" class="cat-photo" v-show="!showCanvas" :src="image">
    </div>
  </div>
</template>

<script>
import CatApiService from "../services/CatApiService.js";
import DeepAIService from "../services/DeepAIService.js";
import MemeGeneratorService from "../services/MemeGeneratorService.js";

import sunglasses from "../assets/sunglasses.png";

export default {
  name: "Cat-Details",
  data: function() {
    return {
      id: this.$route.params.catId,
      image: null,
      isMine: false,
      showCanvas: false,
      context: null
    };
  },
  computed: {
    disableCool: function() {
      return !this.showCanvas || !this.image;
    }
  },
  watch: {
    image: function(value) {
      this.drawImageOnCanvas(value);
    }
  },
  created: function() {
    this.getCatDetails();
    this.checkIfMine();
  },
  mounted: function() {
    console.log(this.$refs);
    this.context = this.$refs.canvas.getContext("2d");
  },
  methods: {
    getCatDetails: async function() {
      this.$emit("loading:on");
      const returnedCat = await CatApiService.getImage(this.id);
      this.image = returnedCat.url;
      const extension = returnedCat.url.split(".").pop();
      this.showCanvas = extension !== "gif";
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
    coolifyCat: function() {
      const catFaces = kittydar.detectCats(this.$refs.canvas);
      if (!catFaces.length) {
        this.$toasted.show("Sorry, this cat ain't cool enough", {
          position: "bottom-right",
          duration: 5000,
          className: "toaster",
          type: "error",
          theme: "bubble",
          singleton: true
        });
      } else {
        catFaces.forEach(({ x, y, height, width }) => {
          const vm = this;
          const sunGlassesImg = new Image();
          sunGlassesImg.crossOrigin = "Anonymous";
          sunGlassesImg.onload = function() {
            vm.context.drawImage(sunGlassesImg, x, y, height, width);
          };
          sunGlassesImg.src = sunglasses;
        });
      }
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
    },
    drawImageOnCanvas: function(imgSrc) {
      const vm = this;
      var img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = function() {
        vm.$refs.canvas.height = vm.$refs.catPhoto.height;
        vm.$refs.canvas.width = vm.$refs.catPhoto.width;
        vm.context.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          0,
          0,
          vm.$refs.canvas.width,
          vm.$refs.canvas.height
        );
      };
      img.src = imgSrc;
    }
  }
};
</script>

<style lang="scss" scoped>
.cat-photo,
.canvas {
  max-width: 80vw;
  max-height: 80vh;
  object-fit: contain;
}
</style>
