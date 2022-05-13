<template>
  
    <v-dialog 
      v-model="isOpen"
      persistent
      width="auto"
      transition="dialog-bottom-transition"
    >
    <ActivitiesUpdate :currentData="activity" @cancel="onCancel" @save="onSave" />
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
    }
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