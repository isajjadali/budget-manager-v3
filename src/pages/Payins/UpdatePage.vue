<template>
  <p v-if="!currentPayin">
    <b> Invalid ID </b>
  </p>
  <ActivitiesUpdate
    v-else
    :currentData="currentPayin"
    :employees="employees"
    :projects="projects"
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
    ...mapState('global', ['projects', 'payins', 'employees']),
    currentPayin() {
      const id = this.$route.params.id;
      if (id) {
        const payin = this.payins.find((payin) => payin.id === +id);
        return payin;
      }
      return null;
    },
  },
  methods: {
    ...mapActions('global', ['fetchAllPayins', 'updatePayin']),

    onCancel() {
      this.$router.push({ name: 'all-payins' });
    },

    onSave(payin) {
      this.updatePayin(payin);
      this.$router.push({ name: 'all-payins' });
    },
  },
  mounted() {
    this.fetchAllPayins();
  },
};
</script>
