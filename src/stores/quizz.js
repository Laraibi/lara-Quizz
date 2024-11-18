import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const useQuizzStore = defineStore('quizz', () => {
  // const count = ref(0)
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }
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
          // limit: 3,
        },
      })
      .then((response) => {
        questions.value = response.data;
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
    console.log('checkAnswers() launched ')
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

  // return { count, doubleCount, increment }
  return {
    updateUserAnswers,
    fetchQuestions,
    fetchCategories,
    checkAnswers,

    categories,
    questions,
    questionToShow,
    userAnswers,
    selectedCategory,
    selectedDiff,
    answersChekin
  }
})
