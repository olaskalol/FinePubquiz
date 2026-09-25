!--Import tła do quizu
To do:
- ogarniecie przetrzymywania zdjęć w czymś innym niz mongodb
- połączenie tego z backendem 
-->
<script setup lang="ts">
import {ref} from 'vue';


const API_URL_IMAGINES = import.meta.env.VITE_API_URL_IMAGINES;
const selectedFile = ref();

const handleFile = (event:Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0] != null) {
        selectedFile.value = target.files[0];
    }
};

async function importQuizBg(){
    try{
        const res = await fetch(API_URL_IMAGINES, {
        method: "POST",
        body: selectedFile.value,
        })
        if(!res.ok){
            throw new Error("Failed to import quiz background");
        }
    } catch (error) {
        console.error("Error importing quiz background:", error);
    }
}

</script>

<template>
    <div>
        <input type="file" @change="handleFile" accept=".png, .jpg, .jpeg, .gif, .bmp, .svg">
        <button @click = 'importQuizBg'> Importuj quiz </button>
    </div>
</template>