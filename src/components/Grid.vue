<template>
  <div class="grid" ref="grid">
    <Card v-for="cat in cats" :cat="cat" :key="cat.id"/>
    <vue-mugen-scroll :handler="scroll" scroll-container="grid"></vue-mugen-scroll>
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
  },
  methods: {
    scroll: function() {
      console.log("scroll");
      this.$emit("loadMore");
    }
  }
};
</script>

<style lang="scss" scoped>
.grid {
  height: calc(100vh - 213px);
  overflow: auto;
}
</style>

