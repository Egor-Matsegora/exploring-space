<template src="./Observation.html"></template>

<style lang="sass" src="./Observation.sass" scoped></style>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import { required, between, numeric, or, decimal } from 'vuelidate/lib/validators';
import { v4 as uuid } from 'uuid';

import { TObservationState } from '@/store/modules/observation/types';
import { TRootState } from '@/store/types';

import Loader from '@/components/Loader/Loader.vue';
import { IObservationImageFormData } from './interfaces/ObservationImageFormDataInterface';

export default Vue.extend({
  name: 'Observation',
  components: {
    Loader,
  },
  data() {
    return {
      id: uuid(),
      longtitude: '',
      latitude: '',
      dim: '',
      date: '',
    };
  },
  validations: {
    longtitude: { required, between: between(-180, 180), or: or(decimal, numeric) },
    latitude: { required, between: between(-90, 90), or: or(decimal, numeric) },
    dim: { required, between: between(0.1, 0.9), decimal },
    date: { required },
  },
  computed: {
    ...mapState({
      loading(state: TRootState): boolean {
        return (state.observation as TObservationState).observationLoading;
      },
      imageData(state: TRootState): string | null | void {
        return (state.observation as TObservationState).observationImageData;
      },
      notExistsMessage(state: TRootState): string | null | void {
        return (state.observation as TObservationState).notExistsMessage;
      },
      maxDate() {
        const date: Date = new Date();
        const month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        const day = date.getDate().toString().length === 1 ? '0' + date.getDate() : date.getDate();
        return `${date.getUTCFullYear()}-${month}-${day}`;
      },
    }),
  },
  methods: {
    ...mapActions(['fetchObservationImage']),
    handleFormSubmit(): void {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      const data: IObservationImageFormData = {
        latitude: +this.latitude,
        longtitude: +this.longtitude,
        dim: +this.dim,
        date: this.date,
      };
      this.fetchObservationImage(data).then(() => {
        this.$v.$reset();
      });
    },
  },
});
</script>
