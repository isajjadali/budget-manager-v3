<template>
  <v-row>
    <v-col
      cols="12"
      md="12"
    >
      <v-row class="justify-center">
        <v-col
          cols="12"
          md="3"
          class="pt-0"
        >
          <CustomDatePicker
            :persist-data="true"
            :range="availableFilters.range"
            persist-data-key="payins"
            @change="onRangeChange"
            @init="onRangeChange"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col
      cols="12"
      sm="0"
      md="3"
      class="pt-0"
    >
      <v-card
        elevation="4"
        class="pa-0 filter-sidebar"
      >
        <ActivitiesPayments
          :current-list="payins"
          :is-payin="true"
        />
        <div class="px-5 pt-5 d-flex justify-center">
          <ModalActivitiesCreate
            :is-payin="true"
            @save="onPayinCreate"
          />
        </div>
        <v-row class="pa-5">
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
        :is-loading="isLoadingData.payins"
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
import CustomDatePicker from '@/components/CustomDatePicker/CustomDatePicker';
import {RANGE_VALUE_MAP} from '@/components/CustomDatePicker/date-picker-config';

export default {
  name: 'PayinsListPage',
  components: {
    ModalActivitiesCreate,
    ActivitiesList,
    AvailableFilters,
    ActivitiesListHeader,
    ActivitiesPayments,
    CustomDatePicker,
  },
  data() {
    return {
      availableFilters: {projectIds: [], range: []},
    };
  },
  computed: {
    ...mapState('global', ['payins', 'isLoadingData']),
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
  created() {
    const {projectIds, range} = this.$route.query;
    if (projectIds) {
      this.availableFilters.projectIds = projectIds.split(',');
    }
    if (range) {
      this.availableFilters.range = range.split(',');
    }
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
    async onPayinCreate() {
      await this.fetchAllPayins({forceRefresh: true, params: this.filtersForAPI});
    },
    onRangeChange({type, range}) {
      this.fetchAllPayins({
        forceRefresh: true,
        params: {
          ...this.filtersForAPI,
          range: range.join(',')
        }
      });

      if (type === RANGE_VALUE_MAP.customRange) {
        this.availableFilters = Object.assign(this.availableFilters, {range});
      } else {
        this.availableFilters = Object.assign(this.availableFilters, {range: []});
      }

      this.$router.replace({
        name: 'all-payins',
        query: {
          ...this.filtersForAPI,
        }
      }).catch((e) => e);
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-sidebar {
  height: calc(100vh - (64px + 24px + 20px + 60px));
  position: sticky;
  top: calc(64px + 24px);
  max-width: 100%;
}
</style>