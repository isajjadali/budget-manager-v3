<template>
  <v-dialog 
    v-model="dialog" 
    persistent 
    max-width="600px"
  >
    <template #activator="{ on, attrs }">
      <v-btn 
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
      >
        Create Payin
      </v-btn>
    </template>
    <v-col cols="12">
      <PayinsCreate
        :projects="projects"
        @cancel="onClose"
        @save="onSave"
      />
    </v-col>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import PayinsCreate from './PayinsCreate.vue';

export default {
  components: {
    PayinsCreate,
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapState('global', ['projects']),
  },
  methods: {
    ...mapActions('global', ['createPayin']),
    onClose() {
      this.dialog = false;
      this.$emit('close');
    },
    async onSave(newPayin) {
      await this.createPayin(newPayin);
      this.$emit('save', newPayin);
      this.dialog = false;
    },
  },
};
</script>
