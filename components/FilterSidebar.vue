<template>
  <aside class="w-1/4 bg-gray-100 px-4 py-2 mr-5">
    <form @submit.prevent="onSubmit" class="w-full">
      <div class="mb-4">
        <h2 class="text-lg font-semibold">Категории</h2>
        <ul>
          <li>
            <label for="category-all">
              <input id="category-all" type="checkbox" value="all" v-model="selectedCategories">
              Все
            </label>
          </li>
          <li v-for="(category, ind) in getCategories" :key="ind">
            <label for="category-electronics">
              <input id="category-electronics" type="checkbox" :value="category" v-model="selectedCategories">
              {{ categoriesMap.get(category) }}
            </label>
          </li>
        </ul>
      </div>
      <div>
        <h2 class="text-lg font-semibold mb-4">Цены</h2>
        <SliderComponent :options="options" v-model="valueRange"></SliderComponent>
        <div class="filters-price__inputs w-full flex justify-between mt-4">
          <label class="border border-[#D9D9D9] rounded-[6px] p-2 flex">
            <span class="mr-[5px]">от</span>
            <input type="text" min="0" max="9999" v-model="valueRange[0]" placeholder="50" class="bg-none bg-transparent outline-none w-full">
            <span class="mr-[5px]">$</span>
          </label>
          <label class="border border-[#D9D9D9] rounded-[6px] p-2 flex">
            <span class="mr-[5px]">до</span>
            <input type="text" min="0" max="9999" placeholder="150" v-model="valueRange[1]" class="bg-none bg-transparent outline-none w-full">
            <span class="mr-[5px]">$</span>
          </label>
        </div>
      </div>
      <div class="filed-btn mt-4">
        <button type="submit" class="p-2 text-center w-full bg-slate-200 rounded hover:bg-opacity-50">Поиск</button>
      </div>
    </form>
  </aside>
</template>

<script setup>
import {useProductStore} from "../stores";
import {onMounted, computed, ref} from "vue";

const store = useProductStore();
const categoriesMap = new Map([
  ["all", 'Все'],
  ["electronics", 'Электороника'],
  ["jewelery", 'Ювелирные изделия'],
  ["men's clothing", 'Мужская одежда'],
  ["women's clothing", 'Женская одежда'],
]);

const selectedCategories = ref(["all"]);
const valueRange = ref([]);

const getCategories = computed(() => {
  return store.getCategories;
});

const onSubmit = async () => {
  const filteredProducts = store.getProducts.filter((product) => {
    if (selectedCategories.value.includes("all")) {
      return true;
    } else {
      return selectedCategories.value.includes(product.category);
    }
  });

  const filteredProductsByPrice = filteredProducts.filter((product) => {
     return product.price >= valueRange.value[0] && product.price <= valueRange.value[1];
  });

  await store.updateFilteredProducts(filteredProductsByPrice);
};

await store.fetchProducts();
await store.fetchCategories();

const options = computed(() => {
  const products = store.getProducts;
  if (products.length != 0) {
    const prices = store.getProducts.map(({price}) => price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return {
      start: [minPrice, maxPrice],
      connect: true,
      range: {
        min: minPrice,
        max: maxPrice
      }
    };
  }
});

onMounted(async () => {
  await onSubmit();
});
</script>

<style>
.filters-price__label + .filters-price__label {
  @apply ml-[10px]
}

</style>
