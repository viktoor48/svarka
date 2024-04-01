<script setup>
import { VueFinalModal, useVfm } from 'vue-final-modal'
import { useStore } from '~/stores';

const vfm = useVfm();
const store = useStore();

const email = ref('')
const password = ref('')

const handleLogin = async (e) => {
  e.preventDefault();
  await store.onLogin(email.value, password.value)
  console.log(store.getUser);
  if (store.getUser != null) {
    vfm.close('authorization');
    vfm.open('confirm');
  }
}

</script>

<template>
  <VueFinalModal
    content-class="fixed inset-0 z-20 sm:rounded-3xl bg-white p-10 md:bottom-auto md:left-1/2 md:right-auto md:top-1/3 md:w-[640px] md:-translate-x-1/2 md:-translate-y-1/4"
    modal-id="authorization"
  >
    <form @submit.stop="handleLogin" class="text-black">
      <button type="button" class="absolute right-6 top-6" @click="vfm.close('authorization')">
        <div class="relative flex size-6">
          <span class="absolute top-[7px] h-0.5 w-full translate-y-1 rotate-45 bg-black" />
          <span class="absolute bottom-[7px] h-0.5 w-full -translate-y-1 -rotate-45 bg-black" />
        </div>
      </button>
      <p class="text-3xl font-bold text-center font-title">
        Авторизация
      </p>
      <div class="flex flex-col gap-5 mt-5">
        <div class="flex flex-col gap-2">
          <label for="email">Логин</label>
          <input required v-model="email" class="w-full border p-2 rounded-xl" type="email" name="email" placeholder="example@mail.ru">
        </div>
        <div class="flex flex-col gap-2">
          <label for="password">Пароль</label>
          <input required v-model="password" class="w-full border p-2 rounded-xl" type="password" name="password" placeholder="">
        </div>
      </div>
      <div class="flex justify-center mt-5">
        <button type="submit" class="py-2 px-5 text-lg bg-yellow rounded-2xl">Отправить</button>
      </div>
    </form>
  </VueFinalModal>
</template>

<style scoped>

</style>