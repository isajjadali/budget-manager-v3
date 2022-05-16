<template>
  <div class="text--primary">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card :elevation="hover ? 18 : 3" class="pa-5" @click="onItemClick">
          <v-row>
            <v-col cols="12" sm="6" md="4" class="d-flex align-center">
              {{ projectName }} 
            </v-col>
            <v-col cols="12" sm="6" md="3" class="d-flex align-center">
              {{ activity.employee.fullName }}
            </v-col>
            <v-col cols="12" sm="6" md="4" class="d-flex justify-end align-center">
              <b>{{ CURRENCY_SYMBOL }}</b> {{ activity.amount }}
            </v-col>
            <v-col cols="12" md="1" class="d-flex justify-end align-center">
              <DropDownMenu @onActionSelected="onActionSelected" />
            </v-col>
            <ConfirmationModal :toggleDialog="toggleConfirmationModal" @cancel="onCancel" @delete="onDelete"/>
          </v-row>
        </v-card>
      </template>
    </v-hover>
  </div>
</template>

<script>
import { CURRENCY_SYMBOL } from "@/enums";
import ConfirmationModal from './ConfirmationModal.vue';
import DropDownMenu from './DropDownMenu.vue';

export default {
  props: {
    activity: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      CURRENCY_SYMBOL,
      items: [{title: 'Edit', i: 1}, {title: 'Delete', i: 2}],
      toggleConfirmationModal: false,
    };
  },
  computed: {
    projectName() {
      return this.activity.project?.name || "No Project";
    },
  },
  methods: {
    onItemClick() {
      this.$emit("itemClicked", this.activity);
    },
    onActionSelected(Action) {
      if(Action == "Edit") {
        this.$emit("itemClicked", this.activity);
      }
      else {
        this.toggleConfirmationModal = true;
      }
    },
    onCancel(){
      this.toggleConfirmationModal = false;
    },
    onDelete(){
      this.toggleConfirmationModal = false;
      this.$emit('delete', this.activity);
    },
  },
  components: {
    ConfirmationModal,
    DropDownMenu,
  }
};
</script>
