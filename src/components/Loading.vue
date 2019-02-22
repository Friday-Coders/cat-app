<template>
  <div>
    <div>Loading</div>
    <p>{{ fact }}</p>
  </div>
</template>

<script>
export default {
  name: "Loading",
  data: function() {
    return {
      fact: localStorage.getItem("fact") || "blah blah"
    };
  },
  created: function() {
    this.getFact();
  },
  methods: {
    getFact: function() {
      console.log("fetched cat fact");
    }
  }
};
</script>
