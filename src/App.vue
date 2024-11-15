<script setup>
import { ref, onMounted } from "vue";
import Question from "./components/Question.vue";
import Checking from "./components/Checking.vue";
import { storeToRefs } from "pinia";
import { useQuizzStore } from "@/stores/quizz";

const store = useQuizzStore();
const {
  categories,
  questions,
  questionToShow,
  selectedCategory,
  selectedDiff,
  answersChekin,
} = storeToRefs(store);

// const userAnswers = ref([]);

const { fetchCategories, fetchQuestions, checkAnswers } = store;

onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <div class="container">
    <h1 class="text-center">Lara-Quizz</h1>
    <div class="pannel card rounded">
      <div class="card-body">
        <h3 class="text-center text-secondary">Difficulty</h3>

        <div class="diffucly d-flex justify-content-around my-5">
          <input
            class="btn-check"
            type="radio"
            name="diffculty"
            id="easy"
            v-model="selectedDiff"
            value="easy"
          />
          <label for="easy" class="btn btn-outline-info">Easy</label>
          <input
            class="btn-check"
            type="radio"
            name="diffculty"
            id="medium"
            v-model="selectedDiff"
            value="medium"
          />
          <label for="medium" class="btn btn-outline-warning">Medium</label>
          <input
            class="btn-check"
            type="radio"
            name="diffculty"
            id="hard"
            v-model="selectedDiff"
            value="hard"
          />
          <label for="hard" class="btn btn-outline-danger">Hard</label>
        </div>
        <h3 class="text-center text-secondary">Category</h3>
        <div class="row d-flex justify-content-center">
          <div class="col-6">
            <div class="category">
              <select
                class="form-select"
                name="category"
                id="category"
                v-model="selectedCategory"
              >
                <option
                  v-for="cat in categories"
                  :key="cat.id"
                  :value="cat.name"
                >
                  {{ cat.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="actions row mt-5 d-flex justify-content-center">
          <button class="col-3 btn btn-success me-5" @click="fetchQuestions">
            start
          </button>
          <button class="col-3 btn btn-success" @click="checkAnswers">
            check answers
          </button>
        </div>
      </div>
    </div>
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
              <button
                @click="
                  questionToShow +=
                    questionToShow == questions.length - 1 ? 0 : 1
                "
                class="btn btn-info"
              >
                Next
              </button>
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
