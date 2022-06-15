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
              <v-avatar>
                <div class="record-icon grey lighten-2">
                  <v-icon :color="iconColor">
                    {{ActivityTypeMap[activity.type].icon}}
                  </v-icon>
                </div>
              </v-avatar>
              
            </v-col>
            <v-col
              cols="12"
              sm="6"
              :md="activity.isLabour ? '4' : '5'"
              class="d-flex align-center pl-0"
            >
              {{ projectName }}
            </v-col>
            <v-col
              v-if="activity.isLabour"
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
              :md="activity.isLabour ? '4' : '5'"
              class="d-flex justify-end align-center"
            >
              <span><b>{{ CURRENCY_SYMBOL }}</b> {{ activity.amount }}</span>
            </v-col>
            <v-col
              cols="12"
              :md="activity.isLabour ? '1' : '1'"
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
import {ActivityTypeMap} from '@/enums';

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
  },
  data() {
    return {
      CURRENCY_SYMBOL,
      ActivityTypeMap,
      items: [{title: 'Edit', i: 1}, {title: 'Delete', i: 2}],
      toggleConfirmationModal: false,
    };
  },
  computed: {
    projectName() {
      return this.activity.project?.name || 'No Project';
    },

    iconColor() {
      if (!this.activity.isLabour) {
        return 'black';
      }
      return this.activity.isPaid ? 'blue' : 'red';
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
<style scoped>
.record-icon {
  --icon-size: 40px;
  width: var(--icon-size);
  height: var(--icon-size);
  border-radius: 50%;
}
</style>