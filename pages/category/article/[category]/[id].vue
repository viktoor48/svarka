<template>
  <div class="mx-auto bg-[#f9faff] w-full">
    <div class="p-5 mx-auto container">
      <div v-if="isLoading">Loading...</div>
      <div v-else class="flex flex-col gap-5">
        <div class="flex flex-col gap-5 md:gap-10">
          <div class="flex items-center">
            <div
              class="bg-yellow py-1 px-2 text-white rounded-tl-none rounded-2xl md:text-lg"
            >
              {{ getCurrentArticle.category.name }}
            </div>
          </div>
          <div class="text-base md:text-xl lg:text-2xl font-bold">
            {{ getCurrentArticle.article.name }}
          </div>
          <div class="flex justify-center">
            <div class="max-w-[990px]">
              <img
                :src="getCurrentArticle.article.image"
                class="rounded-xl"
                alt=""
              />
            </div>
          </div>
        </div>
        <div
          v-for="block in getCurrentArticle.article.blocks"
          :key="block.id"
          class="flex flex-col gap-5 md:gap-10"
        >
          <div
            v-if="block.title"
            class="text-base md:text-xl lg:text-2xl font-bold"
          >
            {{ block.title }}
          </div>
          <div>
            <div v-if="block.type === 'text'" class="text-base md:text-lg">
              {{ block.content }}
            </div>
            <div v-else class="flex justify-center">
              <div class="max-w-[990px]">
                <img :src="block.content" class="rounded-xl" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "~/stores";
import createError from "http-errors";

const store = useStore();
const { category, id } = useRoute().params;
console.log(category, id);

const isLoading = ref(true);

await store.fetchCurrentArticle(category, id);
isLoading.value = false;

const getCurrentArticle = computed(() => {
  return store.getCurrentArticle;
});

console.log(getCurrentArticle);
</script>

<style scoped></style>
