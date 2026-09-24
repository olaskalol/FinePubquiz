<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Team } from '../types';

const memberName = ref('');
const teamName = ref('');
const Teams = ref<Team[]>([]);

function createTeam() {
  if (!teamName.value.trim()) {
    alert('Wpisz imię drużyny');
    return;
  }
  const chosenTeam = {
    name: teamName.value.trim(),
    people: [],
  };
}
function addMember() {
  if (!memberName.value.trim()) {
    alert('Wpisz imię członka drużyny');
    return;
  }
  const newMember = memberName.value.trim();
  const team = Teams.value.find((team: Team) => team.name === teamName.value);
  if (team) {
    team.members.push(newMember);
    memberName.value = '';
  } else {
    alert('Drużyna nie istnieje');
  }
}

async function fetchTeams() {
  try {
    //ZMIENIC URL NA ADRES BACKENDU Z ENV
    const response = await fetch('http://localhost:8000/teams');
    if (!response.ok) {
      throw new Error('Failed to fetch teams');
    }
    const data = await response.json();
    Teams.value = data;
    console.log('Fetched teams:', data);
  } catch (error) {
    console.error('Error fetching teams:', error);
  }
}

onMounted(() => {
  fetchTeams();
});

</script>

<template>
  <div class="create-team">
    <h1>Dodaj nazwę drużyny</h1>
    <form @submit.prevent="createTeam">
        <label for="teamName">Team Name:</label>
        <input type="text" id="teamName" v-model="teamName" required />
      <button type="submit">Stwórz Drużynę</button>
    </form>
  </div>
  <div class="add-members">
    <h1>{teamName}</h1>
    <h2>Dodaj członków drużyny</h2>
    <form @submit.prevent="addMember">
      <label for="memberName">Member Name:</label>
      <input type="text" id="memberName" v-model="memberName" required />
      <button type="submit">Add Member</button>
    </form>
  </div>
</template>