<template>
  <div class="mx-auto bg-[#f9faff] w-full">
    <div class="p-5 mx-auto">
      <div class="container">
        <div class="py-5 flex flex-col gap-5">
          <div>
            <h1 class="text-3xl font-bold font-montserrat">
              Добро пожаловать на наш сайт о сварке!
            </h1>
          </div>
          <div>
            <p class="text-2xl font-bold">О нашем сайте</p>
          </div>
          <div>
            <p class="text-base leading-7">Мы рады приветствовать вас на нашем информационном ресурсе, посвященном всем аспектам сварки. Здесь вы найдете исчерпывающую информацию о различных методах сварки, их применении, оборудовании и технологиях. Наш сайт создан для профессионалов, новичков и всех, кто интересуется сваркой.</p>
          </div>
        </div>
        <h2 class="text-2xl font-bold">Категории</h2>
        <div v-if="loading">Loading...</div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
          <NuxtLink class="flex flex-col gap-5 hover:scale-105 duration-300" v-for="(category, ind) in getCategories" :key="ind" :to="`/category/${category.id}`">
            <div class="relative">
              <img
                :src="category.image"
                class="rounded-xl w-full object-cover md:h-[340px] lg:h-[378px] xl:h-[250px]"
                alt=""
              />
              <div class="absolute bottom-0 left-0 right-0 p-5 text-xl font-bold text-white">{{ category.name }}</div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/stores";
import { convertToSlug, getIdFromUrl } from "~/helpers/index";

const store = useStore();
const loading = ref(true);

await store.fetchCategories();
loading.value = false;

const getCategories = computed(() => {
  return store.getCategories['hydra:member'];
});
</script>
