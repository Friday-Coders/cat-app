<template>
  <div>
    <div>
      <img :src="image" />
    </div>
    <button>Deep Dream</button>
    <button>COOL 🕶</button>
  </div>
</template>

<script>
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
    getCatDetails: function() {
      console.log("fetched cat data");
    }
  }
};
</script>
