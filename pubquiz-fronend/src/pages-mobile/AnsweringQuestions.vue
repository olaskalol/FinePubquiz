!--klikanie w pytania na telefonie drużyn
To do:
- muszą być przekazywane same pytania bez odpowiedzi
- zapisywanie wybranych odpowwiedzi

-->
<script setup lang="ts">
  import type {Question} from '../types';
  import {ref} from 'vue';

  const answers = ref<Question[]>([]);

  async function fetchQuestions() {
    try {
      //ZMIENIC URL NA ADRES BACKENDU Z ENV
      const response = await fetch('http://localhost:8000/questions');
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      answers.value=data;
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }

</script>

<template>
  <div>
    <h1>Wybierz odpowiedź</h1>
    <ul>
      <li v-for="answer in answers" :key="answer.id">
        <button @click="submitAnswer(answer.id)">{{ answer.text }}</button>
      </li>
    </ul>
  </div>
</template>