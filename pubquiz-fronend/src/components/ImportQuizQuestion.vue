!--Import pytań do quizu
To do:
- decyzja nad tym jak będą zaciągane pytania do konkretnej sesji gry
- jeśli to bedzię lepsze to zrobienie dwóch kolekcji jedna która ma pytania i odpowiedzi i druga gdzie są prawidłowe 
-->

<script setup lang="ts">
import {ref} from 'vue';

const API_URL_QUESTIONS = import.meta.env.VITE_API_URL_QUESTIONS;

const selectedFile = ref();
const emit = defineEmits(['fileAdded']);

const handleFile = (event:Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0] != null) {
        selectedFile.value = target.files[0];
    }
};

async function importQuiz(){
    if (!selectedFile.value) return;
    try{
       const formData = new FormData();
        formData.append("file", selectedFile.value);

        const res = await fetch(API_URL_QUESTIONS, {
            method: "POST",
            body: formData,
        });
        if(!res.ok){
            throw new Error("Failed to import quiz");
        }
        emit('fileAdded');
    } catch (error) {
        console.error("Error importing quiz:", error);
    }
}

</script>

<template>
    <div>
        <input type="file" @change="handleFile" accept=".xlsx">
        <button @click = 'importQuiz'> Importuj quiz </button>
    </div>
</template>