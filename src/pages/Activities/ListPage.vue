<template>
  <v-container>
    <v-row>
      <v-col cols='12' class="d-flex justify-end">
        <ModalActivitiesCreate />
      </v-col>
      <v-col cols="12">
        <ActivitiesListing />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ModalActivitiesCreate from '../../components/ModalActivitiesCreate.vue';
import ActivitiesListing from '../../components/ActivitiesListing.vue';

export default {
  name: 'ActivitesListPage',
  components: {
    ModalActivitiesCreate,
    ActivitiesListing,
  },
};
</script>
