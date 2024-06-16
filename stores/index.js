import { defineStore } from "pinia";

export const useStore = defineStore("product", {
  state: () => {
    return {
      user: JSON.parse(localStorage.getItem("user")) || null,
      categories: [],
      currentCategory: null,
      articles: null,
      currentAtricle: null,
      categoryId: localStorage.getItem("categoryId") || null,
      blocks: [],
    };
  },
  actions: {
    async fetchCurrentCategory(id) {
      //рабочая
      try {
        const apiURL = useRuntimeConfig().public.baseUrl;
        const response = await fetch(
          `${apiURL}/api/categoriess/${id}`
        );
        const category = await response.json();
        this.currentCategory = category;
      } catch (e) {
        console.log(e);
      }
    },
    async fetchCurrentArticle(categoryId, articleId) {
      //рабочая
      try {
        const apiURL = useRuntimeConfig().public.baseUrl;
        const response = await fetch(
          `${apiURL}/category/${categoryId}/article/${articleId}`
        );
        const article = await response.json();
        this.currentAtricle = article;
      } catch (e) {
        console.log(e);
      }
    },
    async fetchCategories() {
      //рабочая
      try {
        const apiURL = useRuntimeConfig().public.baseUrl;
        const response = await fetch(`${apiURL}/api/categoriess`);
        const categories = await response.json();
        this.categories = categories;
      } catch (e) {
        console.log(e);
      }
    },
    async fetchBlocks(id) {
      try {
        const apiURL = useRuntimeConfig().public.baseUrl;
        const response = await fetch(`${apiURL}/article/${id}/blocks`);
        const blocks = await response.json();
        this.blocks = blocks;
      } catch (e) {
        console.log(e);
      }
    },
    async fetchArticles(id) {
      //рабочая //контроллер
      try {
        const apiURL = useRuntimeConfig().public.baseUrl;
        const response = await fetch(`${apiURL}/category/${id}`);
        const articles = await response.json();
        this.articles = articles;
      } catch (e) {
        console.log(e);
      }
    },
    async createNewArticle(formData) {
      try {
        const apiURL = useRuntimeConfig().public.baseUrl;
        const url = `${apiURL}/create/new/article`;

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        console.log("response:");
        console.log(response);

        if (!response.ok) {
          // Если ответ не успешен, обработка ошибки
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json(); // Парсим ответ как JSON
        return responseData;
      } catch (error) {
        console.error("Ошибка при сохранении данных:", error);
        throw error;
      }
    },
    async editArticle(articleId, formData) {
      try {
        const apiURL = useRuntimeConfig().public.baseUrl;
        const url = `${apiURL}/edit/article/${articleId}`;

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        console.log(response);

        if (!response.ok) {
          // Если ответ не успешен, обработка ошибки
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return true;
      } catch (error) {
        console.error("Ошибка при сохранении данных:", error.message);
        return false;
      }
    },
    async addReclame(data) {
      try {
        const apiURL = useRuntimeConfig().public.baseUrl;
        const url = `${apiURL}/add/reclame`;

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        console.log(response);

        if (!response.ok) {
          // Если ответ не успешен, обработка ошибки
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json(); // Парсим ответ как JSON
        return true;
      } catch (e) {
        console.error(e);
      }
    },
    async onLogin(email, password) {
      try {
        const apiURL = useRuntimeConfig().public.baseUrl;
        const url = `${apiURL}/login`;
        const data = {
          email: email,
          password: password,
        };
        console.log(email, password);

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          // Если ответ не успешен, обработка ошибки
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const user = await response.json();

        // Сохраняем пользователя в хранилище
        this.user = user;
        localStorage.setItem("user", JSON.stringify(this.user));
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async deleteArticle(articleId) {
      try {
        const apiURL = useRuntimeConfig().public.baseUrl;
        const response = await fetch(
          `${apiURL}/delete/article/${articleId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete article");
        }

        return true;
      } catch (error) {
        console.error("Error deleting article:", error.message);
        return false;
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      console.log(this.user);
    },
    setCategoryId(id) {
      this.categoryId = id;
      localStorage.setItem("categoryId", id);
    },
  },
  getters: {
    getCurrentCategory(state) {
      return state.currentCategory;
    },
    getCategories(state) {
      return state.categories;
    },
    getArticles(state) {
      return state.articles;
    },
    getCurrentArticle(state) {
      return state.currentAtricle;
    },
    getUser(state) {
      return state.user;
    },
    getCategoryId(state) {
      return state.categoryId;
    },
    getBlocks(state) {
      return state.blocks;
    },
  },
});
