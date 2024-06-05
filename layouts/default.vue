<template>
  <div class="flex flex-col w-full h-full text-default">
    <header class="bg-yellow p-4">
      <div class="container">
        <div>
          <nav class="flex justify-between items-center">
            <div>
              <NuxtLink to="/">
                <img src="~/assets/images/logo.svg" class="max-w-14 max-h-14" alt="">
              </NuxtLink>
            </div>
            <ul v-if="!getUser" class="flex text-default">
              <li class="ml-[20px] cursor-pointer"><NuxtLink href="https://telegram.im/@roshchupkinnn" target="_blank">Связаться с нами</NuxtLink></li>
              <li class="ml-[20px] cursor-pointer"><NuxtLink @click="vfm.open('authorization')">Войти</NuxtLink></li>
            </ul>
            <ul v-else class="flex text-default">
              <li v-if="getUser.id == 2" class="ml-[20px] cursor-pointer"><NuxtLink to="/create/Article">Создать запись</NuxtLink></li>
              <li v-if="getUser.id != 2" class="ml-[20px] cursor-pointer"><NuxtLink to="/addReclame">Добавить рекламу</NuxtLink></li>
              <li class="ml-[20px] cursor-pointer"><NuxtLink @click="logout">Выйти</NuxtLink></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <main class="text-[#2e475d] flex flex-auto">
      <slot/>
    </main>
    <footer class="bg-yellow p-4 w-full">
      <div class="container">
        <div class="text-blue text-center">
          Copyright © 2024 Welding, Inc.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useStore } from '~/stores';
import { useVfm } from 'vue-final-modal';

const store = useStore();

const vfm = useVfm();

const getUser = computed(() => {
  return store.getUser;
});

console.log(getUser);

function logout() {
  store.logout();
}

</script>