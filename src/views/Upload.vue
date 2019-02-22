<template>
  <div>
    <input type="file" name="cat-photo" @change="addPhoto" />
    <img :src="catPhoto" />
    <button @click="uploadPhoto">Upload</button>
    <button @click="removePhoto">Remove</button>
  </div>
</template>

<script>
import CatApiService from "../services/CatApiService.js";

export default {
  name: "Upload",
  data: function() {
    return {
      catPhoto: null,
      catFile: null,
      dropzoneOptions: {
        dictDefaultMessage: "Upload Cat Image"
      }
    };
  },
  methods: {
    addPhoto: function(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      var vm = this;
      vm.catFile = files[0];

      var reader = new FileReader();
      reader.onload = e => {
        vm.catPhoto = e.target.result;
      };
      reader.readAsDataURL(files[0]);
    },
    uploadPhoto: async function() {
      const response = await CatApiService.uploadImage(this.catFile);
      console.log("uploaded photo", response);
    },
    removePhoto: function() {
      this.catPhoto = "";
    }
  }
};
</script>
