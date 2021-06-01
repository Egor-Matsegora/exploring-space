<template src="./Home.html">
</template>

<script lang="ts">
import Vue from "vue";
import { Api } from "@/api";

export default Vue.extend({
  name: "Home",
  data() {
    return {
      api: new Api()
    }
  },
  methods: {},
  created() {
    // this.api.getDataForMainSlider().subscribe();
  }
});
</script>
