<template src="./RoversForm.html"></template>
<style lang="sass" src="./RoversForm.sass" scoped></style>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

import { TRootState } from '@/store/types';
import { TRoversState } from '@/store/modules/rovers/types';

export default Vue.extend({
  name: 'RoversForm',
  computed: {
    ...mapState({
      loading(state: TRootState) {
        return (state.rovers as TRoversState).manifestLoading;
      },
    }),
  },
});
</script>
