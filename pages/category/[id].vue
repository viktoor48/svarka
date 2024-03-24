<template>
  <div class="mx-auto bg-[#f9faff] w-full">
    <div class="p-5 mx-auto">
      <LoadingSpinner v-if="isLoading" />
      <div v-else class="container">
        <h2 class="text-2xl font-bold">{{ getCategory.name }}</h2>
        <div
          class="grid grid-cols-1 gap-5 mt-10"
          v-if="getCategory?.articles.length"
        >
          <NuxtLink
            class="flex hover:scale-105 duration-300 rounded-xl bg-white"
            v-for="(article, ind) in getArticles"
            :to="`article/${getCategory.id}/${article.id}`"
            :key="ind"
          >
            <div class="basis-2/5 flex-shrink-0">
              <img
                class="rounded-l-xl h-full object-cover"
                :src="article.image"
                alt=""
              />
            </div>
            <div class="flex gap-5 flex-col p-5">
              <div class="flex items-center">
                <div
                  class="bg-yellow py-1 px-2 text-white rounded-tl-none rounded-2xl"
                >
                  {{ article.category.name }}
                </div>
              </div>
              <div class="text-black font-bold lg:text-2xl">
                {{ article.name }}
              </div>
              <div class="mt-autoa">{{ article.date }}</div>
            </div>
          </NuxtLink>
        </div>
        <div v-else class="mt-5">Записей нету</div>
      </div>
    </div>
    <div>{{ console.log(getArticles) }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "~/stores";
import createError from "http-errors";

const isLoading = ref(true);

const store = useStore();
const { id } = useRoute().params;
console.log(id);

await store.fetchCurrentCategory(id);

const getCategory = computed(() => {
  return store.getCurrentCategory;
});

await store.fetchArticles(id);

const getArticles = computed(() => {
  return store.getArticles;
});

isLoading.value = false;
</script>

<style scoped></style>
