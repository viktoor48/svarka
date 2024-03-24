<template>
    <div>
        {{ head }}
    </div>
  </template>
  
  <script setup>
  import {useStore} from "~/stores";
  
  const store = useStore();
  const props = defineProps({
    head: {
      type: Object,
      required: true,
    }
  });
  
  const addProductToCart = (product) => {
    console.log(product.id);
    store.addToCart(product);
  };
  </script>
  