<template src="./Home.html">
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
  name: "Home",
  methods: {
    ...mapActions(['fetchMainSliderDataWithStorage'])
  },
  created() {
    this.fetchMainSliderDataWithStorage();
  }
});
</script>
