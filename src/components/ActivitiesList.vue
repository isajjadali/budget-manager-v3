<template>
  <div>
    <v-row v-for="item in currentList" :key='item.id'>
      <v-col cols='12'>
        <h3>{{getSectionLabel( item.date )}}</h3>
      </v-col>
      <v-col cols='12' v-for="activity in item.Activities" :key="activity.id">
        <ActivitiesItem 
          :isPayin="isPayin"
          :activity="activity"
          @itemClicked="onItemClick(item, $event)" 
          @delete="onActivityDelete"
        />
      </v-col>
    </v-row>
    <ModalEdit
      :isPayin="isPayin"
      :activity="activeActivity"
      :isOpen="toggleModalOpen"
      :projects="projects"
      :employees="employees"
      @cancel="OnCancel"
      @save="OnSave"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ActivitiesItem from "./ActivitiesItem.vue";
import ModalEdit from "./ModalEdit.vue";

export default {
  props: {
    isPayin: {
      type: Boolean,
    },
    fetchData: {
      type: Function,
      default: () => {}
    }
  },
  name: "ActivitiesListing",
  data: () => ({
    toggleModalOpen: false,
    activitiesDates: [],
    activeActivity: {},
  }),
  components: {
    ActivitiesItem,
    ModalEdit,
  },
  computed: {
    ...mapState("global", ["activities", "payins", "projects", "employees"]),
    currentList() {
      if (this.isPayin) {
        return this.payins;
      }
      return this.activities;
    }
  },
  methods: {
    ...mapActions("global", ["updateActivity", "deleteActivity", "updatePayin", "deletePayin"]),

    onItemClick(item, activity) {
      this.toggleModalOpen = true;
      this.activeActivity = { ...activity, date: item.date};
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
          return "Today";
        } else if (diff <= (24 * 60 * 60 * 1000)) {
          return "Yesterday";
        } else { 
          return date; // or format it what ever way you want
        }
    },
    async OnSave(activity) {
      if (this.isPayin) {
        await this.updatePayin(activity);        
      }
      else {
        await this.updateActivity(activity);
      }

      await this.fetchData(true);
      this.toggleModalOpen = false;
    },
    OnCancel() {
      this.toggleModalOpen = false;
    },
    async onActivityDelete(activity){
      if(this.isPayin) {
        alert("Payin Deleted")
      }
      else {
        await this.deleteActivity(activity);
      }
      await this.fetchData(true);
    },
  },
  async mounted() {
    await this.fetchData();
  },
};
</script>
