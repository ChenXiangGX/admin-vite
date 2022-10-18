<template>
  <div>我是组件</div>
  {{ name }}
  <button @click="send">发给父级</button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
defineProps({
  name: {
    type: String,
    default: 'cx',
  },
});
let emits = defineEmits(['change']);
function send() {
  emits('change', '我是子传父');
}
</script>

<style></style>
