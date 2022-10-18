<template>
  <div class="prop">
    {{ a }}
    <button @click="add">+</button>
    <com name="父传子" @change="getDate"></com>
    {{ msg }}
  </div>
</template>

<script setup>
import com from '@/components/com.vue';
import { ref, reactive, defineEmits } from 'vue';
let a = ref(1);
function add() {
  a.value++;
}
let msg = ref('');
function getDate(val) {
  console.log(val);
  msg.value = val;
}
</script>

<style></style>
