<script setup>
import { ref, onMounted } from "vue";
import Question from "./components/Question.vue";
import Checking from "./components/Checking.vue";
import Panel from "./components/Panel.vue";
import { storeToRefs } from "pinia";
import { useQuizzStore } from "@/stores/quizz";

const store = useQuizzStore();
const { questions, questionToShow, answersChekin } = storeToRefs(store);
const { fetchCategories } = store;

onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <div class="container">
    <h1 class="text-center">Lara-Quizz</h1>
    <Panel />
    <div class="questions" v-if="questionToShow >= 0 && !answersChekin.length">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-md-10 col-sm-12">
          <Question
            :key="questions[questionToShow].id"
            :question="questions[questionToShow]"
          />          
        </div>
      </div>
    </div>
    <div class="results" v-if="answersChekin.length">
      <Checking />
    </div>
  </div>
</template>

<style scoped>
.diffucly {
  width: 50%;
  margin: 0 auto;
}
</style>
