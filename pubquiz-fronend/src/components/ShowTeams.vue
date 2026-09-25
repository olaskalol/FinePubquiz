!--Pokazywanie drużyn zależnie od tego czy mają jakies punkty to pokazują się też ich punkty
To do:
- trzeba pomyśleć w których miejscach powinien być ten komponent (przed rozpoczęciem rozgrywnik/na ekranie które drużyny odpowiedziały/przy wynikach)
-->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Team } from '../types';

const API_URL_TEAMS = import.meta.env.VITE_API_URL_TEAMS;
const teams = ref<Team[]>([]);

async function fetchTeams() {
  try {
    const response = await fetch(API_URL_TEAMS);
    if (!response.ok) {
      throw new Error('Failed to fetch teams');
    }
    const data = await response.json();
    teams.value=data;
  } catch (error) {
    console.error('Error fetching teams:', error);
  }
}

onMounted(() => {
  fetchTeams();
});

</script>
<template>
  <div>
    <h1>Lista drużyn</h1>
    <ul>
      <li v-for="team in teams" :key="team.name">
        {{ team.name }} - {{team.points === 0?'': team.points}}
        <p>Skład drużyny:</p>
        <li v-for="member in team.members" :key="member">
          {{ member }}
        </li>
      </li>
    </ul>
  </div>
</template>