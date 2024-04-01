<script setup>
import { useField, useForm } from 'vee-validate';

const { handleSubmit, errors } = useForm();
const { value: email, errorMessage: emailError } = useField('email');
const { value: password, errorMessage: passwordError } = useField('password');

const submitForm = handleSubmit(() => {
  // Здесь можно выполнить логику для отправки данных формы
  console.log('Форма отправлена!');
});
</script>

<template>
    <div>
      <div class="group relative">
        <span class="text-gray-dark pointer-events-none relative left-1 select-none duration-300">Email</span>
        <input
          v-model="email"
          type="email"
          class="w-full rounded-xl focus:outline-none"
          placeholder="Введите ваш email"
          v-validate="'required|email'"
          :class="{'border border-red': errors.has('email')}"
        >
        <p class="ml-5 mt-1 text-red" v-if="errors.has('email')">{{ errors.first('email') }}</p>
      </div>
  
      <div class="group relative">
        <span class="text-gray-dark pointer-events-none relative left-1 select-none duration-300">Пароль</span>
        <input
          v-model="password"
          type="password"
          class="w-full rounded-xl focus:outline-none"
          placeholder="Введите ваш пароль"
          v-validate="'required|min:6'"
          :class="{'border border-red': errors.has('password')}"
        >
        <p class="ml-5 mt-1 text-red" v-if="errors.has('password')">{{ errors.first('password') }}</p>
      </div>
  
      <button @click="submitForm" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Войти</button>
    </div>
  </template>
  