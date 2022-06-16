<template>
  <v-container class="grey lighten-4">
    <v-row>
      <v-col
        class="green--text pb-0"
        cols="12"
        sm="6"
        md="6"
      >
        <p> {{ amountTitle }} </p>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="6"
        class="green--text d-flex justify-end pb-0"
      >
        <h2><b>{{ CURRENCY_SYMBOL }}</b> {{ amountPaid }}</h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {CURRENCY_SYMBOL} from '@/enums';
import {flatMap, map, filter, sumBy} from 'lodash';

export default {
  props: {
    currentList: [],
  },
  data: () => {
    return {
      CURRENCY_SYMBOL,
      amountTitle: '',
    };
  },
  computed: {
    allActivities() {
      return flatMap(map(this.currentList, a => a.Activities));
    },
    amountPaid() {
      return sumBy(filter(this.allActivities, 'isPaid'), 'amount');
    },
  },
  mounted() {
    this.amountTitle = 'Paid';
  },
};
</script>
