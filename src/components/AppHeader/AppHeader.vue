<template src="./AppHeader.html"></template>

<style
  lang="sass"
  src="./AppHeader.sass"
  scoped
></style>

<script lang="ts">
import Vue from 'vue';
import Logo from '@/components/Logo/Logo.vue';
import HeaderNav from '@/components/HeaderNav/HeaderNav.vue';

export default Vue.extend({
  name: 'AppHeader',
  components: {
    Logo,
    HeaderNav
  }
})
</script>