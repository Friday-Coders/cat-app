<template>
  <div class="cat-details">
    <div class="cat-container">
      <canvas ref="canvas" class="canvas" v-show="!isAnimated"></canvas>
      <img
        ref="catPhoto"
        class="cat-photo"
        @load="drawImageOnCanvas"
        :src="image"
      />
    </div>
    <div class="btns">
      <button class="dream btn" @click="deepDream">Deep Dream ✨</button>
      <button class="cool btn" @click="coolifyCat" :disabled="disableCool">
        COOL 🕶
      </button>
      <button class="meme btn" @click="writeOnImage">Memeow? 🐱</button>
      <button class="danger btn" v-if="this.isMine" @click="deleteCat">
        Delete ❌
      </button>
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
      isAnimated: false,
      isMemefied: false,
      isCoolified: false,
      context: null,
      imageUrl: null,
      originalImage: null
    };
  },
  watch: {
    imageUrl: function(newUrl) {
      this.loadImgAsBase64(newUrl);
    }
  },
  computed: {
    disableCool: function() {
      return this.isAnimated || !this.image;
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
      this.imageUrl = returnedCat.url;
      this.originalImage = returnedCat.url;
      const extension = returnedCat.url.split(".").pop();
      this.isAnimated = extension === "gif";
      this.$emit("loading:off");
      console.log("fetched cat data", returnedCat);
    },
    checkIfMine: async function() {
      const mycats = await CatApiService.getMyImages();
      this.isMine = mycats.some(cat => cat.id == this.id);
    },
    deepDream: async function() {
      this.$emit("loading:on");
      const response = await DeepAIService.deepDream(this.originalImage);
      this.imageUrl = response.output_url;
      this.$emit("loading:off");
    },
    coolifyCat: function() {
      this.$refs.catPhoto.crossOrigin = "Anonymous";
      const catFaces = kittydar.detectCats(this.$refs.catPhoto);
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
          sunGlassesImg.onload = function() {
            vm.context.drawImage(sunGlassesImg, x, y, height, width);
          };
          sunGlassesImg.src = sunglasses;
          this.isCoolified = true;
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
        this.imageUrl,
        "meow memeow?",
        "meowy meow moew",
        this.$refs.catPhoto.width,
        this.$refs.catPhoto.height
      );
      this.imageUrl = response;
      this.$refs.catPhoto.onload = function() {
        vm.$emit("loading:off");
      };
    },
    drawImageOnCanvas: function() {
      const vm = this;
      vm.$refs.canvas.height = vm.$refs.catPhoto.height;
      vm.$refs.canvas.width = vm.$refs.catPhoto.width;
      vm.context.clearRect(
        0,
        0,
        vm.$refs.catPhoto.width,
        vm.$refs.catPhoto.height
      );
    },
    loadImgAsBase64: function(url) {
      let canvas = document.createElement("CANVAS");
      let img = new Image();
      img.setAttribute("crossorigin", "anonymous");
      img.src = "https://cors-anywhere.herokuapp.com/" + url;

      img.onload = () => {
        canvas.height = img.height;
        canvas.width = img.width;
        let context = canvas.getContext("2d");
        context.drawImage(img, 0, 0);
        let dataURL = canvas.toDataURL("image/png");
        this.image = dataURL;
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.cat-details {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.btns {
  display: flex;
  flex-wrap: wrap;
}

.cat-container {
  // text-align: center;
  position: relative;
  margin: 0 auto;
}

.cat-photo,
.canvas {
  max-width: 80vw;
  max-height: 60vh;
  object-fit: contain;
  margin: 0 auto;
  border-radius: 5px;
}

.canvas {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
