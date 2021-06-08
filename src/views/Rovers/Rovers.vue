<template src="./Rovers.html"></template>
<style lang="sass" src="./Rovers.sass" scoped></style>

<script lang="ts">
import { roversMutationTypesEnum } from '@/store/modules/rovers/mutations/mutation-types';
import Vue from 'vue';
import { mapMutations } from 'vuex';
import RoversNav from './components/RoversNav/RoversNav.vue';

export default Vue.extend({
  name: 'rovers',
  components: {
    RoversNav,
  },
  methods: {
    ...mapMutations([roversMutationTypesEnum.SET_ACTIVE_ROVER]),
  },
  beforeRouteUpdate(to, from, next) {
    this[roversMutationTypesEnum.SET_ACTIVE_ROVER](to.params.rover);
    next();
  },
});
</script>
