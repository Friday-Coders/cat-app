<template>
  <div>
    <img :src="cat.url" />
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

<style lang="scss" scoped></style>
