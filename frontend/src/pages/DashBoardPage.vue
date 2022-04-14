<template>
    <v-container fluid>
      <h1>{{ header }}</h1>
    </v-container>
</template>

<script>
export default {
  name: "DashBoardPage",
  data: () => ({
    header: "Dashboard",
  }),
};
</script>
