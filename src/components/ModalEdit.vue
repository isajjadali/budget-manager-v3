<template>
    <v-dialog 
      v-model="isOpen"
      persistent
      width="680px"
      transition="dialog-bottom-transition"
    >
      <v-col v-if="isEmployee" cols="12">
        <EmployeeUpdate 
          :employee="employee"
          @save="onSave"
          @cancel="onCancel"
        />
      </v-col>
      <v-col v-else cols="12">
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
import EmployeeUpdate from './EmployeeUpdate.vue';

export default {
  components: {
    ActivitiesUpdate,
    EmployeeUpdate,
  },
  data: () => ({
    disableSaveBtn: false
  }),
  props: {
    activity: {
      type: Object,
    },
    employee: {
      type: Object,
    },
    isOpen: Boolean,
    projects: [],
    employees: [],
    isEmployee: {
      type: Boolean,
      default() {
        false
      }
    },
  },
  methods: {
    onCancel() {
      this.$emit('cancel');
    },
    onSave() {
      if(!this.isEmployee) {
        this.$emit('save', this.activity);
      } else {
        this.$emit('save', this.employee);
      }
    }
  },
}
</script>