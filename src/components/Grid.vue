<template>
  <div class="grid">
    <infinite-loading>
      <Card v-for="cat in cats" :cat="cat" :key="cat.id"/>
    </infinite-loading>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  name: "Grid",
  components: {
    Card
  },
  props: {
    cats: Array
  }
};
</script>

<style lang="scss" scoped>
.grid {
}
</style>

