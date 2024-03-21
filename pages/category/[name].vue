<template>
  <div class="mx-auto bg-[#f9faff] w-full">
    <div class="p-5 mx-auto">
      <div v-if="isLoading">Loading...</div>
      <div v-else class="container">
        <h2 class="text-2xl font-bold">{{ getArticles?.title }}</h2>
        <div
          class="grid grid-cols-1 gap-5 mt-10"
          v-if="getArticles?.articles.length"
        >
          <NuxtLink
            class="flex hover:scale-105 duration-300 rounded-xl bg-white"
            v-for="(article, ind) in getArticles?.articles"
            :to="`article/${getArticles.category_name}/${article.id}`"
            :key="ind"
          >
            <div class="basis-2/5 flex-shrink-0">
              <img class="rounded-l-xl h-full object-cover" :src="article.image" alt="" />
            </div>
            <div class="flex gap-5 flex-col p-5">
              <div class="flex items-center">
                <div class="bg-yellow py-1 px-2 text-white rounded-tl-none rounded-2xl">{{ getArticles.title }}</div>
              </div>
              <div class="text-black font-bold lg:text-2xl">{{ article.description }}</div>
              <div class="mt-autoa">{{ article.date }}</div>
            </div>
          </NuxtLink>
        </div>
        <div v-else class="mt-5">Записей нету</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "~/stores";
import createError from "http-errors";

const store = useStore();
const { name } = useRoute().params;
console.log(name);

const isLoading = ref(true);

await store.fetchCurrentCategory(name);

isLoading.value = false;

const getArticles = computed(() => {
  return store.getCurrentCategory;
});

console.log(getArticles);

// if (!Object.keys(articles.value).length) {
//   const error = createError(404, "Страница не найдена");
//   throw error;
// }
</script>

<style scoped></style>
