<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Question from "./components/Question.vue";
const apiKey = import.meta.env.VITE_QUIZZ_API_KEY;
const categories = ref([]);
const questions = ref([]);
const userAnswers = ref([]);
const selectedCategory = ref("");
const selectedDiff = ref("easy");

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
          correct: true,
          userAnswers: userAnswerArray,
          correctAnswer: trueAnswers,
        });
      } else {
        results.push({
          id: question.id,
          correct: false,
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
  console.log(results);
}

onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <div class="pannel">
    <div class="diffucly">
      <label for="easy">Easy</label>
      <input
        type="radio"
        name="diffculty"
        id="easy"
        v-model="selectedDiff"
        value="easy"
      />
      <label for="medium">Medium</label>
      <input
        type="radio"
        name="diffculty"
        id="medium"
        v-model="selectedDiff"
        value="medium"
      />
      <label for="hard">Hard</label>
      <input
        type="radio"
        name="diffculty"
        id="hard"
        v-model="selectedDiff"
        value="hard"
      />
    </div>
    <div class="category">
      <select name="category" id="category" v-model="selectedCategory">
        <option v-for="cat in categories" :key="cat.id" :value="cat.name">
          {{ cat.name }}
        </option>
      </select>
    </div>
    <button @click="fetchQuestions">start</button>
    <button @click="checkAnswers">check answers</button>
    <div class="questions">
      <Question
        v-for="question in questions"
        :key="question.id"
        :question="question"
        @userAnswer="updateUserAnswers"
      />
    </div>
  </div>
</template>

<style scoped>
</style>
