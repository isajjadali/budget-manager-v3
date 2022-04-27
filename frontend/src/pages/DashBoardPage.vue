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
      <v-list
        nav 
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    
  </v-card>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "DashBoardPage",
  data: () => ({
    header: "Dashboard",
    drawer: false
  }),
  computed: {
    ...mapState('global', ['user']),
  }
};
</script>
