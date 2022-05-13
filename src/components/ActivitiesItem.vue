<template>
  <div class="text--primary">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card :elevation="hover ? 18 : 3" class="pa-5" @click="onItemClick">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              {{ projectName }}
            </v-col>
            <v-col cols="12" sm="6" md="4">
              {{ activity.employee.fullName }}
            </v-col>
            <v-col cols="12" sm="6" md="4">
              {{ activity.amount }}
            </v-col>
          </v-row>
        </v-card>
      </template>
    </v-hover>
  </div>
</template>

<script>
export default {
  props: {
    activity: {
      type: Object,
      required: true,
    }
  },
  computed: {
    projectName() {
      return this.activity.project?.name || 'No Project';
    }
  },
  methods: {
    onItemClick() {
      this.$emit('itemClicked', this.activity);
    },
  },
};
</script>
