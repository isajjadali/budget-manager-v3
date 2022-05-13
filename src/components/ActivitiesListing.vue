<template>
  <div>
    <h1>{{toggleModalOpen}}</h1>
    <v-row v-for="j in activities" :key='j.id'>
      <v-col cols='12'>
        <h3>{{getSectionLabel(j.date)}}</h3>
      </v-col>
      <v-col cols='12' v-for='activity in j.Activities' :key="activity.id">
        <ActivitiesItem 
          :activity="activity" 
          @itemClicked="OnActivityClick" 
        />
      </v-col>
    </v-row>
    <ModalEdit 
      :activity="activeActivity"
      :isOpen="toggleModalOpen"
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
    activeActivity: {
      type: Object,
    }
  }),
  components: {
    ActivitiesItem,
    ModalEdit,
  },
  methods: {
    ...mapActions("global", ["fetchAllActivities"]),

    OnActivityClick(activity) {
      this.toggleModalOpen = true;
      this.activeActivity = activity;
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
      await updateActivity(activity);
      this.toggleModalOpen = false;
    },
    OnCancel() {
      this.toggleModalOpen = false;
    },
  },
  computed: {
    ...mapState("global", ["activities", "updateActivity"]),
  },
  mounted() {
    this.fetchAllActivities();
  },
};
</script>
