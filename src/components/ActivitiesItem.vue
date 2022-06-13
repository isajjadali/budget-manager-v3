<template>
  <div class="text--primary">
    <v-hover>
      <template #default="{ hover }">
        <v-card
          :elevation="hover ? 18 : 3"
          class="px-5 py-1 lighten-4"
          :class="activity.isPaid ? 'green' : 'red'"
          @click="onItemClick"
        >
          <v-row>
            <v-col
              cols="12"
              sm="1"
              md="1"
              class="ma-0 pr-0"
            >
              <v-icon v-if="activity.isLabour">
                mdi-format-list-bulleted-square
              </v-icon>
              <v-icon v-else-if="activity.isMaterial">
                mdi-plus
              </v-icon>
              <v-icon v-else>
                mdi-minus
              </v-icon>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              :md="isActivityTypeLabour ? '4' : '5'"
              class="d-flex align-center pl-0"
            >
              {{ projectName }}
            </v-col>
            <v-col
              v-if="isActivityTypeLabour"
              cols="12"
              sm="6"
              md="2"
              class="d-flex align-center"
            >
              {{ activity.employee.fullName }}
            </v-col>
            <v-col
              cols="12"
              sm="6"
              :md="isActivityTypeLabour ? '4' : '5'"
              class="d-flex justify-end align-center"
            >
              <span><b>{{ CURRENCY_SYMBOL }}</b> {{ activity.amount }}</span>
            </v-col>
            <v-col
              cols="12"
              :md="isActivityTypeLabour ? '1' : '1'"
              class="d-flex justify-end align-center"
            >
              <DropDownMenu @onActionSelected="onActionSelected" />
            </v-col>
            <ConfirmationModal
              :toggle-dialog="toggleConfirmationModal"
              @cancel="onCancel"
              @delete="onDelete"
            />
          </v-row>
        </v-card>
      </template>
    </v-hover>
  </div>
</template>

<script>
import {CURRENCY_SYMBOL} from '@/enums';
import ConfirmationModal from './ConfirmationModal.vue';
import DropDownMenu from './DropDownMenu.vue';

export default {
  components: {
    ConfirmationModal,
    DropDownMenu,
  },
  props: {
    activity: {
      type: Object,
      required: true,
    },
    isPayin: {
      type: Boolean,
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
      return this.activity.project?.name || 'No Project';
    },

    isActivityTypeLabour() {
      if (this.activity.type === 'LABOUR') {
        return true;
      }
      return false;
    }
  },
  methods: {
    onItemClick() {
      this.$emit('itemClicked', this.activity);
    },
    onActionSelected(Action) {
      if (Action == 'Edit') {
        this.$emit('itemClicked', this.activity);
      } else {
        this.toggleConfirmationModal = true;
      }
    },
    onCancel() {
      this.toggleConfirmationModal = false;
    },
    onDelete() {
      this.toggleConfirmationModal = false;
      this.$emit('delete', this.activity);
    },
  },
};
</script>
