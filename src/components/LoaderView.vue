<template>
  <v-col :cols="isProjectPreview ? '10' : '8'">
    <v-progress-linear
      color="primary"
      indeterminate
      rounded
      height="6"
    ></v-progress-linear>
  </v-col>
</template>

<script>
export default {
  props: {
    isProjectPreview: {
      type: Boolean,
      default:() => {
        return false;
      }
    }
  },
}
</script>
