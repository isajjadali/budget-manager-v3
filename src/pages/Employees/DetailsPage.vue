<template>
  <h1>This is employee detail page {{ }}</h1>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
    console.log(this.$route.params.id);
  }
}
</script>
