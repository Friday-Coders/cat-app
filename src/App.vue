<template>
  <div id="app">
    <top-nav/>
    <router-view/>
  </div>
</template>

<script>
import TopNav from "@/components/TopNav.vue";

export default {
  components: {
    TopNav
  }
};
</script>

<style lang="scss">
@import "normalize-scss";
@import "tachyons";
@include normalize();
</style>
