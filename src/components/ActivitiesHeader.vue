<template>
  <v-card class="px-5 mb-5 sticky-list-header">
    <v-row>
      <v-col
        cols="12"
        :md="isPayin ? '5' : '4'"
        class="d-flex align-center"
      >
        <b>Project</b>
      </v-col>
      <v-col
        v-if="!isPayin"
        cols="12"
        md="4"
        class="d-flex align-center"
      >
        <b>Employee</b>
      </v-col>
      <v-col
        cols="12"
        :md="isPayin ? '5' : '3'"
        class="d-flex align-center justify-end"
      >
        <b>Amount ({{ CURRENCY_SYMBOL }})</b>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import {CURRENCY_SYMBOL} from '@/enums';

export default {
  name: 'ActivitiesListHeader',
  props: {
  },
  data() {
    return {
      CURRENCY_SYMBOL,
    };
  }
};
</script>
<style scoped>
.sticky-list-header {
  position: sticky;
  top: 64px;
  z-index: 3;
}
</style>