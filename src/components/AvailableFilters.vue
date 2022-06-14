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
import {VSelect} from 'vuetify/lib';
import AvailableFilterRecordType from './AvailableFilterRecordType.vue';

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
  data: () => {
    return {};
  },
  computed: {
    ...mapState('global', ['employees', 'projects', 'activities']),
    availableFilters() {
      return [ this.recordTypeFilters, this.employeeIdsFilter, this.projectIdsFilter,]
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
    },
    recordTypeFilters() {
      return {
        name: 'recordType',
        listeners: {
          click: (value) => {
            let values = this.activeFiltersValues.recordType;
            
            if (values.includes(value)) {
              values = values.filter((v) => v !== value)
            } else {
              values.push(value);
            }

            this.emitChange({recordType: values});
          }
        },
        component: AvailableFilterRecordType,
      };
    },
  },
  methods: {
    emitChange(updatedFilter) {
      this.$emit('change', {...this.activeFiltersValues, ...updatedFilter});
    }
  }
};
</script>

<style>
.list-item {
  height: 45px;
  cursor: pointer;
}
.list-icon {
  margin: 9px;
  margin-right: 32px;
}
</style> 