<template>
  <p
    class="text-center text-bold"
    style="font-weight: bold; font-size: large; font-size: 18px"
  >
    {{ (score * 100).toFixed(2) }}%
  </p>
  <table class="table">
    <thead>
      <tr>
        <th>Correct Answers</th>
        <th>User Answers</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="answer in checkedAnswers" :key="answer.id">
        <tr>
          <td
            colspan="2"
            style="color: white"
            :class="answer.isCorrect ? 'bg-success' : 'bg-danger'"
          >
            {{ answer.question.question }}
          </td>
        </tr>
        <tr>
          <td>
            <ul>
              <li
                style="color: white"
                v-for="(possibleAnswer, id) in answer.question.answers"
                :key="`possible_answer_${id}_question_${answer.question.id}`"
                :class="
                  answer.question.correct_answers[`${id}_correct`] == 'true'
                    ? 'bg-success'
                    : 'bg-danger'
                "
              >
                <v-icon v-if="answer.question.correct_answers[`${id}_correct`] == 'true'" name="bi-check-square-fill" />
                <v-icon v-else name="ri-close-line" />
                {{ possibleAnswer }}
              </li>
            </ul>
          </td>
          <td>
            <ul>
              <li
                v-for="(userAnswerKey, id) in answer.userAnswers"
                :key="`user_answer_${id}_question_${answer.question.id}`"
                style="color: white"
                :class="answer.isCorrect ? 'bg-success' : 'bg-danger'"
              >
                <v-icon v-if="answer.isCorrect" name="bi-check-square-fill" />
                <v-icon v-else name="ri-close-line" />
                {{ answer.question.answers[userAnswerKey] }}
              </li>
            </ul>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script setup>
import { defineProps, computed } from "vue";

const { checkedAnswers } = defineProps(["checkedAnswers"]);

const score = computed(
  () =>
    checkedAnswers.filter((answer) => answer.isCorrect).length /
    checkedAnswers.length
);
</script>

<style>
</style>