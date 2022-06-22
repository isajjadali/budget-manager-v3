<template>
  <v-menu rounded offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="(item, i) in items" link :key="i">
        <v-list-item-title @click="onAction(item)">{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default{
  data() {
    return {
      items: [
        {title: 'Edit', i: 1},
        {title: 'Delete', i: 2},
      ],
    };
  },
  methods: {
    onAction(item) {
      this.$emit('onActionSelected', item.title);
    }
  }
};
</script>

