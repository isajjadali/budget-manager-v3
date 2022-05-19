<template>
  <div style="background-color: #eff0f2">
    <NavBar />
    <div style="height: 100vh">
      <router-view />
    </div>
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
