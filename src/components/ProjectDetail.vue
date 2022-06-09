<template>
  <div>
    <v-row>
      <v-card width="100%">
        <v-row class="ma-0">
          <v-col cols="12" sm="6" md="6" class="px-5">
            <h3>{{ project.name }}</h3>
          </v-col>
            <v-divider vertical></v-divider>
          <v-col cols="12" sm="6" md="6" class="px-5 d-flex justify-end red--text">
            <h3><strong>20</strong> Days Left</h3>
          </v-col>
        </v-row>
      </v-card>
    </v-row>

    <v-row>
      <v-col cols="12" sm="4" md="4" class="pl-0">
        <v-expansion-panels
          v-model="panelTotalCost"
          :readonly="readonly"
          multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-row class="pa-0">
                <v-col cols="12" sm="6" md="6" class="px-1 payment-header-font">
                  Total Project Cost
                </v-col>
                <v-col cols="12" sm="6" md="6" class="px-6 d-flex justify-end amount-font">
                  {{ CURRENCY_SYMBOL}} {{ project.projectCost }}
                </v-col>
              </v-row>
            </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row class="my-0 pa-0 pt-0 pb-0">
                  <v-col cols="12" md="7" class="px-1">
                    <span class=""> Total Material Cost </span>
                  </v-col>
                  <v-col cols="12" md="5" class="d-flex justify-end amount-font px-5">
                    {{ CURRENCY_SYMBOL }} {{ project.totalMaterialCost }}
                  </v-col>
                </v-row>
                <v-row class="my-0 pa-0">
                  <v-col cols="12" md="7" class="px-1 pt-0 pb-0">
                    <span class="subHeading"> Total Labour Cost </span>
                  </v-col>
                  <v-col cols="12" md="5" class="d-flex justify-end amount-font px-5 pt-0 pb-1">
                    {{ CURRENCY_SYMBOL }} {{ project.totalLaborCost}}
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="12" sm="4" md="4" class="pr-1">
        <v-expansion-panels
          v-model="panelTotalCost"
          :readonly="readonly"
          multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-row class="pa-0">
                <v-col cols="12" sm="6" md="6" class="px-1 payment-header-font">
                  Total Amount Spent
                </v-col>
                <v-col cols="12" sm="6" md="6" class="px-6 d-flex justify-end amount-font red--text">
                  {{ CURRENCY_SYMBOL}} {{ totalAmountSpent }}
                </v-col>
              </v-row>
            </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row class="my-0 pa-0 pt-0 pb-0">
                  <v-col cols="12" md="7" class="px-1">
                    <span class=""> Total Material Spending </span>
                  </v-col>
                  <v-col cols="12" md="5" class="d-flex justify-end amount-font px-5">
                    {{ CURRENCY_SYMBOL }} {{ '12212' }}
                  </v-col>
                </v-row>
                <v-row class="my-0 pa-0">
                  <v-col cols="12" md="7" class="px-1 pt-0 pb-0">
                    <span class="subHeading"> Total Labour Spending </span>
                  </v-col>
                  <v-col cols="12" md="5" class="d-flex justify-end amount-font px-5 pt-0 pb-1">
                    {{ CURRENCY_SYMBOL }} {{ project.projectLabourSpending}}
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
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

    <v-row class="d-flex justify-center">
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
            <v-card flat>
              <v-card-title> Active Tasks</v-card-title>
              <v-card-text>
                <ProjectTasks
                  :panel="panel"
                  :projectTasks="project.tasks"
                  :isEdit="false"
                  @open="openTask"
                />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-title> Analytics </v-card-title>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-title> Info </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="5" >
                    <v-card width="100%">
                      <v-card-title>
                        Details
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-row class="pa-4">
                      <v-col cols="12" sm="" md="6">
                        <span> Project Name </span>  <h2 class="pt-0"> {{ project.name}} </h2>
                      </v-col>
                      <v-col cols="12" sm="" md="6">
                        <span> Client Email </span>  <h2 class="pt-0"> {{ project.clientEmail}} </h2>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <span> Address </span>  <h2 class="pt-0"> {{ clientAddress }} </h2>
                      </v-col>
                    </v-row>

                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="6" md="5">
                    <v-card width="100%" >
                      <v-card-title> Duration</v-card-title>
                      <v-divider></v-divider>
                      <v-row class="pa-4">
                      <v-col cols="12" sm="6" md="6">
                        <span> Start Date </span>  <h2 class="pt-0"> {{ projectStartDate }} </h2>
                      </v-col>
                      <v-col cols="8" sm="6" md="6">
                        <span> Expected End Date </span>  <h2 class="pt-0"> 2022-06-20 </h2>
                      </v-col>
                      <v-col cols="12" sm="6" md="6"> 
                        <span> Days Left </span>  <h2 class="pt-0"> 20 Days </h2>
                      </v-col>
                    </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
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

export default {
  // Todo: projectMaterialCost is missing in object & Expected End Date & Days Left is also Hard Value
  components: {
    ProjectTasks,
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
  computed: {
    totalAmountSpent() {
      const total = +this.project.projectLabourSpending;
      if (this.project.projectMaterialSpending) {
        total += +this.project.projectMaterialSpending;
      }
      return total;
    },
    clientAddress() {
      if (this.project.clientAddress) {
        return this.project.clientAddress;
      }
      return "Not Found"
    },
    projectStartDate() {
      return this.project.createdAt.split(':')[0];
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    this.project = await this.getProject(id);
    console.log(this.project);
  },
}
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
.payins-card {
  // border: 1px solid;
  margin: 3%;
  // height: 70px;
  border-radius: 10px;
  color: white;
  background: linear-gradient(286deg, #3de231, #20e40a 46%, #1bba0f);
  // background-color: green;
}

.amount-spent {
  // border: 1px solid;
  margin: 3%;
  // height: 70px;
  border-radius: 10px;
  color: white;
  background: linear-gradient(286deg, #e53c3c, #d12525 46%, #d23030);
  // background-color: green;
}

</style>