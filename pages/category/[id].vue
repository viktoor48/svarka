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
            class="flex hover:scale-[1.02] duration-300 rounded-xl bg-white relative"
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
              <div class="mt-auto">{{ formatDateToRussian(article.date) }}</div>
            </div>
            <NuxtLink v-if="getUser" :to="`/edit/article/${article.id}`" class="absolute z-10 right-11 top-4 w-6 trash">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke=""
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
            </NuxtLink>
            <div
              v-if="getUser"
              class="absolute z-10 right-3 top-4 w-6 trash"
              @click.prevent="deleteArticle(article)"
            >
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
import { formatDateToRussian } from "~/helpers";

const isLoading = ref(true);

const store = useStore();
const { id } = useRoute().params;

const getUser = computed(() => {
  return store.getUser;
});

await store.fetchCurrentCategory(id);

const getCategory = computed(() => {
  return store.getCurrentCategory;
});

await store.fetchArticles(id);

const getArticles = computed(() => {
  return store.getArticles;
});

isLoading.value = false;

store.setCategoryId(getCategory.value.id);

const deleteArticle = async (article) => {
  let articleId = article.id;
  console.log(articleId);
  const isDeleted = await store.deleteArticle(articleId);
  if (isDeleted) {
    alert("Статья успешно удалена");
    await store.fetchArticles(id);
  } else {
    console.error("Failed to delete article");
    alert("Не удалось удалить данную статью");
  }
};
</script>

<style scoped>
.trash:hover path {
  @apply stroke-orange-300 duration-300;
}
</style>
