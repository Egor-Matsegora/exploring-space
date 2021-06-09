<template src="./InputField.html"></template>
<style lang="sass" src="./InputField.sass" scoped></style>

<script lang="ts">
import Vue from 'vue';
import { v4 as uuid } from 'uuid';

export default Vue.extend({
  name: 'InputField',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: 'label',
    },
    info: {
      type: String,
    },
    error: {
      type: () => true,
    },
  },
  data: () => ({ id: uuid() }),
  watch: {
    value() {
      this.$emit('input', this.value);
    },
  },
});
</script>
