<template>
  <v-row class="d-flex justify-center align-center">
    <v-col
      class="text-h6 text-center"
      cols="12"
    >
      {{ message }}
    </v-col>
    <v-col v-if="isLoading" cols="7">
      <v-progress-linear
        color="primary"
        indeterminate
        rounded
        height="6"
      ></v-progress-linear>
    </v-col>
  </v-row>
</template>

<script>

export default {
  props: {
    message: String,
    isLoading: Boolean,
  }
}
</script>