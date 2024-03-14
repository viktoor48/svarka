<template>
  <div class="flex flex-col w-full h-full">
    <header class="bg-[#213343] p-4">
      <div class="container">
        <div>
          <nav class="flex justify-between">
            <div>
              <NuxtLink to="/" class="text-2xl">
                Online Shop
              </NuxtLink>
            </div>
            <ul class="flex">
              <li class="ml-[20px] cursor-pointer"><NuxtLink to="/catalogProducts">Каталог</NuxtLink></li>
              <li class="ml-[20px] cursor-pointer flex"><NuxtLink class="mr-[4px]" to="/cartPage">Корзина</NuxtLink><CartIcon/></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <main class="text-[#2e475d] p-4 flex flex-auto">
      <slot/>
    </main>
    <footer class="bg-[#213343] p-4 w-full">
      <div class="container">
        <div class="text-blue text-center">
          Copyright © 2023 HubSpot, Inc.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>

</script>