<template src="./UiButton.html"></template>
<style lang="sass" src="./UiButton.sass" scoped></style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'UiButton',
  props: {
    disabled: {
      type: Boolean,
    },
    type: {
      validator(value: string) {
        return ['submit', 'button'].includes(value);
      },
      default: 'button',
    },
  },
});
</script>
