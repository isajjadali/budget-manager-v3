<template>
  <v-col
    class="message-font text-h6 d-flex align-center justify-center" 
    cols="12"
  >
    {{ message }}
  </v-col>
</template>

<script>
export default {
  props: {
    message: String,
  }
}
</script>