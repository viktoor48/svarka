<template>
    <div class="mx-auto bg-[#f9faff] w-full">
      <div class="p-5 mx-auto">
        <div v-if="isLoading">Loading...</div>
        <div>{{ name }} / {{ id }}</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { useStore } from "~/stores";
  import createError from "http-errors";
  
  const store = useStore();
  const { name, id } = useRoute().params;
  console.log(name, id);
  
  const isLoading = ref(true);
  
//   await store.fetchCurrentCategory(name);
  
  isLoading.value = false;
  
//   const getArticles = computed(() => {
//     return store.getCurrentCategory;
//   });
  
  // if (!Object.keys(articles.value).length) {
  //   const error = createError(404, "Страница не найдена");
  //   throw error;
  // }
  </script>
  
  <style scoped></style>
  