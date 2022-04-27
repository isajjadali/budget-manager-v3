<template>
  <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Create Project
        </v-btn>
      </template>
      <v-col cols='12'>
        <ProjectCreate @cancel='onClose' @save='onSave'/>
      </v-col>
    </v-dialog>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import ProjectCreate from './ProjectCreate.vue';
export default {
  components: {
    ProjectCreate,
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapState('global', ['isCreatingProject']),
  },
  methods: {
    ...mapActions('global', ['createProject']),
    onClose() {
      this.dialog = false;
      this.$emit('close')
    },
    async onSave(newProject) {
      await this.createProject(newProject);
      this.$emit('save', newProject);
      this.dialog = false;
    }
  }
}
</script>