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
            class="flex hover:scale-105 duration-300 rounded-xl bg-white relative"
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
            <div class="absolute z-10 right-3 top-4 w-6 trash" @click.prevent="deleteArticle(article)">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M20.5001 6H3.5"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>
                  <path
                    d="M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>
                  <path
                    d="M9.5 11L10 16"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>
                  <path
                    d="M14.5 11L14 16"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>
                  <path
                    d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
                    stroke="#1C274C"
                    stroke-width="1.5"
                  ></path>
                </g>
              </svg>
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

const deleteArticle = async (article) => {
  let articleId = article.id;
  console.log(articleId);
  const isDeleted = await store.deleteArticle(articleId);
  if (isDeleted) {
    alert('Статья успешно удалена');
    await store.fetchArticles(id);
  } else {
    console.error('Failed to delete article');
    alert('Не удалось удалить данную статью');
  }
};
</script>

<style scoped>
.trash:hover path {
  @apply stroke-orange-300 stroke-orange-300 duration-300;
}
</style>
