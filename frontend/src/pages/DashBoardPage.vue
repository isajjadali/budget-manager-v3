<template>
  <v-card
    class="mx-auto overflow-hidden"
    height='100vh'
  >
    <v-app-bar
      color="blue"
      elevation="18"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <router-view></router-view>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
    >
    </v-navigation-drawer>
    
  </v-card>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "DashBoardPage",
  data: () => ({
    header: "Dashboard",
    drawer: false,
  }),
  computed: {
    ...mapState('global', ['user']),
  }
};
</script>
