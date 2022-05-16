<template>
  <v-row justify="center">
    <v-dialog
      v-model="toggleDialog"
      persistent
      max-width="600"
    >
      <v-card width="100%">
        <v-card-title class="text-h6">
          Are you sure you want to delete..??
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="cancel"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="save"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: {
      toggleDialog: {
        type: Boolean
      },
    },
    data () {
      return {
      }
    },
    methods: {
      cancel() {
        this.$emit('cancel');
      },
      save() {
        this.$emit('delete');
      }
    }
  }
</script>
