<template>
  <v-container>
    <ModalActivitiesCreate />
    <v-row>
      <v-col cols="12">
        <ActivitiesList />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ModalActivitiesCreate from '../../components/ModalActivitiesCreate.vue';
import ActivitiesList from '../../components/ActivitiesList.vue';

export default {
  name: 'ActivitiesListPage',
  components: {
    ModalActivitiesCreate,
    ActivitiesList,
  },
};
</script>
