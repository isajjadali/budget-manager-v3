<template>
  <v-col
    class="message-font text-h6 d-flex align-center justify-center" 
    cols="12"
  >
  <div class="d-flex flex-column">
    {{ message }}
    <slot name="createButton"/>
  </div>
  </v-col>
</template>

<script>
export default {
  props: {
    message: String,
  }
}
</script>