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
            <v-row>
              <v-col
                cols="12"
                md="6"
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
                md="6"
              >
                <v-text-field
                  v-model="project.clientAddress"
                  label="Client Address"
                  :rules="[rules.required]"
                  :hide-details="true"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea
                  label="Message For Client"
                  rows="3"
                  auto-grow
                  clearable
                  prepend-inner-icon="mdi-comment"
                />
              </v-col>
            </v-row>
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
      </v-card-text>
      <v-card-actions class="pa-5">
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="onCancel"
        >
          cancel
        </v-btn>
        <v-btn
          color="primary"
          rounded
          :disabled="!isValid"
          @click="onSave"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import ProjectInvoicePreview from '@/components/ProjectInvoicePreview.vue';

export default {
  components: {
    ProjectInvoicePreview
  },
  props: {
    project: {
      type: Object,
    },
  },
  data: () => {
    return {
      rules: {
        required: (value) => !!value || 'Required',
      },
      isValid: false,
    };
  },
  methods: {
    onCancel() {
      this.$emit('cancel');
    },
    onSave() {
      this.$emit('save', this.project);
    },
  },
};
</script>