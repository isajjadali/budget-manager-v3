<template>
  <v-form v-model="isValid">
    <v-card width="100%">
      <v-card-text>
        <v-row class="ma-0 pt-1">
          <v-col
            cols="12"
            sm="6"
            md="6"
          >
            <h2 class="py-5">Send Invoice to Client</h2>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="project.clientEmail"
                  label="Client Email"
                  :rules="[rules.required]"
                  :hide-details="true"
                />
              </v-col>
              <v-col
                cols="12"
              >
                <v-textarea
                  v-model="project.clientAddress"
                  label="Client Address"
                  rows="3"
                  :rules="[rules.required]"
                  :hide-details="true"
                />
              </v-col>
            </v-row>
            <v-col cols="12">
              <v-textarea
                v-model="invoiceNotes"
                label="Message For Client"
                rows="8"
                auto-grow
                clearable
                prepend-inner-icon="mdi-comment"
              />
            </v-col>
          </v-col>
          <v-divider vertical />
          <v-col
            cols="12"
            sm="6"
            md="6"
            style="min-height: 60vh"
          >
            <ProjectInvoicePreview :project-id="project.id" />
          </v-col>
        </v-row>
        <v-spacer />
        <v-col cols="12" class="d-flex justify-end pb-5">
          <v-btn
            color="blue darken-1"
            text
            @click="onCancel"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            rounded
            :disabled="!isValid || !isMailSent"
            :loading="!isMailSent"
            @click="onSave"
          >
            Save
          </v-btn>
        </v-col>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script>
import ProjectInvoicePreview from '@/components/ProjectInvoicePreview.vue';
import { mapActions } from "vuex";

export default {
  components: {
    ProjectInvoicePreview
  },
  props: {
    project: {
      type: Object,
    },
    isMailSent: {
      type: Boolean,
    },
  },
  data: () => {
    return {
      rules: {
        required: (value) => !!value || 'Required',
      },
      isValid: false,
      invoiceNotes: '',
      objURL: null,
    };
  },
  methods: {
    ...mapActions('global', ['fetchPreviewPDF']),
    onCancel() {
      this.$emit('cancel');
    },
    onSave() {
      this.$emit('save', {...this.project, message: this.invoiceNotes});
    },
  },
  async mounted() {
    this.objURL = await this.fetchPreviewPDF(this.project.id);
  },
}
</script>