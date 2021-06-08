<template src="./RoversNav.html"></template>
<style lang="sass" src="./RoversNav.sass" scoped></style>

<script lang="ts">
import Vue from 'vue';

import { RoversEnum } from '../../enums/rovers-enum';

export default Vue.extend({
  name: 'RoversNav',
  data() {
    return {
      rovers: Object.values(RoversEnum),
    };
  },
});
</script>
