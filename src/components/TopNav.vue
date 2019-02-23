<template>
  <div class="top-nav tc">
    <p class="title">MEOW!🐱‍👤</p>
    <div class="tabs">
      <router-link class="tab" to="/">Home</router-link>|
      <router-link class="tab" to="/mycats">My Cats</router-link>|
      <router-link class="tab" to="/upload">Upload</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopNav"
};
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";
.title {
  font-size: 3em;
  font-family: $headerFont;
  margin-bottom: 30px;
}

.tabs {
  font-size: 1.5em;
  font-family: $paragraphFont;

  margin-bottom: 20px;
}

.tab {
  margin: 10px;
  font-weight: 600;
  transition: all 0.2s ease-out;
  border-bottom: 2px solid transparent;

  &:hover {
    color: $accentColor;
    border-bottom: 2px solid $accentColor;
  }

  &.router-link-exact-active {
    color: $primaryColor;
    border-bottom: 2px solid $primaryColor;
  }
}
</style>
