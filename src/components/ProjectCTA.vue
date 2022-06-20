<template>
  <v-dialog 
    v-model="isOpen"
    persistent
    :width="project.status === ProjectStatus.draft ? '90%' : '550px'"
    transition="dialog-bottom-transition"
    style="overflow: hidden !important"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        rounded
        color="primary"
        @click="buttonClick"
        v-bind="attrs"
        v-on="on"
      >
        {{ buttonText }}
      </v-btn>
    </template>
    <v-col
      v-if="project.status === ProjectStatus.draft"
      cols="12" 
      class="pa-0"
    >
      <ProjectPreview
        :project="project"
        :isMailSent="isMailSent"
        @cancel="onCancel"
        @save="onPreviewSave"
      />
    </v-col>
    <v-col
      v-else-if="project.status === ProjectStatus.onGoing"
      cols="12" 
      class="pa-0"
    >
      <ProjectCompletionForm
        :project="project"
        @cancel="onCancel" 
        @save="onCompletionSave" 
      />
    </v-col>
    <ConfirmationModal
      :message="'Are you sure you want to start the project ..??'"
      :toggleDialog="toggleConfirmationDialog"
      @cancel="onCancel"
      @delete="onConfirmationSave"
    />
  </v-dialog>
</template>

<script>
import {ProjectStatus} from '@/enums';
import {mapActions} from 'vuex';
import ProjectPreview from '@/components/ProjectPreview.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import ProjectCompletionForm from '@/components/ProjectCompletionForm.vue';

export default {
  components: {
    ProjectPreview,
    ConfirmationModal,
    ProjectCompletionForm,
  },
  props: {
    project: {
      type: Object,
    },
  },
  data: () => {
    return {
      ProjectStatus,
      isOpen: false,
      toggleConfirmationDialog: false,
      isMailSent: true,
    };
  },
  methods: {
    ...mapActions('global', ['sendForReview']),
    buttonClick() {
      if (this.project.status === this.ProjectStatus.pendingReview) {
        this.toggleConfirmationDialog = true;
        return;
      }
      this.isOpen = true;
    },
    onCancel() {
      this.isOpen = false;
      this.toggleConfirmationDialog = false;
    },
    async onPreviewSave(project) {
      this.isMailSent = false;
      const response = await this.sendForReview(project);
      this.isMailSent = true;
      this.isOpen = false;
      this.$toast.success(response.message);
    },
    onConfirmationSave() {
      this.toggleConfirmationDialog = false;
      this.$toast.success('Project Started');
    },
    onCompletionSave(review) {
      this.isOpen = false;
      if (review.selectionMessage) {
        alert(review.selectionMessage);
      } else {
        alert(review.message);
      }
    },
  },
  computed: {
    buttonText() {
      if (this.project.status === this.ProjectStatus.draft) {
        return 'Send For Review';
      } else if (this.project.status === this.ProjectStatus.pendingReview) {
        return 'Start Project';
      } else if (this.project.status === this.ProjectStatus.onGoing) {
        return 'Complete Project';
      }
    },
  },
  mounted() {},
}
</script>
<style>
.v-dialog{
  overflow-y: hidden !important;
}
</style>