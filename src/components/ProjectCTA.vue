<template>
  <div>
    <v-btn
      rounded
      color="primary"
      @click="buttonClick"
    >
      {{ buttonText }}
    </v-btn>
    <v-dialog 
      v-model="isOpen"
      persistent
      :width="project.status === ProjectStatus.draft ? '90%' : '550px'"
      transition="dialog-bottom-transition"
    >
      <v-col
        v-if="project.status === ProjectStatus.draft"
        cols="12" 
        class="pa-0"
      >
        <ProjectPreview
          :project="project" 
          @cancel="onCancel"
          @save="onPreviewSave"
        />
      </v-col>
      <v-col
        v-if="project.status === ProjectStatus.onGoing"
        cols="12" 
        class="pa-0"
      >
        <ProjectCompletionForm
          :project="project"
          @cancel="onCancel" 
          @save="onCompletionSave" 
        />
      </v-col>
    </v-dialog>
    <ConfirmationModal
      :message="'Are you sure you want to start the project ..??'"
      :toggleDialog="toggleConfirmationDialog"
      @cancel="onCancel"
      @delete="onConfirmationSave"
    />
  </div>
</template>

<script>
import {ProjectStatus} from '@/enums';
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
      buttonText: '',
      isOpen: false,
      toggleConfirmationDialog: false,
    };
  },
  methods: {
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
    onPreviewSave(project) {
      this.isOpen = false;
      alert('Project Sent For Review');
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
  mounted() {
    if (this.project.status === this.ProjectStatus.draft) {
      this.buttonText = 'Send For Review';
    } else if (this.project.status === this.ProjectStatus.pendingReview) {
      this.buttonText = 'Start Project';
    } else if (this.project.status === this.ProjectStatus.onGoing) {
      this.buttonText = 'Complete Project';
    }
  },
}
</script>