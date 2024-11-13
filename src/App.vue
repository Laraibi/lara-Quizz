<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const count = ref(0);
const questions = ref([]);
const apiKey = process.env.VUE_APP_QUIZZ_API_KEY;
function increment() {
  count.value++;
}

onMounted(() => {
  axios
    .get("https://quizapi.io/api/v1/questions", {
      params: {
        apiKey,
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>

<style scoped>
</style>
