<template>
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
              <option v-for="cat in categories" :key="cat.id" :value="cat.name">
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useQuizzStore } from "@/stores/quizz";

const store = useQuizzStore();
const { categories, selectedCategory, selectedDiff } = storeToRefs(store);
const { fetchQuestions } = store;
</script>

<style>
</style>