<template>
  <v-date-picker
    ref="picker"
    :value="selectedYear"
    no-title
    type="month"
    reactive
    @input="onInput"
  />
</template>

<script>
export default {
  name: 'CustomDatePickerYear',
  props: {
    selectedYear: {
      type: String,
      required: true,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.picker.internalActivePicker = 'YEAR';
    });
  },
  methods: {
    onInput(date) {
      this.$emit('yearSelect', date);
      this.$nextTick(() => {
        this.$refs.picker.internalActivePicker = 'YEAR';
      });
    }
  }
};
</script>
