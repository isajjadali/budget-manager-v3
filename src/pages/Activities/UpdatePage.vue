<template>
  <p v-if="!currentActivity">
    <b> Invalid ID </b>
  </p>
  <ActivitiesUpdate
    v-else
    :activity="currentActivity"
    :employees="employees"
    @save="onSave"
    @cancel="onCancel"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ActivitiesUpdate from '../../components/ActivitiesUpdate.vue';

export default {
  name: 'UpdatePage',
  components: {
    ActivitiesUpdate,
  },
  computed: {
    ...mapState('global', ['activities', 'employees']),
    currentActivity() {
      const id = this.$route.params.id;
      if (id) {
        const activity = this.activities.find((activity) => activity.id === +id);
        return activity;
      }
      return null;
    },
  },
  methods: {
    ...mapActions('global', ['updateActivity', 'fetchAllEmployees']),

    onCancel() {
      this.$router.push({ name: 'all-activities' });
    },

    onSave(activity) {
      this.updateActivity(activity);
      this.$router.push({ name: 'all-activities' });
    },
  },
  mounted() {
    this.fetchAllEmployees();
  },
};
</script>
