<template>
  <div>
    <input type="file" name="cat-photo" @change="addPhoto">
    <img :src="catPhoto">
    <button @click="uploadPhoto">Upload</button>
    <button @click="removePhoto">Remove</button>
  </div>
</template>

<script>
export default {
  name: "Upload",
  data: function() {
    return {
      catPhoto: null,
      dropzoneOptions: {
        dictDefaultMessage: "Upload Cat Image"
      }
    };
  },
  methods: {
    addPhoto: function(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.catPhoto = e.target.result;
      };
      reader.readAsDataURL(files[0]);
    },
    uploadPhoto: function() {
      console.log("uploaded photo");
    },
    removePhoto: function() {
      this.catPhoto = "";
    }
  }
};
</script>
