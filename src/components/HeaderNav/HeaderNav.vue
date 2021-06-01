<template src="./HeaderNav.html"></template>

<style lang="sass" src="./HeaderNav.sass" scoped></style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'HeaderNav',
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    changeOpenFlag(): void {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
})
</script>