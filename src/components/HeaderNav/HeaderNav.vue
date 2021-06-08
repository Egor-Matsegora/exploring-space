<template src="./HeaderNav.html"></template>

<style lang="sass" src="./HeaderNav.sass" scoped></style>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

import { TRootState } from '@/store/types';
import { TRoversState } from '@/store/modules/rovers/types';

export default Vue.extend({
  name: 'HeaderNav',
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    changeOpenFlag(): void {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
  computed: {
    ...mapState({
      rover(state: TRootState) {
        return (state.rovers as TRoversState).activeRover;
      },
    }),
  },
});
</script>
