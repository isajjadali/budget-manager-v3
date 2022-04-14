<template>
    <v-container fluid>
      <h1>{{ header }}</h1>
    </v-container>
</template>

<script>
export default {
  name: "PageNotFound",
  data: () => ({
    header: "404 Page Not Found",
  }),
};
</script>
