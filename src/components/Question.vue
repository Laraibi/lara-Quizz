
<script setup>
import { defineProps } from "vue";
import { useQuizzStore } from "@/stores/quizz";
import { storeToRefs } from "pinia";
const store = useQuizzStore();

const { updateUserAnswers, checkAnswers } = store;
const { questionToShow, questions } = storeToRefs(store);
const props = defineProps(["question"]);

function updateUserAnswer(index, isChecked) {
  updateUserAnswers(props.question.id, index, isChecked);
}
const handleNext = () => {
  questionToShow.value++;
  if (questionToShow.value == questions.value.length) {
    checkAnswers();
  }
};
</script>

<template>
  <h2>{{ props.question.question }}</h2>
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
        <button @click="handleNext" class="btn btn-info">Next</button>
      </div>
    </div>
  </div>
</template>
<style>
ul {
  list-style: none;
}
</style>