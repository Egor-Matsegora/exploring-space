<template src="./App.html"></template>

<style
  lang="sass"
  src="./App.sass"
></style>

<script lang="ts">
import Vue from 'vue';
import AppHeader from '@/components/AppHeader/AppHeader.vue';

import { mapActions } from 'vuex';

export default Vue.extend({
  components: {
    AppHeader
  },
  methods: {
    ...mapActions(['unsubscribeAll'])
  },
  beforeDestroy() {
    this.unsubscribeAll();
  }
})
</script>
