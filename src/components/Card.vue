<template>
  <router-link :to="{ name: 'Cat Details', params: { catId: cat.id } }">
    <div class="card">
      <img :src="cat.url" />
    </div>
  </router-link>
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
  height: 100%;
  width: 100%;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
