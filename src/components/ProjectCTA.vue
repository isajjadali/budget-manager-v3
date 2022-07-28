<template>
  <v-dialog 
    ref="dialog"
    v-model="isOpen"
    persistent
    transition="dialog-bottom-transition"
    style="overflow: hidden !important"
    :width="project.status === ProjectStatus.draft ? '90%' : '550px'"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        rounded
        color="primary"
        v-bind="attrs"
        v-on="on"
        :disabled="isDisabled"
        @click="buttonClick"
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
        :isExpectedEndDate="project.expectedEndDate ? true : false"
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
    isDisabled: {
      type: Boolean,
      default() {
        return false;
      }
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
    ...mapActions('global', ['sendForReview', 'startProject', 'completeProject']),
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
      try {
        const response = await this.sendForReview(project);
        this.isMailSent = true;
        this.isOpen = false;
        this.$toast.success(response.message);
        this.$router.push({ name: 'all-projects' });
      } catch (e) {
        this.$refs.dialog.animateClick();
        this.$toast.error(e.data.error);
        this.isMailSent = true;
      } 
    },
    async onConfirmationSave() {
      this.isOpen = false;
      this.project.status = this.ProjectStatus.onGoing;
      const response = await this.startProject(this.project);
      this.$toast.success(response.message);
      this.$router.push({ name: 'all-projects' });
    },
    async onCompletionSave(review) {
      this.isOpen = false;
      if (review.selectionMessage) {
        const value = {...this.project, feedback: review.selectionMessage};
        await this.completeProject(value);
      } else {
        const value = {...this.project, feedback: review.message};
        const response = await this.completeProject(value);
        this.$toast.success('Complete Project!');
      }
      this.$router.push({ name: 'all-projects' });
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
  mounted() {
  },
}
</script>
<style>
.v-dialog{
  overflow-y: hidden !important;
}
</style>