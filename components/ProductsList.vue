<template>
  <div class="py-4" ref="scrollComponent">
    <h2 class="text-xl font-bold">
      Список товаров
    </h2>
    <div v-if="props.isFilter" class="grid gap-4 mt-4 grid-cols-n">
      <ProductItem v-for="product in getFilteredProducts" :key="product.id" :product="product"/>
    </div>
    <div v-else class="grid gap-4 mt-4 grid-cols-n">
      <ProductItem v-for="product in getProducts" :key="product.id" :product="product"/>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "../stores";
import {computed, onMounted, onUnmounted, ref} from "vue";

const props = defineProps({
  isFilter: {
    type: Boolean,
    required: false
  }
});
let isLoading = ref(false);
const scrollComponent = ref(null);
const step = 5;
const store = useProductStore();
await store.fetchProductLimit(step);

const getProducts = computed(() => {
  return store.getProductsLimit;
});

const loadMoreProducts = async () => {
  if (isLoading.value) {
    return;
  }
  isLoading.value = true;
  const currentLimit = store.getProductsLimit.length;
  const newLimit = currentLimit + step;
  try {
    await store.fetchProductLimit(newLimit);
    isLoading.value = false;
  } catch (e) {
    console.log(e);
    isLoading.value = false;
  }
};

const getFilteredProducts = computed(() => {
  return store.getFilteredProducts;
});

const handleScroll = (e) => {
  let element = scrollComponent.value;
  if (element.getBoundingClientRect().bottom < window.innerHeight) {
    loadMoreProducts();
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>