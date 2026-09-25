!--wyświetlanie pytań quizu
To do:
- źle wyświetla pytania i trzeba pomyśleć jak powinien wyglądać podgląd
-->
<script setup lang="ts">
import type {Question} from '../types';
import {ref} from 'vue';
const API_URL_QUESTIONS = import.meta.env.VITE_API_URL_QUESTIONS;

const questions = ref<Question[]>([]);


async function fetchQuestions() {
  try {
    const response = await fetch(API_URL_QUESTIONS);
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    const data = await response.json();
     questions.value=data;
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
}

defineExpose({ fetchQuestions });
</script>

<template>
  <div>
    <h1>Podgląd pytań quizu</h1>
    <ul>
      <li v-for="question in questions" :key="question.id">
        {{ question.question }}
        {{question.answers}}
        {{question.correctAnswer}}
      </li>
    </ul>
  </div>
</template>