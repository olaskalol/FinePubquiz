<script setup lang="ts">

import { ref, computed } from "vue";
import Home from "./pages/Home.vue";
import CreateTeam from "./pages-mobile/CreateTeam.vue";
import HostPanel from "./pages-mobile/HostPanel.vue";
import AnsweringQuestions from "./pages-mobile/AnsweringQuestions.vue";
import CreateQuiz from "./pages/CreateQuiz.vue";
import ScreenView from "./pages/ScreenView.vue";
import NotFound from "./pages/NotFound.vue";

const currentPath = ref(window.location.hash);
const routes = {
    "/": Home,
    "/create-team": CreateTeam,
    "/host-panel": HostPanel,
    "/answering-questions": AnsweringQuestions,
    "/create-quiz": CreateQuiz,
    "/screen-view": ScreenView,
}

//byl issue fixniety z copilot tutaj z tym returnem bo normalnie jak zrobilam druga apke to nie byla potrzebna ta druga linijka
const currentView = computed(() => {    
  const route = currentPath.value.slice(1) || '/';
  return routes[route as keyof typeof routes] || NotFound;
});

window.addEventListener("hashchange", () => {
    currentPath.value = window.location.hash;
});

</script>

<template>
  <component :is="currentView" />
</template>