<template>
  <v-form v-model="isValid">
    <v-card>
      <v-card-title class="px-7"> How was Project {{project.name}} ..?? </v-card-title>
      <v-card-text>
        <v-alert
          dense
          text
          type="error"
        >
          Estimated End Date was <b>{{projectDate}}</b> and Current Date is <b>{{currentDate}}</b>
        </v-alert>
        <v-col cols="12" md="12" class="pb-0">
          <v-radio-group
            v-model="selection"
            mandatory
          >
            <v-radio
              label="It Went Well"
              value="It Went Well"
            ></v-radio>
            <v-radio
              label="It was Average"
              value="It was Average"
            ></v-radio>
            <v-radio
              label="Delayed"
              value="Delayed"
            ></v-radio>
            <v-radio
              label="Other"
              value="Other"
              id="1"
            ></v-radio>
          </v-radio-group>
        </v-col>
        <v-col
          v-if="selection === 'Other' || selection === 'Delayed'"
          cols="12" 
          md="12"
          class="pt-0"
        >
          <v-textarea
            v-model="message"
            :label="selection === 'Other' ? 'Custom Message' : 'Reason For Delay'"
            :rules="[required]"
            rows="4"
          >
          </v-textarea>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="12"
          class="d-flex justify-end pb-5 pr-0"
        >
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
        </v-col>
      </v-card-text>
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
      message: '',
      selection: '',
      isOtherSelected: false,
      isValid: false,
      required: (value) => !!value || 'Required',
      currentDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    };
  },
  computed: {
    projectDate() {
      return '2021-05-13'
    },
  },
  methods: {
    onCancel() {
      this.$emit('cancel');
      this.message = '';
      this.selection = '';
    },
    onSave() {
      if (this.selection === 'Delayed') {
        this.message = 'Reason: ' + this.message;
      }
      if (this.selection === 'Other' || this.selection === 'Delayed') {
        this.selection = '';
      }
      this.$emit('save', {selectionMessage: this.selection, message: this.message});
      this.message = '';
      this.selection = '';
    },
  },
}
</script>