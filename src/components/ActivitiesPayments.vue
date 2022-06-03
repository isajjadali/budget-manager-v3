<template>
  <v-container class="grey lighten-4">
    <v-row >
    <v-col class="green--text pb-0" cols="12" sm="6" md="6">
      <p> {{ amountTitle }} </p>
    </v-col>
    <v-col cols="12" sm="6" md="6" class="green--text d-flex justify-end pb-0">
      <h2><b>{{ CURRENCY_SYMBOL }}</b> {{ amountPaid }}</h2>
    </v-col>
    
    <v-col v-if="!isPayin" cols="12" sm="6" md="6" class="red--text py-0">
      <p> Pending </p>
    </v-col>
    <v-col v-if="!isPayin" cols="12" sm="6" md="6" class="red--text d-flex justify-end py-0">
      <h2> <b>{{ CURRENCY_SYMBOL }}</b> {{ amountPending }}</h2>
    </v-col>
  </v-row>
  </v-container>
</template>

<script>
import { CURRENCY_SYMBOL } from '@/enums';
import {flatMap, map, filter, sumBy} from 'lodash';

export default {
  data:() => {
    return {
      CURRENCY_SYMBOL,
      amountTitle: "",
    }
  },
  props: {
    currentList: [],
    isPayin: {
      type: Boolean,
    },
  },
  computed: {
    allActivities() {
      return flatMap(map(this.currentList, a => a.Activities));
    },
    amountPaid() {
      return sumBy(filter(this.allActivities, 'isPaid'), 'amount');
    },
    amountPending() {
      return sumBy(filter(this.allActivities, {isPaid: false}), 'amount');
    },
  },
  mounted() {
    if (this.isPayin) {
      this.amountTitle = "Total Received";
    } else {
      this.amountTitle = "Paid";
    }
  },
}
</script>
