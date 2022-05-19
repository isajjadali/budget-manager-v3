<template>
  <div style="width: 100%">
    <v-col
      v-for="filter in availableFilters"
      :key="filter.name"
      cols="12"
      md="12"
    >
      <component
        :is="filter.component"
        v-bind="filter.props"
        v-on="filter.listeners"
      />
    </v-col>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {VSelect, VTextField} from 'vuetify/lib';

export default {
  name: 'AvailableFilters',
  props: {
    activeFiltersValues: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    ...mapState('global', ['employees', 'projects']),
    availableFilters() {
      return [this.employeeIdsFilter, this.projectIdsFilter]
        .filter((filter) => !!this.activeFiltersValues[filter.name])
        .map((filter) => ({
          ...filter,
          props: {
            value: this.activeFiltersValues[filter.name],
            ...filter.props,
          },
          listeners: {
            input: (data) => this.emitChange({[filter.name]: data}),
            ...filter.listeners,
          }
        }));
    },
    employeeIdsFilter() {
      return {
        name: 'employeeIds',
        props: {
          items: this.employees.map((employee) => ({label: employee.fullName, value: `${employee.id}`})),
          label: 'Select Employee',
          itemText: 'label',
          itemValue: 'value',
          multiple: true,
          chips: true,
          clearable: true,
          deletableChips: true,
        },
        component: VSelect,
      };
    },
    projectIdsFilter() {
      return {
        name: 'projectIds',
        props: {
          items: this.projects.map((projects) => ({label: projects.name, value: `${projects.id}`})),
          label: 'Select Project',
          itemText: 'label',
          itemValue: 'value',
          multiple: true,
          chips: true,
          clearable: true,
          deletableChips: true,
        },
        component: VSelect,
      };
    }
  },
  methods: {
    emitChange(updatedFilter) {
      this.$emit('change', {...this.activeFiltersValues, ...updatedFilter});
    }
  }
};
</script>
