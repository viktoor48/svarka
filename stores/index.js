import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
    state: () => {
        return {
            products: [],
            cart: [],
            currentProduct: {},
            categories: [],
            filteredProducts: [],
            productsLimit: [],
        }
    },
    actions: {
        updateCart(cart) {
            if (process.client) {
                this.cart = cart;
            }
        },
        updateFilteredProducts(products) {
            this.filteredProducts = products;
        },
        addToCart(item) {
            if (this.cart == null) {
                this.cart = [];
            }
            if (this.cart.length === 0) {
                item.count = 1;
                this.cart.push(item);
                localStorage.setItem('cart', JSON.stringify(this.cart));
                console.log(JSON.parse(localStorage.getItem('cart')));
                return;
            }

            const product = this.cart.find((product) => {
                if (product.id == item.id) {
                    product.count++;
                    return product;
                }
            })

            if (!product) {
                item.count = 1;
                this.cart.push(item);
            }

            localStorage.setItem('cart', JSON.stringify(this.cart));
            console.log(JSON.parse(localStorage.getItem('cart')));
        },
        minesFromCart(item) {
            this.cart.forEach(product => {
                if (item.id == product.id) {
                    product.count--;
                }
            });
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        removeFromCart(item) {
            this.cart = this.cart.filter((product) => product.id !== item.id)
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        async fetchProducts() {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();

                this.products = data;
            } catch (e) {
                console.error(e);
            }
        },
        async fetchProductLimit(limit) {
            try {
                const response = await fetch(`https://fakestoreapi.com/products?limit=${limit}`);
                const data = await response.json();

                this.productsLimit = data;
            } catch (e) {
                console.log(e);
            }
        },
        async fetchCurrentProduct(id) {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                const product = await response.json();

                this.currentProduct = product;
            } catch (e) {
                console.log(e);
            }
        },
        async fetchCategories() {
            try {
                const response = await fetch('https://fakestoreapi.com/products/categories');
                const categories = await response.json();
                console.log('categories');
                this.categories = categories;
            } catch (e) {
                console.log(e);
            }
        },
        getCartFromStorage() {
            const cart = localStorage.getItem('cart');

            if (cart === null) {
                return [];
            }

            try {
                return JSON.parse(cart);
            } catch (e) {
                localStorage.removeItem('cart')
                return [];
            }
        },
    },
    getters: {
        getProducts(state) {
            return state.products;
        },
        getCart(state) {
            return state.cart;
        },
        getCurrentProduct(state) {
            return state.currentProduct;
        },
        getCategories(state) {
            return state.categories;
        },
        getFilteredProducts(state) {
            return state.filteredProducts;
        },
        getProductsLimit(state) {
            return state.productsLimit;
        },
    },
})