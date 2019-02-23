<template>
  <div class="upload-container">
    <file-upload
      ref="upload"
      :drop="true"
      @input="addPhoto"
      extensions="jpg,gif,png,webp"
      :class="['file-upload', { drag: dropActive }]"
      v-if="!catPhoto"
      >Drop image here ➕</file-upload
    >
    <router-link
      v-else
      :event="catId ? 'click' : ''"
      :to="{ name: 'Cat Details', params: { catId } }"
    >
      <div :class="['cat-photo', { uploaded: catId }]">
        <img :src="catPhoto" />
      </div>
    </router-link>
    <div class="btns">
      <button class="btn cool" @click="uploadPhoto" :disabled="disableUpload">
        Upload
      </button>
      <button class="btn danger" @click="removePhoto" :disabled="disableRemove">
        Remove
      </button>
    </div>
  </div>
</template>

<script>
import CatApiService from "../services/CatApiService.js";

export default {
  name: "Upload",
  data: function() {
    return {
      catId: null,
      catPhoto: null,
      catFile: null,
      uploaded: false,
      dropActive: false
    };
  },
  computed: {
    disableRemove: function() {
      return !this.catPhoto;
    },
    disableUpload: function() {
      return !this.catPhoto || this.uploaded;
    }
  },
  mounted: function() {
    this.$watch("$refs.upload.dropActive", function(value) {
      this.dropActive = value;
    });
  },
  methods: {
    addPhoto: function(fileObj) {
      const vm = this;
      console.log(fileObj[0]);
      this.catFile = fileObj[0].file;
      var reader = new FileReader();
      reader.onload = e => {
        vm.catPhoto = e.target.result;
      };
      reader.readAsDataURL(fileObj[0].file);
    },
    uploadPhoto: async function() {
      this.$emit("loading:on");
      this.uploaded = true;
      const response = await CatApiService.uploadImage(this.catFile);
      if (response.approved) {
        this.catId = response.id;
        this.$toasted.show("Uploaded successfully", {
          position: "bottom-right",
          duration: 5000,
          className: "toaster",
          type: "success",
          theme: "bubble",
          singleton: true
        });
      } else {
        this.$toasted.show("Does this look like a cat to you? 😾", {
          position: "bottom-right",
          duration: 5000,
          className: "toaster",
          type: "error",
          theme: "bubble",
          singleton: true
        });
      }
      this.$emit("loading:off");
      console.log("uploaded photo", response);
    },
    removePhoto: function() {
      this.catPhoto = "";
      this.uploaded = false;
      this.catId = null;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.file-upload {
  width: 100%;
  flex: 1;
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  border: 5px dashed $primaryColor;
  border-radius: 10px;
  font-size: 1.8em;
  font-weight: bold;
  font-family: $paragraphFont;

  &.drag {
    border-color: $secondaryColor;
    background: rgba($secondaryColor, 0.1);
  }
}

.cat-photo {
  position: relative;
  width: 100%;
  max-height: 60vh;
  border-radius: 10px;
  transition: all 0.2s ease-out;
  border: 5px solid transparent;

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }

  &.uploaded {
    border-color: $primaryColor;
    cursor: pointer;

    &::before {
      content: "Meow!";
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: transparent;
      color: transparent;
      font-size: 2em;
      font-family: $paragraphFont;
      font-weight: bold;
      transition: all 0.2s ease-out;
    }
  }
  &.uploaded:hover {
    &::before {
      color: white;
      background: rgba(black, 0.4);
    }
  }
}

.btns {
  display: flex;
  width: 100%;
}
</style>
