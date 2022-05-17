<template>
  <v-container>
    <v-row>
      <v-col cols='12' class="d-flex justify-end">
        <ModalPayinsCreate />
      </v-col>
      <v-col cols="12">
        <ActivitiesList :isPayin="true" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ModalPayinsCreate from '../../components/ModalPayinsCreate.vue';
import ActivitiesList from '../../components/ActivitiesList.vue';

export default {
  name: 'PayinsListPage',
  components: {
    ModalPayinsCreate,
    ActivitiesList,
  },
};
</script>
