<template>
  <div id="particles-js"></div>
</template>

<script setup>
import particlesJS from './particles.js';
import particlesJSON from './particles.json';

import { onMounted } from 'vue';

onMounted(function () {
  particlesJS('particles-js', particlesJSON);
});
</script>

<style scoped>
#particles-js {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 8;
  background-color: rgb(13, 28, 28);
}
</style>
