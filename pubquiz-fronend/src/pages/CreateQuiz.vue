!--tworzenie drużyn
To do:
- drużyny muszą mieć osobne strony dla każdej osoby, która odczyta kod qr
-->
<script setup lang="ts">
    import ImportQuizQuestion from '../components/ImportQuizQuestion.vue';
    import ImportQuizBackground from '../components/ImportQuizBackground.vue';
    import QuizQuestionsPreview from '../components/QuizQuestionsPreview.vue';
    import {ref} from 'vue';
    
    const previewRef = ref<InstanceType<typeof QuizQuestionsPreview> | null>(null);
    const handleFileSuccess = () => {
    if (previewRef.value) {
        previewRef.value.fetchQuestions(); 
    }
};
</script>

<template>
    <ImportQuizQuestion @fileAdded="handleFileSuccess"/>
    <ImportQuizBackground/>
    <QuizQuestionsPreview ref="previewRef"/>
</template>