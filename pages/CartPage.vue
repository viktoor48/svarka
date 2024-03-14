<template>
  <div class="container">
    <div>
      <div v-for="cart in getCart" :key="cart.id" class="border-t-[1px] border-[#2e475d] first:border-0 flex justify-between py-4">
        <div class="h-[156px] flex justify-center items-center w-1/4">
          <img class="max-h-full max-w-full object-cover" :src="cart.image" alt="">
        </div>
        <div class="w-2/4 flex-col justify-between flex">
          <div>
            <div class="mb-2">{{cart.title}}</div>
            <div>
              Категория: {{ cart.category }}
            </div>
          </div>
          <div>
            <button @click="removeProduct(cart)" class="p-2">Удалить</button>
          </div>
        </div>
        <div class="flex flex-col justify-between w-1/4">
          <div class="text-xl">
            {{ cart.price }}$
          </div>
          <div class="flex justify-between">
            <div @click="minesProduct(cart)" class="text-2xl cursor-pointer" :class="{'text-gray-300': cart.count == 1}">-</div>
            <div class="text-2xl">{{ cart.count }}</div>
            <div @click="addProduct(cart)" class="text-2xl cursor-pointer">+</div>
          </div>
        </div>
      </div>
      <div class="text-2xl my-6 ml-5">
        Итого: {{getTotalPrice}}$
      </div>
    </div>
  </div>
</template>

<script setup>
import {useProductStore} from "../stores";
import {computed, onMounted} from "vue";

const store = useProductStore();

const getCart = computed(() => {
  return store.getCart;
});

const getTotalPrice = computed(() => {
  let price = 0;
  getCart.value.forEach(product => {
    price += product.count * product.price;
  });

  return price;
});

const addProduct = (product) => {
  store.addToCart(product);
};

const minesProduct = (product) => {
  if (product.count > 1) {
    store.minesFromCart(product);
  }
};

const removeProduct = (product) => {
  store.removeFromCart(product);
};
</script>

