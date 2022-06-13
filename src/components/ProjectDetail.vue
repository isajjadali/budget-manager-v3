<template>
  <div>
    <v-row>
      <v-card width="100%">
        <v-row class="ma-0">
          <v-col
            cols="12"
            sm="6"
            md="6"
            class="px-5"
          >
            <h3>{{ project.name }}</h3>
          </v-col>
            <v-divider vertical></v-divider>
          <v-col cols="12" sm="6" md="6" class="px-5 d-flex justify-end">
            <span :class="daysLeft > 3 ? 'green--text' : 'red--text' "> <h3><strong> {{daysLeft}} </strong> Days Left</h3> </span>
          </v-col>
        </v-row>
      </v-card>
    </v-row>

    <v-row>
      <v-col cols="12" sm="4" md="4" class="pl-0">
        <ProjectDetailPaymentInfo :isProjectCost="true" :project="project" />
      </v-col>
      <v-col cols="12" sm="4" md="4" class="pl-0">
        <ProjectDetailPaymentInfo :isProjectCost="false" :project="project" />
      </v-col>
      <v-col cols="12" sm="4" md="4" class="pl-2">
        <v-card width="100%" class="ma-3">
          <v-row class="px-4 pt-0">
            <v-col cols="12" md="7" class="payment-header-font">
              Total Amount Received
            </v-col>
            <v-col cols="12" md="5" class="d-flex justify-end amount-font green--text">
              {{ CURRENCY_SYMBOL }} {{project.projectAmountRecieved }}
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="">
      <v-col cols="12" sm="6" md="12" class="px-0">
        <v-tabs
          v-model="activeTab"
          color="black"
          background-color="grey lighten-2"
          hide-slider
        >
          <v-tab
            style="width: 180px"
            v-for="(tab, index) in tabs"
            :key="index"
          >
            {{ tab.title }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="activeTab">
          <v-tab-item>
            <v-row class="">
              <ProjectTasks
                :panel="panel"
                :projectTasks="project.tasks"
                :isEdit="false"
                @open="openTask"
              />
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-title> Analytics</v-card-title>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <ProjectDetailProjectInfo :project="project" />
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {CURRENCY_SYMBOL} from '@/enums';
import {mapActions} from 'vuex';
import ProjectTasks from './ProjectTasks.vue';
import ProjectDetailPaymentInfo from './ProjectDetailPaymentInfo.vue';
import ProjectDetailProjectInfo from './ProjectDetailProjectInfo.vue';

export default {
  // Todo: projectMaterialCost is missing in object & Expected End Date & Days Left is also Hard Value
  components: {
    ProjectTasks,
    ProjectDetailPaymentInfo,
    ProjectDetailProjectInfo,
  },
  data: () => {
    return {
      project: {
        type: Object,
      },
      panel: [],
      CURRENCY_SYMBOL,
      activeTab: null,
      tabs: [
        { title: 'Active Tasks', path: '/' },
        { title: 'Analytics', path: '/' },
        { title: 'Info', path: '/' },
      ],
    };
  },
  methods: {
    ...mapActions ('global', ['getProject']),
    openTask(task) {
      if (task === undefined) {
        this.task = task;
        if (this.panel.length && this.panel.length != 1) {
          this.panel = [];
        } else {
          this.panel = this.project.tasks.map((k, i) => i);
        }
      } else {
        this.task = task;
        // this.panel = []
      }
    },
  },
  async mounted() {
    const id = this.$route.params.id;
    this.project = await this.getProject(id);
  },
};
</script>

<style lang='scss'>
.payment-header-font {
  font-size: 16px;
  font-weight: 450;
}

.amount-font {
  font-size: 19px;
  font-weight: 500;
}

.h-amount {
  border: 1px solid;
  // margin: 2%;
  // height: 70px;
  border-radius: 10px;
  color: white;
  // background: linear-gradient(286deg, #00aeff, #0095ff 46%, #0076ff);
  background-color: crimson;
}
</style>