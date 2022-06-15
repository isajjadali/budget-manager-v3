<template>
  <div>
    <v-col
      v-if="isLoading"
      cols="12"
      md="12"
      class="d-flex justify-center"
    >
      <LoaderView />
    </v-col>
    <v-row
      v-for="item in currentList"
      v-else
      :key="item.id"
    >
      <v-col
        cols="12"
      >
        <h3> {{ getSectionLabel(item.date) }}</h3>
      </v-col>
      <v-col
        v-for="activity in item.Activities"
        :key="activity.id"
        cols="12"
      >
        <ActivitiesItem
          :activity="activity"
          @itemClicked="onItemClick(item, $event)"
          @delete="onActivityDelete"
        />
      </v-col>
    </v-row>
    <MessageComponent
      v-if="!currentList.length && !isLoading"
      :message="notFoundMessage"
      style="height: calc(100vh - (64px + 72px + 24px + 60px))"
    >
      <template>
        <ModalActivitiesCreate
          @save="onActivityCreate"
        />
      </template>
    </MessageComponent>
    <ModalEdit
      :activity="activeActivity"
      :is-open="toggleModalOpen"
      :projects="projects"
      :employees="employees"
      @cancel="OnCancel"
      @save="OnSave"
    />
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import ActivitiesItem from './ActivitiesItem.vue';
import ModalEdit from './ModalEdit.vue';
import LoaderView from './LoaderView.vue';
import MessageComponent from './MessageComponent.vue';
import ModalActivitiesCreate from './ModalActivitiesCreate.vue';

export default {
  name: 'ActivitiesListing',
  components: {
    ActivitiesItem,
    ModalEdit,
    LoaderView,
    MessageComponent,
    ModalActivitiesCreate,
  },
  props: {
    isLoading: Boolean,
    fetchData: {
      type: Function,
      default: () => {
      }
    },
    params: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data: () => ({
    toggleModalOpen: false,
    activitiesDates: [],
    activeActivity: {},
    loadingMessage: '',
    notFoundMessage: '',
  }),
  computed: {
    ...mapState('global', ['activities', 'projects', 'employees']),
    currentList() {
      return this.activities;
    },
  },
  methods: {
    ...mapActions('global', ['updateActivity', 'deleteActivity']),

    onItemClick(item, activity) {
      this.toggleModalOpen = true;
      this.activeActivity = {...activity, date: item.date};
    },
    getSectionLabel(date) {
      const today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      today.setMilliseconds(0);
      const compDate = new Date(date);
      compDate.setHours(0);
      compDate.setMinutes(0);
      compDate.setSeconds(0);
      compDate.setMilliseconds(0);
      const diff = today.getTime() - compDate.getTime();
      if (compDate.getTime() == today.getTime()) {
        return 'Today';
      } else if (diff === (24 * 60 * 60 * 1000)) {
        return 'Yesterday';
      } else {
        return date; // or format it what ever way you want
      }
    },
    async OnSave(activity) {
      await this.updateActivity(activity);
      await this.fetchData({forceRefresh: true, params: this.params});
      this.toggleModalOpen = false;
    },
    OnCancel() {
      this.toggleModalOpen = false;
    },
    async onActivityDelete(activity) {
      await this.deleteActivity(activity);
      await this.fetchData({forceRefresh: true, params: this.params});
    },
    async onActivityCreate() {
      await this.fetchData({forceRefresh: true, params: this.params});
    },
  },
  mounted() {
    this.loadingMessage = 'Getting Activities Please Wait !!';
    this.notFoundMessage = 'Activities Not Found !!';
  }
};
</script>
