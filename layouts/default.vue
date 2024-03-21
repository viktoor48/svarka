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
            <ul class="flex text-default">
              <li class="ml-[20px] cursor-pointer"><NuxtLink to="/catalogProducts">Каталог</NuxtLink></li>
              <li class="ml-[20px] cursor-pointer flex"><NuxtLink class="mr-[4px]" to="/cartPage">Корзина</NuxtLink><CartIcon/></li>
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
          Copyright © 2023 HubSpot, Inc.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>

</script>