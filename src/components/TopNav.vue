<template>
  <div class="top-nav tc">
    <p>MEOW!🐱‍👤</p>
    <div>
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopNav"
};
</script>

<style scoped lang="scss">
.top-nav {
}
</style>
