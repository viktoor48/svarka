<template>
  <div class="mx-auto bg-[#f9faff] w-full">
    <div class="p-5 mx-auto">
      <div class="container">
        <h2 class="text-2xl font-bold">Добавление рекламы</h2>
        <LoadingSpinner v-if="isLoading" />
        <div v-else class="container">
          <div class="text-lg mt-5 mb-2" for="category">Выберите категорию</div>
          <div>
            <select
              v-if="getCategorys"
              v-model="selectedCategory"
              name="category"
              id="categorySelect"
              class="outline-none bg-gray-100 border border-[#ccc] rounded-md py-1 px-3"
            >
              <option
                v-for="category in getCategorys"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <div>
            <div
              class="grid grid-cols-1 gap-5 mt-10"
              v-if="getCategory?.articles.length"
            >
              <div class="text-lg">
                Выберите статью в которой хотите разместить рекламу
              </div>
              <div v-for="(article, ind) in getArticles" :key="ind">
                <div
                  class="flex hover:scale-[1.02] duration-300 rounded-xl bg-white relative"
                  @click="chooseArticle(article.id)"
                  :class="
                    article.id == choosedArticle
                      ? 'border-2 border-orange-600'
                      : ''
                  "
                >
                  <div class="basis-2/5 flex-shrink-0">
                    <img
                      class="rounded-l-xl h-full object-cover"
                      :src="article.image"
                      alt=""
                    />
                  </div>
                  <div class="flex gap-5 flex-col p-5">
                    <div class="flex items-center">
                      <div
                        class="bg-yellow py-1 px-2 text-white rounded-tl-none rounded-2xl"
                      >
                        {{ article.category.name }}
                      </div>
                    </div>
                    <div class="text-black font-bold lg:text-2xl">
                      {{ article.name }}
                    </div>
                    <div class="mt-auto">
                      {{ formatDateToRussian(article.date) }}
                    </div>
                  </div>
                </div>
                <div v-if="article.id == choosedArticle" class="mt-5">
                  <div>
                    Выберите блок после которого хотите разместить рекламу:
                  </div>
                  <div v-if="blocks?.blocks.length" class="flex flex-col gap-5 mt-2">
                    <div
                      v-for="(block, index) in blocks.blocks"
                      :key="index"
                      class="border-2 rounded-2xl border-grey p-2"
                      @click="chooseBlock(block.id)"
                      :class="
                        block.id == choosedBlock
                          ? 'border-2 border-orange-600'
                          : ''
                      "
                    >
                      <div class="flex items-baseline justify-between">
                        <div>
                          <span class="text-orange-300 text-5xl">{{
                            index + 1
                          }}</span
                          >-й блок
                        </div>
                      </div>
                      <div
                        v-if="block.type === 'text'"
                        class="flex flex-col gap-3"
                      >
                        <div>Заголовок</div>
                        <input
                          type="text"
                          :name="`block-title-${index}`"
                          v-model="block.title"
                          disabled
                          class="border w-full border-gray-300 p-2 hover:border-gray-500 active:border-gray-500 outline-none"
                        />
                        <textarea
                          class="border w-full border-gray-300 p-2 hover:border-gray-500 active:border-gray-500 outline-none"
                          cols="30"
                          rows="5"
                          v-model="block.content"
                          disabled
                        ></textarea>
                      </div>
                      <div v-else class="flex flex-col gap-3">
                        <div>Заголовок</div>
                        <input
                          type="text"
                          disabled
                          :name="`block-title-${index}`"
                          v-model="block.title"
                          class="border w-full border-gray-300 p-2 hover:border-gray-500 active:border-gray-500 outline-none"
                        />
                        <div>
                          <img v-show="block.content" :src="block.content" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="text-red-600">
                    Блоков нету
                  </div>
                </div>
              </div>
              <div v-if="choosedBlock != null">
                <form @submit.prevent="sendForm" class="flex flex-col gap-2">
                  <div>
                    <label class="font-bold" for="link"
                      >Введите ссылку на магазин</label
                    >
                    <div class="mt-1">
                      <input
                        class="py-1 px-3 border border-gray-400 rounded-2xl w-full"
                        type="text"
                        name="link"
                        required
                        pattern="https?://.+"
                        title="Введите корректную ссылку, начинающуюся с http:// или https://"
                        v-model="linkInput"
                      />
                    </div>
                  </div>
                  <div>
                    <label class="font-bold" for="text">Текст к ссылке</label>
                    <div class="mt-1">
                      <input
                        class="py-1 px-3 border border-gray-400 rounded-2xl w-full"
                        type="text"
                        name="text"
                        v-model="textInput"
                      />
                    </div>
                  </div>
                  <div class="flex justify-center">
                    <button
                      type="submit"
                      class="bg-yellow flex py-2 px-4 rounded-2xl items-center justify-center hover:scale-105 duration-100"
                    >
                      Сохранить
                    </button>
                  </div>
                </form>
              </div>
              {{ console.log(getCategory) }}
            </div>
            <div v-else class="mt-5">Записей нету</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/stores";
import { useRouter } from "vue-router";
import {
  convertToSlug,
  getIdFromUrl,
  formatDateToRussian,
} from "~/helpers/index";

const store = useStore();
const router = useRouter();
const isLoading = ref(true);
const selectedCategory = ref(null);
const choosedArticle = ref(null);
const choosedBlock = ref(null);
const blocks = ref(null);

const textInput = ref();
const linkInput = ref();

const getUser = computed(() => {
  return store.getUser;
});

(async () => {
  if (!getUser.value) {
    await router.push("/");
  } else {
    await store.fetchCategories();
    isLoading.value = false;
    if (getCategorys.value.length > 0) {
      selectedCategory.value = getCategorys.value[0].id;
      await store.fetchCurrentCategory(selectedCategory.value);
      await store.fetchArticles(selectedCategory.value);
      console.log("category");
      console.log(selectedCategory);
    }
  }
})();

const getCategorys = computed(() => {
  return store.getCategories["hydra:member"];
});

const getCategory = computed(() => {
  return store.getCurrentCategory;
});

const getArticles = computed(() => {
  return store.getArticles;
});

watch(selectedCategory, async (newValue) => {
  if (newValue) {
    await store.fetchCurrentCategory(selectedCategory.value);
    await store.fetchArticles(selectedCategory.value);
  }
});

async function chooseArticle(id) {
  choosedArticle.value = id;
  await store.fetchBlocks(id);
  blocks.value = store.getBlocks;
  console.log(blocks.value);
}

function chooseBlock(id) {
  choosedBlock.value = id;
  console.log(id);
}

async function sendForm() {
  let formData = {
    article_id: choosedArticle.value,
    link: linkInput.value,
    text: textInput.value,
    block: choosedBlock.value,
  };

  console.log(formData);
  const response = await store.addReclame(formData);
  if (response) {
    await router.push("/");
  }
}
</script>
