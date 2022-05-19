<template>
  <div>
    <v-row class="d-flex justify-end">
      <v-col cols="12" sm="6" md="6" class="d-flex justify-end py-0">
        <h3 class="green--text">Amount Paid: {{ CURRENCY_SYMBOL }} {{ amountPaid }} </h3>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-end">
      <v-col cols="12" sm="6" md="6" class="d-flex justify-end py-0">
        <h3 class="red--text">Amount payable: {{ CURRENCY_SYMBOL }}{{ amountPending }}</h3>
      </v-col>
    </v-row>
    <v-row
      v-for="item in currentList"
      :key="item.id"
    >
      <v-col cols="12">
        <h3>{{ getSectionLabel(item.date) }}</h3>
      </v-col>
      <v-col
        v-for="activity in item.Activities"
        :key="activity.id"
        cols="12"
      >
        <ActivitiesItem
          :is-payin="isPayin"
          :activity="activity"
          @itemClicked="onItemClick(item, $event)"
          @delete="onActivityDelete"
        />
      </v-col>
    </v-row>
    <ModalEdit
      :is-payin="isPayin"
      :activity="activeActivity"
      :is-open="toggleModalOpen"
      :projects="projects"
      :employees="employees"
      @cancel="OnCancel"
      @save="OnSave"
    />
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import { flatMap, map, filter, sumBy} from 'lodash';
import ActivitiesItem from './ActivitiesItem.vue';
import ModalEdit from './ModalEdit.vue';
import { CURRENCY_SYMBOL } from "@/enums";

export default {
  name: 'ActivitiesListing',
  components: {
    ActivitiesItem,
    ModalEdit,
  },
  props: {
    isPayin: {
      type: Boolean,
    },
    fetchData: {
      type: Function,
      default: () => {
      }
    },
    params: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data: () => ({
    CURRENCY_SYMBOL,
    toggleModalOpen: false,
    activitiesDates: [],
    activeActivity: {},
  }),
  computed: {
    ...mapState('global', ['activities', 'payins', 'projects', 'employees']),
    currentList() {
      if (this.isPayin) {
        return this.payins;
      }
      return this.activities;
    },
    allActivities() {
      return flatMap(map(this.activities, a => a.Activities));
    },
    amountPaid() {
      return sumBy(filter(this.allActivities, 'isPaid'), 'amount');
    },
    amountPending() {
      return sumBy(filter(this.allActivities, {isPaid: false}), 'amount');
    }
  },
  methods: {
    ...mapActions('global', ['updateActivity', 'deleteActivity', 'updatePayin', 'deletePayin']),

    onItemClick(item, activity) {
      this.toggleModalOpen = true;
      this.activeActivity = {...activity, date: item.date};
    },
    getSectionLabel(date) {
      const today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      today.setMilliseconds(0);
      const compDate = new Date(date);
      compDate.setHours(0);
      compDate.setMinutes(0);
      compDate.setSeconds(0);
      compDate.setMilliseconds(0);
      const diff = today.getTime() - compDate.getTime();
      if (compDate.getTime() == today.getTime()) {
        return 'Today';
      } else if (diff <= (24 * 60 * 60 * 1000)) {
        return 'Yesterday';
      } else {
        return date; // or format it what ever way you want
      }
    },
    async OnSave(activity) {
      if (this.isPayin) {
        await this.updatePayin(activity);
      } else {
        await this.updateActivity(activity);
      }

      await this.fetchData({forceRefresh: true, params: this.params});
      this.toggleModalOpen = false;
    },
    OnCancel() {
      this.toggleModalOpen = false;
    },
    async onActivityDelete(activity) {
      if (this.isPayin) {
        alert('Payin Deleted');
      } else {
        await this.deleteActivity(activity);
      }
      await this.fetchData({forceRefresh: true, params: this.params});
    },
  },
};
</script>
