<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Question from "./components/Question.vue";
import Checking from "./components/Checking.vue";
const apiKey = import.meta.env.VITE_QUIZZ_API_KEY;
const categories = ref([]);
const questions = ref([]);
const questionToShow = ref(-1);
const userAnswers = ref([]);
const selectedCategory = ref("");
const selectedDiff = ref("easy");
const answersChekin = ref([]);

function updateUserAnswers(questionID, answers, isChecked) {
  // Cache the index and multiple-correct answers status to reduce redundant operations
  const indexIfExists = userAnswers.value.findIndex(
    (element) => element.questionID === questionID
  );
  const question = questions.value.find((q) => q.id === questionID);
  const isMultiple = question.multiple_correct_answers === "true";

  // If the question doesn't exist in userAnswers
  if (indexIfExists === -1) {
    userAnswers.value.push({ questionID, answers: [answers] });
  } else {
    const currentAnswers = userAnswers.value[indexIfExists].answers;
    if (isChecked) {
      // Handle checked case based on single or multiple answers allowed
      userAnswers.value[indexIfExists].answers = isMultiple
        ? [...currentAnswers, answers]
        : [answers];
    } else {
      // Handle unchecked case based on single or multiple answers allowed
      userAnswers.value[indexIfExists].answers = isMultiple
        ? currentAnswers.filter((element) => element !== answers)
        : [];
    }
  }
}

function fetchQuestions() {
  axios
    .get("https://quizapi.io/api/v1/questions", {
      headers: {
        "X-Api-Key": apiKey,
      },
      params: {
        difficulty: selectedDiff.value,
        category: selectedCategory.value,
        limit: 5,
      },
    })
    .then((response) => {
      questions.value = response.data;
      const multiples = response.data.filter(
        (question) => question.multiple_correct_answers == "true"
      );
    })
    .catch((error) => {
      console.error(error);
    });
  userAnswers.value = [];
  answersChekin.value = [];
  questionToShow.value = 0;
}
function fetchCategories() {
  axios
    .get("https://quizapi.io/api/v1/categories ", {
      headers: {
        "X-Api-Key": apiKey,
      },
    })
    .then((response) => {
      categories.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function checkAnswers() {
  let results = [];
  questions.value.forEach((question) => {
    const userAnswer = userAnswers.value.find(
      (answer) => answer.questionID == question.id
    );
    const trueAnswers = Object.entries(question.correct_answers)
      .filter((entrie) => entrie[1] == "true")
      .map((entrie) => entrie[0].substring(0, 8));
    if (userAnswer) {
      const userAnswerArray = userAnswer.answers.sort();
      if (JSON.stringify(trueAnswers) == JSON.stringify(userAnswerArray)) {
        results.push({
          id: question.id,
          isCorrect: true,
          userAnswers: userAnswerArray,
          correctAnswer: trueAnswers,
        });
      } else {
        results.push({
          id: question.id,
          isCorrect: false,
          userAnswers: userAnswerArray,
          correctAnswer: trueAnswers,
        });
      }
    } else {
      results.push({
        id: question.id,
        isCorrect: false,
        userAnswers: undefined,
        correctAnswer: trueAnswers,
      });
    }
  });
  answersChekin.value = results.map((result) => {
    return {
      ...result,
      question: questions.value.find((question) => question.id == result.id),
    };
  });
  console.log(answersChekin.value);
}

onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <div class="container">
    <h1 class="text-center">Lara-Quizz</h1>
    <div class="pannel card rounded">
      <div class="card-body">
        <h3 class="text-center">Difficulty</h3>

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
        <h3 class="text-center">Category</h3>
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
    <div
      class="questions"
      v-if="questionToShow >= 0 && !answersChekin.length"
    >
      <Question
        :key="questions[questionToShow].id"
        :question="questions[questionToShow]"
        @userAnswer="updateUserAnswers"
      />
      <div class="row d-flex justify-content-end">
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
                width: `${((questionToShow + 1) / questions.length) * 100}%`,
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
              questionToShow += questionToShow == questions.length - 1 ? 0 : 1
            "
            class="btn btn-info"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    <div class="results" v-if="answersChekin.length">
      <Checking :checked-answers="answersChekin" />
    </div>
  </div>
</template>

<style scoped>
</style>
