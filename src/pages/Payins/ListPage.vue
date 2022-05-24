<template>
  <v-row>
    <v-col
      cols="12"
      sm="0"
      md="3"
      class="pt-0"
    >
      <v-card
        elevation="4"
        class="pa-5 filter-sidebar"
      >
      <ActivitiesPayments :currentList="payins" :isPayin="true" />
        <div class="d-flex justify-center">
          <ModalActivitiesCreate
            :is-payin="true"
            @save="onPayinCreate"
          />
        </div>
        <v-row class="pt-5">
          <AvailableFilters
            :active-filters-values="availableFilters"
            @change="onFilterChange"
          />
        </v-row>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="9"
    >
      <ActivitiesListHeader :is-payin="true" />
      <ActivitiesList
        :is-payin="true"
        :fetch-data="fetchAllPayins"
        :params="filtersForAPI"
      />
    </v-col>
  </v-row>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import ModalActivitiesCreate from '../../components/ModalActivitiesCreate.vue';
import ActivitiesList from '../../components/ActivitiesList.vue';
import AvailableFilters from '@/components/AvailableFilters';
import ActivitiesListHeader from '@/components/ActivitiesHeader';
import ActivitiesPayments from '@/components/ActivitiesPayments.vue';

export default {
  name: 'PayinsListPage',
  components: {
    ModalActivitiesCreate,
    ActivitiesList,
    AvailableFilters,
    ActivitiesListHeader,
    ActivitiesPayments,
  },
  data() {
    return {
      availableFilters: {projectIds: []},
    };
  },
  computed: {
    ...mapState('global', ['payins']),
    filtersForAPI() {
      return Object.keys(this.availableFilters).reduce((acc, key) => {
        if (Array.isArray(this.availableFilters[key])) {
          if (this.availableFilters[key].length) {
            acc[key] = this.availableFilters[key].join(',');
          }
        } else {
          acc[key] = this.availableFilters[key];
        }
        return acc;
      }, {});
    }
  },
  mounted() {
    const {projectIds} = this.$route.query;
    if (projectIds) {
      this.availableFilters.projectIds = projectIds.split(',');
    }
    this.$nextTick(() => {
      this.fetchAllPayins({params: this.filtersForAPI, forceRefresh: true});
    });
  },
  methods: {
    ...mapActions('global', ['fetchAllPayins']),
    onFilterChange(filters) {
      this.availableFilters = filters;
      this.$nextTick(() => {
        this.fetchAllPayins({forceRefresh: true, params: this.filtersForAPI});
        this.$router.replace({name: 'all-payins', query: this.filtersForAPI});
      });
    },
    onPayinCreate() {
      this.fetchAllPayins({forceRefresh: true, params: this.filtersForAPI});
    }
  },


};
</script>
<style lang="scss" scoped>
.filter-sidebar {
  height: calc(100vh - (64px + 24px + 20px));
  position: sticky;
  top: calc(64px + 24px);
  max-width: 100%;
}
</style>