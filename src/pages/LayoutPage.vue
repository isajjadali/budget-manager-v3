<template>
  <div>
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';

export default {
  name: 'LayoutPage',
  components: {
    NavBar,
  },
};
</script>
