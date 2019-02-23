<template>
  <div class="filter">
    <v-select
      placeholder="Order"
      :value="filters.order"
      :options="orderOptions"
      @input="value => this.$emit('update:filterOptions', { order: value })"
    ></v-select>
    <v-select
      placeholder="Type"
      :value="filters.mime_types"
      :options="typeOptions"
      @input="value => this.$emit('update:filterOptions', { mime_types: value })"
    ></v-select>
    <v-select
      placeholder="Category"
      :value="filters.category_ids"
      :options="categoryOptions"
      @input="value => this.$emit('update:filterOptions', { category_ids: value })"
    ></v-select>
    <v-select
      placeholder="Breed"
      :value="filters.breed_id"
      :options="breedOptions"
      @input="value => this.$emit('update:filterOptions', { breed_id: value })"
    ></v-select>
  </div>
</template>

<script>
import CatApiService from "../services/CatApiService.js";

export default {
  name: "cat-filter",
  props: ["filters"],
  data: function() {
    return {
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
    getCategories: async function() {
      const response = await CatApiService.listCategories();
      const catigories = response.map(catigory => ({
        label: catigory.name,
        value: catigory.id
      }));
      localStorage.setItem("categoryOptions", JSON.stringify(catigories));
      this.categoryOptions = catigories;
      console.log("fetched cat categories", response);
    },
    getBreeds: async function() {
      const response = await CatApiService.listBreeds();
      const breeds = response.map(breed => ({
        label: breed.name,
        value: breed.id
      }));
      localStorage.setItem("breedOptions", JSON.stringify(breeds));
      this.breedOptions = breeds;
      console.log("fetched cat breeds");
    }
  }
};
</script>

<style lang="scss" scoped>
.filter {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
}
</style>
