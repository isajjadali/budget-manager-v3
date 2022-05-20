<template>
  <div>
    <NavBar />
    <v-container
      fluid
      class="px-16"
    >
      <router-view />
    </v-container>
  </div>
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
