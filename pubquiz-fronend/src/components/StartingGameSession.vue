!--Rozpoczynanie sesji gry, tworzy instancje sesji
To do:
- póki co tu chyba będzie tyle i po rozpoczęciu nowej sesji trzeba napewnic synchronizacje miedzy drużynami i ekranem oraz hostem
-->
<script setup lang="ts">
import { ref } from 'vue';
const API_URL_GAME_SESSION = import.meta.env.VITE_API_URL_GAME_SESSION;
const sessionName = ref('');

function createGameSession(){
    if (!sessionName.value.trim()) {
        alert('Wpisz nazwę sesji gry');
        return;
    }
    const chosenGameSession = {
        name: sessionName.value.trim(),
        teams: [],
        questions: [],
        currentQuestionIndex: 0,
    };
    return chosenGameSession;

}
async function startGameSession() {
    const gameSession = createGameSession();
    if (!gameSession) return;

    try {
        const response = await fetch(API_URL_GAME_SESSION, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gameSession)
        });
        if (!response.ok) {
            throw new Error('Failed to start game session');
        }
        const data = await response.json();
        console.log('Game session started:', data);
    } catch (error) {
        console.error('Error starting game session:', error);
    }
}

</script>


<template>
    <input v-model="sessionName" placeholder="Wpisz nazwę sesji gry" ></input>
    <button @click="startGameSession">Rozpocznij nową sejse gry</button>
</template>