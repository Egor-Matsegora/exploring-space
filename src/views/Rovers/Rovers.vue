<template src="./Rovers.html"></template>
<style lang="sass" src="./Rovers.sass" scoped></style>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import RoversNav from './components/RoversNav/RoversNav.vue';

export default Vue.extend({
  name: 'rovers',
  components: {
    RoversNav,
  },
  beforeRouteUpdate(to, from, next) {
    this.setActiveRover(to.params.rover);
    next();
  },
  methods: {
    ...mapActions(['setActiveRover']),
  },
});
</script>
