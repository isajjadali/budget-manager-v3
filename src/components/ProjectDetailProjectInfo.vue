<template>
  <v-card width="50%" elevation="1">
    <v-row>
      <v-col cols="12" sm="6" md="12">
        <v-row class="ma-0">
          <v-col cols="12" sm="4" md="4">
            <span class="details-header"> Details</span>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="ma-0">
          <v-col cols="12" sm="" md="6" class="pb-0">
            <span> Project Name </span>  <h3 class="pt-0"> {{ project.name}} </h3>
          </v-col>
          <v-col cols="12" sm="" md="6">
            <span> Client Email </span>  <h3 class="pt-0"> {{ project.clientEmail}} </h3>
          </v-col>
          <v-col class="pt-0 pb-0 my-0">
            <span> Address </span>  <h3 class="pt-0"> {{ clientAddress }} </h3>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="pt-0">
        <v-row class="ma-0">
          <v-col cols="12" sm="4" md="4">
            <span class="details-header"> Duration </span>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="ma-0">
          <v-col cols="12" sm="6" md="6">
            <span> Start Date </span>  <h3 class="pt-0"> {{ projectStartDate }} </h3>
          </v-col>
          <v-col cols="8" sm="6" md="6">
            <span> Expected End Date </span>  <h3 class="pt-0"> 2022-06-20 </h3>
          </v-col>
          <v-col cols="12" sm="6" md="6"> 
            <span> Days Left </span>  <h3 class="pt-0"> 20 Days </h3>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
    }
  },
  computed: {
    clientAddress() {
      if (this.project.clientAddress) {
        return this.project.clientAddress;
      }
      return "Not Found"
    },
    projectStartDate() {
      return this.project.createdAt.split(':')[0];
    },
    daysLeft() {
      return 20;
    },
  },
}
</script>

<style>
.details-header {
  font-size: 18px;
}
</style>