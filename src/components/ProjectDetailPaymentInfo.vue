<template>
  <v-expansion-panels
    v-model="panel"
  >
    <v-expansion-panel>
      <v-expansion-panel-header>
        <v-row class="pa-0">
          <v-col cols="12" sm="6" md="6" class="px-1 payment-header-font">
            {{ panelHeader }}
          </v-col>
          <v-col cols="12" sm="6" md="6" class="px-6 d-flex justify-end">
            <span 
              :class="isPayoutCost? 'black--text amount-font': 'red--text amount-font' "
            > 
              {{ CURRENCY_SYMBOL}} {{ panelHeaderCost }}
            </span>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row class="my-0 pa-0 pt-0 pb-0">
            <v-col cols="12" md="7" class="px-1">
              <span> {{ firstAmountTitle }} </span>
            </v-col>
            <v-col cols="12" md="5" class="d-flex justify-end amount-font px-5">
              {{ CURRENCY_SYMBOL }} {{ firstAmount }}
            </v-col>
          </v-row>
          <v-row class="my-0 pa-0">
            <v-col cols="12" md="7" class="px-1 pt-0 pb-0">
              <span> {{ secondAmountTitle }} </span>
            </v-col>
            <v-col cols="12" md="5" class="d-flex justify-end amount-font px-5 pt-0 pb-1">
              {{ CURRENCY_SYMBOL }} {{ secondAmount }}
            </v-col>
          </v-row>
        </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import {CURRENCY_SYMBOL} from '@/enums';

export default {
  props: {
    project: {
      type: Object,
    },
    isPayoutCost: Boolean,
  },
  data: () => {
    return {
      panelHeader: "",
      firstAmountTitle: "",
      secondAmountTitle: "",
      CURRENCY_SYMBOL,
      panel: null,
    };
  },
  computed: {
    firstAmount() {
      if (this.isPayoutCost) {
        return this.project.totalMaterialCost;
      }
      return this.project.projectMaterialSpending;
    },
    secondAmount() {
      if (this.isPayoutCost) {
        return this.project.totalLaborCost;
      }
      return this.project.projectLabourSpending;
    },
    panelHeaderCost() {
      if (this.isPayoutCost) {
        return this.project.projectCost;
      } else {
        let total = +this.project.projectLabourSpending;
        if (this.project.projectMaterialSpending) {
          total += +this.project.projectMaterialSpending;
        }
        return total;
      }
    },
  },
  mounted() {
    if (this.isPayoutCost) {
      this.panelHeader = "Total Project Cost";
      this.firstAmountTitle = "Total Material Cost";
      this.secondAmountTitle = "Total Labour Cost";
    } else {
      this.panelHeader = "Total Amount Spent";
      this.firstAmountTitle = "Total Material Spending";
      this.secondAmountTitle = "Total Labour Spending";
    }
  },
}
</script>

<style>
.amount-font {
  font-size: 19px;
  font-weight: 500;
}
.payment-header-font {
  font-size: 16px;
  font-weight: 450;
}
</style>