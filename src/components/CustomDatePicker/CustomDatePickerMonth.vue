<template>
  <v-date-picker
    :value="selectedMonth"
    type="month"
    reactive
    @input="onInput"
  />
</template>

<script>
export default {
  name: 'CustomDatePickerMonth',
  props: {
    selectedMonth: {
      type: String,
      required: true,
    }
  },
  methods: {
    onInput(date) {
      this.$emit('monthSelect', date);
    }
  },
};
</script>
