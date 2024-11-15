<script setup>
import { ref, onMounted } from "vue";
import Question from "./components/Question.vue";
import Checking from "./components/Checking.vue";
import Panel from "./components/Panel.vue";
import { storeToRefs } from "pinia";
import { useQuizzStore } from "@/stores/quizz";

const store = useQuizzStore();
const { questions, questionToShow, answersChekin } = storeToRefs(store);
const { fetchCategories, checkAnswers } = store;
const handleNext = () => {
  questionToShow.value++;
  if (questionToShow.value == questions.value.length) {
    checkAnswers();
  }
};
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
          <div class="row d-flex">
            <div class="col-9">
              <div
                class="progress"
                role="progressbar"
                aria-label="Animated striped example"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  class="progress-bar progress-bar-striped progress-bar-animated"
                  :style="{
                    width: `${
                      ((questionToShow + 1) / questions.length) * 100
                    }%`,
                  }"
                ></div>
              </div>
              <div class="text-center">
                {{ questionToShow + 1 }}/{{ questions.length }}
              </div>
            </div>
            <div class="col-3">
              <button @click="handleNext" class="btn btn-info">Next</button>
            </div>
          </div>
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
