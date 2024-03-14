<template>
  <div class="container">
    <div class="w-full">
      <ProductsList />
    </div>
  </div>
</template>

<script setup>
import {useProductStore} from "../stores";
import {onMounted} from "vue";

const store = useProductStore();

onMounted( () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  store.updateCart(cart);
});
</script>
