<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "~/stores";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const isLoading = ref(true);
const selectedCategory = ref(null);
const article = ref({ text: "Текст блока", image: null });
const blocks = ref([]);

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
    }
  }
})();

watch(getUser, async (newValue) => {
  console.log("auth");
  if (!newValue) {
    console.log("not auth");
    await router.push("/");
  }
});

const getCategorys = computed(() => {
  return store.getCategories["hydra:member"];
});

const createBlock = (type) => {
  if (type === "text") {
    blocks.value.push({ type: "text", content: "Новый текстовый блок", title: '', });
  } else if (type === "image") {
    blocks.value.push({ type: "image", content: "Путь к изображению", title: '', });
  }
};

// Обработчик загрузки изображения для основного блока
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  console.log(file);
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      article.value.image = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

// Обработчик загрузки изображения для блока
const handleBlockImageUpload = (event, index) => {
  const file = event.target.files[0];
  console.log(file);
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      blocks.value[index].image = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

//  /assets/images/articles/name
const uploadImageArticle = async (event) => {
  const file = event.target.files[0];
  const directoryHandle = await window.showDirectoryPicker(); //чтение файлов
  const fileHandle = await directoryHandle.getFileHandle(file.name, {
    create: true,
  });
  const writable = await fileHandle.createWritable();
  await writable.write(file);
  await writable.close();
  console.log("Имя файла:", fileHandle.name);
  article.value.image = `/assets/images/forNewArticles/${fileHandle.name}`;
};

// /assets/images/blocks/name
const uploadImageBlock = async (event, index) => {
  const file = event.target.files[0];
  const directoryHandle = await window.showDirectoryPicker(); //чтение файлов
  const fileHandle = await directoryHandle.getFileHandle(file.name, {
    create: true,
  });
  const writable = await fileHandle.createWritable();
  await writable.write(file);
  await writable.close();
  console.log("Имя файла:", fileHandle.name);
  blocks.value[index].image = `/assets/images/forNewArticles/${fileHandle.name}`;
};

const save = async () => {
  let formData = {
    categoryId: selectedCategory.value,
    article: article.value,
    blocks: blocks.value,
  }
  
  console.log(formData);
  const response = await store.createNewArticle(formData);
  console.log(response);
  await router.push("/");
}
</script>

<template>
  <div class="mx-auto bg-[#f9faff] w-full">
    <div class="p-5 mx-auto">
      <LoadingSpinner v-if="isLoading" />
      <div v-else class="container">
        <h2 class="text-2xl font-bold">Создание новой записи</h2>
        <div class="flex flex-col gap-2 mt-5">
          <label class="text-lg" for="category">Выберите категорию</label>
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
          <div class="flex flex-col gap-2">
            <div class="flex items-baseline">
              <span class="text-orange-300 text-5xl">1</span>-й блок
            </div>
            <form id="first-block" class="flex flex-col gap-5">
              <textarea
                v-model="article.text"
                class="border border-gray-300 p-2 hover:border-gray-500 active:border-gray-500 outline-none"
              />
              <div>
                <input
                  type="file"
                  class=""
                  name="img-first-block"
                  @change="uploadImageArticle($event)"
                />
              </div>
              <div>
                <img v-show="article.image" :src="article.image" />
              </div>
            </form>

            <div class="flex flex-col gap-5">
              <div v-for="(block, index) in blocks" :key="index">
                <div class="flex items-baseline">
                  <span class="text-orange-300 text-5xl">{{ index + 2 }}</span
                  >-й блок
                </div>
                <div v-if="block.type === 'text'" class="flex flex-col gap-3">
                  <label :for="`block-title-${index}`">Заголовок</label>
                  <input type="text" :name="`block-title-${index}`" v-model="block.title" class="border w-full border-gray-300 p-2 hover:border-gray-500 active:border-gray-500 outline-none">
                  <textarea
                    class="border w-full border-gray-300 p-2 hover:border-gray-500 active:border-gray-500 outline-none"
                    cols="30"
                    rows="5"
                    v-model="block.content"
                  ></textarea>
                </div>
                <div v-else class="flex flex-col gap-3">
                  <label :for="`block-title-${index}`">Заголовок</label>
                  <input type="text" :name="`block-title-${index}`" v-model="block.title" class="border w-full border-gray-300 p-2 hover:border-gray-500 active:border-gray-500 outline-none">
                  <label :for="`block-${index}`"> Загрузите картинку </label>
                  <div>
                    <input
                      type="file"
                      :name="`block-${index}`"
                      @change="uploadImageBlock($event, index)"
                    />
                  </div>
                  <div>
                    <img v-show="block.image" :src="block.image" />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex gap-5 flex-wrap">
              <button
                @click="createBlock('text')"
                class="py-2 px-5 text-lg bg-yellow rounded-2xl duration-300 hover:scale-105"
              >
                Создать текстовый блок
              </button>
              <button
                @click="createBlock('image')"
                class="py-2 px-5 text-lg bg-yellow rounded-2xl duration-300 hover:scale-105"
              >
                Создать блок с картинкой
              </button>
              <button
                @click="save()"
                class="py-2 px-5 text-lg bg-orange-300 rounded-2xl duration-300 hover:scale-105"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
