<template>
  <div class="mx-auto bg-[#f9faff] w-full">
    <div class="p-5 mx-auto">
      <div class="container">
        <h2 class="text-2xl font-bold">Разделы</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
          <NuxtLink class="flex flex-col gap-5 hover:scale-105 duration-300" v-for="(category, ind) in categories" :key="ind" :to="`/category/${category.category_name}`">
            <div class="relative">
              <img
                :src="category.img"
                class="rounded-xl w-full object-cover md:h-[340px] lg:h-[378px] xl:h-[250px]"
                alt=""
              />
              <div class="absolute bottom-0 left-0 right-0 p-5 text-xl font-bold text-white">{{ category.title }}</div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/stores";
import { onMounted } from "vue";

const store = useStore();

onMounted(() => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  store.updateCart(cart);
  store.fetchCategoriesTest;
});

const categories = [
  {
    title: "Виды и способы сварки",
    img: "/assets/images/categories/vidiisposobisvarki.jpeg",
    category_name: "vidy-i-sposoby-svarki",
    category_id: 1,
  },
  {
    title: "Изделия и конструкции",
    img: "/assets/images/categories/izdeliaikonstructions.jpeg",
    category_name: "izdeliya-i-konstruktsii",
    category_id: 2,
  },
  {
    title: "Интересности",
    img: "/assets/images/categories/interesnosti.jpeg",
    category_name: "interesnosti",
    category_id: 3,
  },
  {
    title: "Оборудование",
    img: "/assets/images/categories/oborudovanie.png",
    category_name: "oborudovanie",
    category_id: 4,
  },
  {
    title: "Обучение сварке",
    img: "/assets/images/categories/obucheniesvarke.jpg",
    category_name: "obuchenie-svarke",
    category_id: 5,
  },
  {
    title: "Расходные материалы",
    img: "/assets/images/categories/rashodniemateriali.png",
    category_name: "rashodnye-materialy",
    category_id: 6,
  },
  {
    title: "Сварочные технологии",
    img: "/assets/images/categories/svarochnietechnologii.jpeg",
    category_name: "tehnologii",
    category_id: 7,
  },
  {
    title: "Флюс и проволока",
    img: "/assets/images/categories/flusiprovoloka.png",
    category_name: "flyus-i-svarochnaya-provoloka",
    category_id: 8,
  },
  {
    title: "Швы и соединения",
    img: "/assets/images/categories/shviisoedinenia.png",
    category_name: "shvy-i-soedineniya",
    category_id: 9,
  },
];
</script>
