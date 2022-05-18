<template>
  <v-container>
    <v-row>
      <v-col cols='12' class="d-flex justify-end">
        <ModalActivitiesCreate :isPayin="true" />
      </v-col>
      <v-col cols="12">
        <ActivitiesList :isPayin="true" :fetchData="fetchAllPayins" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import ModalActivitiesCreate from '../../components/ModalActivitiesCreate.vue';
import ActivitiesList from '../../components/ActivitiesList.vue';

export default {
  name: 'PayinsListPage',
  methods: {
    ...mapActions('global', ['fetchAllPayins']),
  },
  components: {
    ModalActivitiesCreate,
    ActivitiesList,
  },
};
</script>
