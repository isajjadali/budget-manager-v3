<template>
  <div class="text--primary">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card :elevation="hover ? 24 : 6" class="mx-auto pa-4" @click="onItemClick">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              {{ activity.project.name }}
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
  props: ['activity'],

  methods: {
    onItemClick() {
      this.$emit('itemClicked', this.activity);
    },
  },
};
</script>
