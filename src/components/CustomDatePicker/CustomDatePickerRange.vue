<template>
  <div style="width: 100%">
    <v-radio-group
      :value="selectedRangeOption"
      @change="emitRangeOptionChange"
    >
      <v-radio
        v-for="option in availableRangeOptions"
        :key="option.id"
        :label="option.label"
        :value="option.value"
      />
    </v-radio-group>
    <div class="d-flex justify-center">
      <v-date-picker
        v-if="isCustomRangeOptionSelected"
        :value="range"
        range
        @input="emitCustomRangeInput"
        @change="emitCustomRangeChange"
      />
    </div>
  </div>
</template>

<script>
import {RANGE_OPTIONS, RANGE_VALUE_MAP} from './date-picker-config';

export default {
  name: 'CustomDatePickerRange',
  props: {
    selectedRangeOption: {
      type: [Number, String],
      required: true,
    },
    range: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      availableRangeOptions: RANGE_OPTIONS
    };
  },
  computed: {
    isCustomRangeOptionSelected() {
      return this.selectedRangeOption === RANGE_VALUE_MAP.customRange;
    }
  },
  methods: {
    emitRangeOptionChange(value) {
      this.$emit('rangeOptionChange', value);
    },
    emitCustomRangeInput(range) {
      this.$emit('customRangeInput', range);
    },
    emitCustomRangeChange(range) {
      this.$emit('customRangeChange', range);
    }
  }
};
</script>