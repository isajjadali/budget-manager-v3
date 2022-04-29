<template>
  <v-card class="mx-auto overflow-hidden" height="100vh">
    <NavBar />
    <router-view></router-view>
  </v-card>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  name: "LayoutPage",
  components: {
    NavBar,
  },
};
</script>

<style scoped></style>
