#import pytan i tła oraz podgląd? 
# rozwinięcie - wybieranie po ktorych kategoriach jest przerwa na piwo
<script setup lang="ts">
    import ImportQuizQuestion from '../components/ImportQuizQuestion.vue';
    import ImportQuizBackground from '../components/ImportQuizBackground.vue';
    import QuizPreview from '../components/QuizQuestionsPreview.vue';
    import {ref} from 'vue';
    
    const previewRef = ref<InstanceType<typeof QuizPreview> | null>(null);
    const handleFileSuccess = () => {
    if (previewRef.value) {
        previewRef.value.fetchQuestions(); // Wymuszamy przeładowanie listy
    }
};
</script>

<template>
    <ImportQuizQuestion @fileAdded="handleFileSuccess"/>
    <ImportQuizBackground/>
    <QuizPreview ref="previewRef"/>
</template>