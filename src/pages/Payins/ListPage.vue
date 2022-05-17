<template>
  <v-container>
    <ModalPayinsCreate />
    <v-row>
      <v-col cols="12">
        <PayinsList />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ModalPayinsCreate from '../../components/ModalPayinsCreate.vue';
import PayinsList from '../../components/PayinsList.vue';

export default {
  name: 'PayinsListPage',
  components: {
    ModalPayinsCreate,
    PayinsList,
  },
};
</script>
