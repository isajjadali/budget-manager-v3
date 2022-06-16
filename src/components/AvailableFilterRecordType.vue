<template>
  <div style="width: 100%">
    <h3>Record Type</h3>
    <v-list>
      <v-list-item-group multiple :value='value' color='primary'>
      <v-list-item v-for="item in ActivityTypeList" :key="item.value" :value="item.value" class="px-2 list-item" @click="onClick(item.value)">
        <v-list-item-icon class="list-icon">
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>

        <v-list-item-content class="py-0">
          <v-list-item-title>{{item.label}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import {ActivityTypeList} from '@/enums';

export default {
  name: 'AvailableFilters',
  props: {
    value: {
      type: Array,
      required: true,
    }
  },
  data: () => {
    return {
      ActivityTypeList,
    };
  },
  methods: {
    onClick(type) {
      this.$emit('click', type);
    }
  }
};
</script>

<style>
.active > * {
  color: 'blue' !important;
}
.list-item {
  height: 45px;
  cursor: pointer;
}
.list-icon {
  margin: 9px;
  margin-right: 32px;
}
</style>