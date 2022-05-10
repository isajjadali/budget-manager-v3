<template>
  <v-card
    class="mx-auto"
  >
    <NavBar />
    <router-view />
  </v-card>
</template>

<script>
import NavBar from '@/components/NavBar';

export default {
  name: 'LayoutPage',
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.wrapper {
  height: calc(100vh - 64px + 12px);
  overflow-y: scroll;
}
</style>
