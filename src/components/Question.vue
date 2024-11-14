
<script setup>
import { defineProps } from "vue";

const props = defineProps(["question"]);
const emit = defineEmits(["userAnswer"]);

function updateUserAnswer(index, isChecked) {
  emit("userAnswer", props.question.id, index, isChecked);
}
</script>

<template>
  <div class="question">
    <h2>{{ props.question.question }}</h2>
    <ul>
      <div v-for="(answer, index) in question.answers" :key="index">
        <li v-if="answer != null">
          <div class="form-check">
            <input
              class="form-check-input"
              :type="
                question.multiple_correct_answers == 'true'
                  ? 'checkbox'
                  : 'radio'
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
  </div>
</template>
<style>
ul{
  list-style: none;
}
</style>