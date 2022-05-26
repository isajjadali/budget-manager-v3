<template>
  <v-component>
    <v-row>
      
    <v-card width="100%">
      <v-row class="ma-0 pa-0">
        <v-col cols="12" sm="5" md="2">
          <v-avatar color="grey lighten-2" size="48">
            <v-icon>
              mdi-account-circle
            </v-icon>
          </v-avatar>
        </v-col>
        <v-col class="pt-3" cols="12" sm="6" md="8">
          <h1>{{ employee.fullName }} </h1>
          <caption> {{ employee.email }} </caption>
        </v-col>
        <v-col class="d-flex justify-end" cols="12" sm="1" md="2">
          <DropDownMenu @onActionSelected="onActionSelected" />
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="mx-1 mt-1">
        <v-col cols="12" sm="6" md="6">
          <span> Balance </span>
        </v-col>
        <v-col class="d-flex justify-end" cols="12" sm="6" md="6">
          <span> Rate </span>
        </v-col>
      </v-row>
      <v-row class="mx-1 mt-0">
        <v-col cols="12" sm="6" md="6">
          <h4> {{ CURRENCY_SYMBOL }} {{ employee.balance }} </h4>
        </v-col>
        <v-col class="d-flex justify-end" cols="12" sm="6" md="6">
          
          <h4> {{ CURRENCY_SYMBOL }} {{ employee.rate }} </h4>
        </v-col>
      </v-row>

      <v-divider></v-divider>
      <v-row class="ma-0">
        <v-col class="d-flex justify-center">
          <v-btn
            text
            color="light-blue"
            @click="activityButtonClick, reveal = true"
          >
            Activities
          </v-btn>
        </v-col>
      </v-row>
      <ConfirmationModal 
        :toggleDialog="toggleConfirmationModal" 
        @cancel="onCancel"
        @delete="onDelete"
      />
    </v-card> 
    </v-row>
  </v-component>
</template>

<script>
import DropDownMenu from './DropDownMenu.vue';
import ConfirmationModal from './ConfirmationModal.vue';
import {CURRENCY_SYMBOL} from '@/enums';

export default {
  props: {
    employee: {
      type: Object,
    },
  },
  data: () => {
    return {
      toggleConfirmationModal: false,
      CURRENCY_SYMBOL,
    };
  },
  methods: {
    onActionSelected(action) {
      if (action == "Edit") {
        this.$emit('editEmployee', this.employee);
      } else {
        this.toggleConfirmationModal = true;
        this.$emit('deleteEmployee', this.employee);
      }
    },
    activityButtonClick() {
      this.$emit('activityLink', this.employee);
    },
    onCancel() {
      this.toggleConfirmationModal = false;
    },
    onDelete() {
      this.toggleConfirmationModal = false;
      this.$emit('delete', this.employee);
    },
  },
  components: {
    DropDownMenu,
    ConfirmationModal,
  },
}
</script>