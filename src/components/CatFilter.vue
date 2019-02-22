<template>
  <div class="filter">
    <v-select placeholder="Order" v-model="order" :options="orderOptions"></v-select>
    <v-select placeholder="Type" v-model="type" :options="typeOptions"></v-select>
    <v-select placeholder="Category" v-model="category" :options="categoryOptions"></v-select>
    <v-select placeholder="Breed" v-model="breed" :options="breedOptions"></v-select>
  </div>
</template>


<script>
export default {
  name: "cat-filter",
  data: function() {
    return {
      order: null,
      type: null,
      category: null,
      breed: null,
      orderOptions: ["Rand", "Desc", "Asc"],
      typeOptions: [
        { label: "Static", value: "jpg,png" },
        { label: "Animated", value: "gif" }
      ],
      categoryOptions:
        JSON.parse(localStorage.getItem("categoryOptions")) || [],
      breedOptions: JSON.parse(localStorage.getItem("breedOptions")) || []
    };
  },
  created: function() {
    if (!this.categoryOptions.length) this.getCategories();
    if (!this.breedOptions.length) this.getBreeds();
  },
  methods: {
    getCategories: function() {
      console.log("fetched cat categories");
    },
    getBreeds: function() {
      console.log("fetched cat breeds");
    }
  }
};
</script>

<style lang="scss" scoped>
.filter {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-gap: 5px;
}
</style>
