<template>
  <div class="card">
    <img :src="cat.url">
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    cat: Object
  }
};
</script>

<style lang="scss" scoped>
.card {
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
