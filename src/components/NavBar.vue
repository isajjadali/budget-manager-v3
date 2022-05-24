<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-app-bar
          app
          color="primary"
          elevation="2"
          flat
        >
          <v-tabs
            align-with-title
            color="white"
          >
            <v-tab
              v-for="(tab, index) in tabs"
              :key="index"
              :to="tab.path"
            >
              {{ tab.title }}
            </v-tab>
          </v-tabs>
          <v-col class="px-5">
            <AccountMenu :user="user" @logout="onLogout"/>
          </v-col>
        </v-app-bar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AccountMenu from './AccountMenu.vue';
import {mapState, mapActions} from 'vuex';

export default {
  name: 'NavBar',
  data() {
    return {
      tabs: [
        { title: 'Dashboard', path: '/dashboard' },
        { title: 'Projects', path: '/projects' },
        { title: 'Employees', path: '/employees' },
        { title: 'Activities', path: '/activities' },
        { title: 'Payins', path: '/payins' },
      ],
    };
  },
  components: {
    AccountMenu,
  },
  methods: {
    ...mapActions('global', ['fetchLoggedInUser']),
    onLogout() {
      localStorage.removeItem('token');
      this.$router.push('login');
    }
  },
  computed: {
    ...mapState('global', ['user']),
  },
  async mounted() {
    await this.fetchLoggedInUser();
  }
};
</script>
