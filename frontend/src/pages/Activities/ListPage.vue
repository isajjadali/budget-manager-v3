<template>
  <v-container>
    <ModalActivitiesList />
    <v-row>
      <v-col cols="12">
        <ActivitiesList />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ModalActivitiesList from "../../components/ModalActivitiesCreate.vue";
import ActivitiesList from "../../components/ActivitiesList.vue";

export default {
  name: "ActivitiesListPage",
  components: {
    ModalActivitiesList,
    ActivitiesList,
  },
};
</script>
