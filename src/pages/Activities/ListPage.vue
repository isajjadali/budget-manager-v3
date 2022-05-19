<template>
  <v-container>
    <v-row>
      <v-col cols='12' class="d-flex justify-end">
        <ModalActivitiesCreate :isPayin="false"/>
      </v-col>
      <v-col cols="12">
        <ActivitiesList :isPayin="false" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ModalActivitiesCreate from '../../components/ModalActivitiesCreate.vue';
import ActivitiesList from '../../components/ActivitiesList.vue';

export default {
  name: 'ActivitesListPage',
  components: {
    ModalActivitiesCreate,
    ActivitiesList,
  },
};
</script>
