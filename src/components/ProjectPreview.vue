<template>
  <v-form v-model="isValid">
    <v-card width="100%">
      <v-card-text>
        <v-row class="ma-0 pt-1">
          <v-col cols="12" sm="6" md="6">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Client Email"
                  :rules="[rules.required]"
                  v-model="project.clientEmail"
                  :hide-details="true"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Client Address"
                  :rules="[rules.required]"
                  v-model="project.clientAddress"
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
                ></v-textarea>
              </v-col>
            </v-row>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="12" sm="6" md="6">
            <h2>*pdf File*</h2>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pa-5">
        <v-spacer></v-spacer>
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
          @click="onSave"
          :disabled="!isValid"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
export default {
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
}
</script>