<template>
  <v-card>
    <div class="banner text-white px-3 py-1">
      <div class="d-flex align-center justify-start">
        <h1 class="text-white py-4">
          {{ selectedYearInNumber }}
        </h1>
      </div>
    </div>
    <div
      class="d-flex justify-space-between pt-3 pb-5 align-center px-3"
      style="width: 100%"
    >
      <v-btn
        dark
        small
        icon
        elevation="1"
        color="primary"
        @click="onPrevious"
      >
        <v-icon
          dark
        >
          mdi-chevron-left
        </v-icon>
      </v-btn>
      <div><b>{{ startRange + 1 }} - {{ startRange + numberOfYears }}</b></div>
      <v-btn
        dark
        small
        icon
        color="primary"
        elevation="1"
        @click="onNext"
      >
        <v-icon
          dark
        >
          mdi-chevron-right
        </v-icon>
      </v-btn>
    </div>
    <v-row class="pa-3 pt-0">
      <v-col
        v-for="year in numberOfYears"
        :key="startRange + year"
        cols="12"
        sm="4"
        md="4"
      >
        <v-btn
          elevation="2"
          block
          :color="startRange + year === selectedYearInNumber ? 'primary' : ''"
          @click="onClick(startRange + year)"
        >
          {{ startRange + year }}
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'CustomDatePickerYear',
  props: {
    selectedYear: {
      type: String,
      required: true,
    },
    numberOfYears: {
      type: Number,
      default: 9,
    }
  },
  data: () => ({
    startRange: 0,
  }),
  computed: {
    selectedYearInNumber() {
      return Number(this.selectedYear.split('-')[0]);
    },
  },
  mounted() {
    this.startRange = this.selectedYearInNumber - (Math.floor(this.numberOfYears / 2) + 1);
  },
  methods: {
    onClick(year) {
      this.$emit('yearSelect', `${year}-01`);
    },
    onNext() {
      this.startRange += this.numberOfYears;
    },
    onPrevious() {
      this.startRange -= this.numberOfYears;
    }
  },
};
</script>
<style scoped lang="scss">
.banner {
  background-color: #1976d2 !important;
}

.text-white {
  color: white !important;
}
</style>