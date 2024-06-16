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
          <div class="flex justify-center max-w-[990px]">
            <div class="w-full">
              <img
                :src="getCurrentArticle.article.image"
                class="rounded-xl w-full"
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
            <div v-else class="flex justify-center max-w-[990px]">
              <div class="w-full">
                <img :src="block.content" class="rounded-xl w-full" alt="" />
              </div>
            </div>
          </div>
          <div
            v-if="getCurrentArticle.article.reclame?.block == block.id"
            class="p-2 rounded-2xl"
          >
            <div v-if="!getCurrentArticle.article.reclame.text" class="text-lg">
              Данный товар можно приобрести
              <NuxtLink
                :to="getCurrentArticle.article.reclame.link"
                target="_blank"
                class="text-blue-500 uppercase"
                >здесь</NuxtLink
              >
            </div>
            <div v-else class="text-lg">
              <NuxtLink
                :to="getCurrentArticle.article.reclame.link"
                target="_blank"
                class="text-blue-500 uppercase"
              >
                {{ getCurrentArticle.article.reclame.text }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <div
          v-if="
            getCurrentArticle.article.reclame &&
            !getCurrentArticle.article.reclame.block
          "
          class="text-yellow rounded-2xl"
        >
          <div v-if="!getCurrentArticle.article.reclame.text" class="text-lg">
            Данный товар можно приобрести
            <NuxtLink
              :to="getCurrentArticle.article.reclame.link"
              target="_blank"
              class="text-blue-500 uppercase"
              >здесь</NuxtLink
            >
          </div>
          <div v-else class="text-lg">
            <NuxtLink
              :to="getCurrentArticle.article.reclame.link"
              target="_blank"
              class="text-blue-500 uppercase"
            >
              {{ getCurrentArticle.article.reclame.text }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "~/stores";

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
