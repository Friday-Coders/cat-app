<template>
  <router-link :to="{ name: 'Cat Details', params: { catId: cat.id } }">
    <div class="card">
      <img :src="cat.url">
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
@import "../styles/variables.scss";

.card {
  height: 100%;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  border: 5px solid transparent;
  transition: all 0.2s ease-out;

  &::before {
    content: "Meow!";
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    color: transparent;
    font-size: 2em;
    font-family: $paragraphFont;
    font-weight: bold;
    transition: all 0.2s ease-out;
  }

  &:hover {
    border-color: $primaryColor;

    &::before {
      color: white;
      background: rgba(black, 0.4);
    }
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
