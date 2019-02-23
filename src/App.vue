<template>
  <div id="app" class="wrapper">
    <top-nav/>
    <router-view @loading:on="turnOnLoading" @loading:off="turnOffLoading"/>
    <Loading v-show="isLoading" :isLoading="isLoading"/>
  </div>
</template>

<script>
import TopNav from "@/components/TopNav.vue";
import Loading from "@/components/Loading.vue";

export default {
  components: {
    TopNav,
    Loading
  },
  data: function() {
    return {
      isLoading: false,
      loadingTimeOut: null
    };
  },
  methods: {
    turnOnLoading: function() {
      if (this.loadingTimeOut) clearTimeout(this.loadingTimeOut);
      this.loadingTimeOut = setTimeout(() => {
        this.isLoading = true;
      }, 100);
    },
    turnOffLoading: function() {
      if (this.loadingTimeOut) clearTimeout(this.loadingTimeOut);
      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss">
@import "normalize-scss";
@import "tachyons";
@import "./styles/variables.scss";
@import "./styles/global.scss";
@include normalize();
</style>
