!--tworzenie drużyn
To do:
- drużyny muszą mieć osobne strony dla każdej osoby, która odczyta kod qr
- guzik do kliknięcia dołącz albo automatyczne dodawanie i aktulizacja za każdym razem gdy jest nowym człowiek
- jeśli guzik po dołączeniu powinna być informacja że się dołączyło
-->
<script setup lang="ts">
import { ref } from 'vue';
import type { Team } from '../types';

const API_URL_TEAMS = import.meta.env.VITE_API_URL_TEAMS;
const memberName = ref('');
const teamName = ref('');
const Teams = ref<Team[]>([]);
const isTeamCreated = ref(false);

function createTeam() {
  if (!teamName.value.trim()) {
    alert('Wpisz imię drużyny');
    return;
  }
  const chosenTeam = {
    name: teamName.value.trim(),
    members: [],
    answers: [],
    points: 0,
  };
  return chosenTeam;
}

async function addTeam() {
  const team = createTeam();
  if (!team) return;

  try {
    const response = await fetch(API_URL_TEAMS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(team)
    });
    
    if (!response.ok) {
      throw new Error('Failed to add team');
    }
    
    const data = await response.json();
    console.log('Team added:', data);
    
    Teams.value.push(team);
    isTeamCreated.value = true; 
    
  } catch (error) {
    console.error('Error adding team:', error);
  }
}
async function updateTeamMembers(team: Team) {
  try {
    const response = await fetch(API_URL_TEAMS, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(team)
    });

    if (!response.ok) {
      throw new Error('Failed to update team members');
    }
    console.log('Zaktualizowano drużynę w bazie!');
  } catch (error) {
    console.error('Error updating team:', error);
  }
}

function addMember() {
  if (!memberName.value.trim()) {
    alert('Wpisz imię członka drużyny');
    return;
  }
  
  const newMember = memberName.value.trim();
  const team = Teams.value.find((t: Team) => t.name === teamName.value.trim());
  
  if (team) {
    team.members.push(newMember);
    memberName.value = '';
    
    updateTeamMembers(team);
  } else {
    alert('Drużyna nie istnieje');
  }
}

</script>

<template>
  <div v-if="!isTeamCreated" class="create-team">
    <h1>Dodaj nazwę drużyny</h1>
    <form @submit.prevent="addTeam">
        <label for="teamName">Team Name:</label>
        <input type="text" id="teamName" v-model="teamName" required />
      <button type="submit">Stwórz Drużynę</button>
    </form>
  </div>
  <div v-else class="add-members">
    <h1>{{ teamName }}</h1>
    <h2>Dodaj członków drużyny</h2>
    <form @submit.prevent="addMember">
      <label for="memberName">Member Name:</label>
      <input type="text" id="memberName" v-model="memberName" required />
      <button type="submit">Add Member</button>
    </form>
    <ul v-if="Teams.length !== 0">
      <li v-for="member in Teams.find(t => t.name === teamName)?.members" :key="member">
        {{ member }}
      </li>
    </ul>
  </div>
</template>


