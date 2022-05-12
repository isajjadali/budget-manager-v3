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
        </v-app-bar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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
};
</script>
