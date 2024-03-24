import { defineStore } from 'pinia'
import { categories } from '~/constants/data'

export const useStore = defineStore('product', {
    state: () => {
        return {
            categories: [],
            currentCategory: null,
            articles: null,
            currentAtricle: null,
        }
    },
    actions: {
        async fetchCurrentCategory(id) {
            //рабочая
            try {
                const response = await fetch(`http://localhost:8000/api/categoriess/${id}`);
                const category = await response.json();
                this.currentCategory = category;
            } catch (e) {
                console.log(e);
            }
        },
        async fetchCurrentArticle(categoryId, articleId) {
            //рабочая
            try {
                const response = await fetch(`http://localhost:8000/category/${categoryId}/article/${articleId}`);
                const article = await response.json();
                this.currentAtricle = article;
            } catch (e) {
                console.log(e);
            }
        },
        async fetchCategories() {
            //рабочая
            try {
                const response = await fetch('http://localhost:8000/api/categoriess');
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
    },
})