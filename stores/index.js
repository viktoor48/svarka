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
    };
  },
  actions: {
    async fetchCurrentCategory(id) {
      //рабочая
      try {
        const response = await fetch(
          `http://localhost:8000/api/categoriess/${id}`
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
        const response = await fetch(
          `http://localhost:8000/category/${categoryId}/article/${articleId}`
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
        const response = await fetch("http://localhost:8000/api/categoriess");
        const categories = await response.json();
        this.categories = categories;
      } catch (e) {
        console.log(e);
      }
    },
    async fetchArticles(id) {
      //рабочая //контроллер
      try {
        const response = await fetch(`http://localhost:8000/category/${id}`);
        const articles = await response.json();
        this.articles = articles;
      } catch (e) {
        console.log(e);
      }
    },
    async createNewArticle(formData) {
      try {
        const url = "http://localhost:8000/create/new/article";

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        console.log('response:');
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
    async onLogin(email, password) {
      try {
        const url = "http://localhost:8000/login";
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
        const response = await fetch(`http://localhost:8000/delete/article/${articleId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to delete article');
        }
    
        return true;
      } catch (error) {
        console.error('Error deleting article:', error.message);
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
      localStorage.setItem('categoryId', id);
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
  },
});
