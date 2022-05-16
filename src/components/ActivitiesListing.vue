<template>
  <div>
    <v-row v-for="item in activities" :key='item.id'>
      <v-col cols='12'>
        <h3>{{getSectionLabel(item.date)}}</h3>
      </v-col>
      <v-col cols='12' v-for='activity in item.Activities' :key="activity.id">
        <ActivitiesItem 
          :activity="activity"
          @itemClicked="OnActivityClick(item, $event)" 
          @delete="onActivityDelete"
        />
      </v-col>
    </v-row>
    <ModalEdit 
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
  name: "ActivitiesListing",
  data: () => ({
    toggleModalOpen: false,
    activeActivity: {},
  }),
  components: {
    ActivitiesItem,
    ModalEdit,
  },
  computed: {
    ...mapState("global", ["activities", "projects", "employees"]),
  },
  methods: {
    ...mapActions("global", ["fetchAllActivities", "updateActivity", "deleteActivity"]),

    OnActivityClick(item, activity) {
      this.toggleModalOpen = true;
      this.activeActivity = { ...activity, date: item.date };
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
      await this.updateActivity(activity);
      this.toggleModalOpen = false;
      this.fetchAllActivities(true);
    },
    OnCancel() {
      this.toggleModalOpen = false;
    },
    onActivityDelete(activity){
      this.deleteActivity(activity);
      this.fetchAllActivities(true);
    }
  },
  mounted() {
    this.fetchAllActivities();
  },
};
</script>
