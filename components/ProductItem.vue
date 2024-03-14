<template>
  <div class="border rounded p-4 flex flex-col">
    <div class="h-[300px] flex mb-4">
      <img :src="props.product.image" alt="" class="object-cover max-w-full max-h-full m-auto">
    </div>
    <div class="mt-auto">
      <div>
        <NuxtLink class="mb-4 block" :to="`/products/${props.product.id}`">
          <h3 class="font-bold">{{ props.product.title }}</h3>
        </NuxtLink>
        <p class="mb-2">Цена: {{props.product.price}} $</p>
      </div>
      <div>
        <button @click="addProductToCart(props.product)" class="border-r-6 bg-slate-200 rounded p-2 w-full hover:bg-opacity-50">В Корзину</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useProductStore} from "../stores";

const store = useProductStore();
const props = defineProps({
  product: {
    type: Object,
    required: true,
  }
});

const addProductToCart = (product) => {
  console.log(product.id);
  store.addToCart(product);
};
</script>
