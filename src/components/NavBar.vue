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
          <div class="mr-11">
            <AccountMenu v-if="user" :user="user" @logout="onLogout"/>
          </div>
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
        { title: 'Projects', path: '/project' },
        { title: 'Employees', path: '/employees' },
        { title: 'Records', path: '/records' },
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
