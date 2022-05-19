<template>
  <v-row>
      <v-col
        cols="12"
        sm="0"
        md="3"
        class="pt-0"
      >
        <v-card
          max-width="100%"
          elevation="4"
          min-height="75vh"
          class="pa-5"
        >
          <div class="d-flex justify-center">
            <ModalActivitiesCreate
              :is-payin="false"
              @save="onActivityCreate"
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
        <ActivitiesList
          :is-payin="false"
          :fetch-data="fetchAllActivities"
          :params="filtersForAPI"
        />
      </v-col>
    </v-row>
</template>

<script>
import {mapActions} from 'vuex';
import ModalActivitiesCreate from '../../components/ModalActivitiesCreate.vue';
import ActivitiesList from '../../components/ActivitiesList.vue';
import AvailableFilters from '@/components/AvailableFilters';

export default {
  name: 'ActivitesListPage',
  components: {
    ModalActivitiesCreate,
    ActivitiesList,
    AvailableFilters,
  },
  data() {
    return {
      availableFilters: {employeeIds: [], projectIds: []},
    };
  },
  computed: {
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
    const {employeeIds, projectIds} = this.$route.query;
    if (employeeIds) {
      this.availableFilters.employeeIds = employeeIds.split(',');
    }
    if (projectIds) {
      this.availableFilters.projectIds = projectIds.split(',');
    }
    this.$nextTick(() => {
      this.fetchAllActivities({params: this.filtersForAPI, forceRefresh: true});
    });
  },
  methods: {
    ...mapActions('global', ['fetchAllActivities']),
    onFilterChange(filters) {
      this.availableFilters = filters;
      this.$nextTick(() => {
        this.fetchAllActivities({forceRefresh: true, params: this.filtersForAPI});
        this.$router.replace({name: 'all-activities', query: this.filtersForAPI});
      });
    },
    onActivityCreate() {
      this.fetchAllActivities({forceRefresh: true, params: this.filtersForAPI});
    }
  },
};
</script>
