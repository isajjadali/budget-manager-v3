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
      class="d-flex justify-space-between py-2 align-center px-3"
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
      <div><b>{{ startRange }} - {{ startRange + 8 }}</b></div>
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
        v-for="y in numberOfYears"
        :key="startRange + y"
        cols="12"
        sm="4"
        md="4"
      >
        <v-btn
          elevation="2"
          block
          :color="startRange + y === selectedYearInNumber ? 'primary' : ''"
          @click="onClick(startRange + y)"
        >
          {{ startRange + y }}
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
    }
  },
  data: () => ({
    numberOfYears: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    startRange: 0,
  }),
  computed: {
    selectedYearInNumber() {
      return Number(this.selectedYear.split('-')[0]);
    },
  },
  mounted() {
    this.startRange = this.selectedYearInNumber - 4;
  },
  methods: {
    onClick(year) {
      this.$emit('yearSelect', `${year}-01`);
    },
    onNext() {
      this.startRange += 9;
    },
    onPrevious() {
      this.startRange -= 9;
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