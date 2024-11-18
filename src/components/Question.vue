
<script setup>
import { defineProps, onMounted, ref, computed } from "vue";
import { useQuizzStore } from "@/stores/quizz";
import { storeToRefs } from "pinia";
const store = useQuizzStore();
const { updateUserAnswers, checkAnswers } = store;
const { questionToShow, questions } = storeToRefs(store);
const props = defineProps(["question"]);

const hasMakedChoice = ref(false);
const timeLeft = ref("");
function updateUserAnswer(index, isChecked) {
  updateUserAnswers(props.question.id, index, isChecked);
  hasMakedChoice.value = true;
}
const handleNext = () => {
  questionToShow.value++;
  if (questionToShow.value == questions.value.length) {
    checkAnswers();
  }
};

// Function to update the countdown timer
const startCountdown = () => {
  let timeRemaining = 30;
  const timerInterval = setInterval(() => {
    // Decrement the timer
    timeRemaining--;

    // Display the remaining time in minutes and seconds
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timeLeft.value = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

    // When the timer reaches 0, clear the interval and perform the action
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      handleNext();
    }
  }, 1000); // Update every second
};

// Start the countdown
onMounted(() => startCountdown());
const timeColor = computed(() => {
  const sec = parseInt(timeLeft.value.split(":")[1]);
  if (sec < 10) {
    return "text-danger";
  } else if (sec < 20) {
    return "text-warning";
  }
  return "";
});
</script>

<template>
  <div class="row">
    <div class="col-10">
      <h2>{{ props.question.question }}</h2>
    </div>
    <div class="col-2" :class="timeColor">
      {{ timeLeft }}
    </div>
  </div>
  <ul>
    <div v-for="(answer, index) in question.answers" :key="index">
      <li v-if="answer != null">
        <div class="form-check">
          <input
            class="form-check-input"
            :type="
              question.multiple_correct_answers == 'true' ? 'checkbox' : 'radio'
            "
            :id="`${props.question.id}-answer-${index}`"
            :name="`${props.question.id}`"
            @change="(e) => updateUserAnswer(index, e.target.checked)"
          />
          <label
            class="form-check-label"
            :for="`${props.question.id}-answer-${index}`"
          >
            {{ answer }}</label
          >
        </div>
      </li>
    </div>
  </ul>
  <div class="row">
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
          @click="handleNext"
          class="btn btn-info w-100"
          :disabled="!hasMakedChoice"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
<style>
ul {
  list-style: none;
}
</style>