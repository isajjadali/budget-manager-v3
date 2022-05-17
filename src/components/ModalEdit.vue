<template>
  
    <v-dialog 
      v-model="isOpen"
      persistent
      width="600px"
      transition="dialog-bottom-transition"
    >
    <v-col cols="12">
      <ActivitiesUpdate
      :currentData="activity" 
      :projects="projects"
      :employees="employees"
      @cancel="onCancel"
      @save="onSave"
    />
    </v-col>
    </v-dialog>
  
</template>

<script>
import ActivitiesUpdate from './ActivitiesUpdate.vue';
export default {
  components: {
    ActivitiesUpdate,
  },
  data: () => ({
    disableSaveBtn: false
  }),
  props: {
    isOpen: {
      type: Boolean,
    },
    activity: {
      type: Object,
    },
    projects: [],
    employees: [],
  },
  methods: {
    onCancel() {
      this.$emit('cancel');
    },
    onSave() {
      this.$emit('save', this.activity);
    }
  },
}
</script>