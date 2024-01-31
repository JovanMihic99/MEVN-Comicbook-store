import { defineStore } from "pinia";
import axios from "axios";

export const useProductsStore = defineStore("products", {
  state: () => {
    return {
      products: [],
    };
  },
  actions: {
    async fetchProducts() {
      try {
        const res = await axios.get(
          "http://192.168.0.19:3500/api/v1/products/"
        );
        this.products = res.data.response.products;
      } catch (error) {
        return error.message;
      }
    },
  },
  getters: {},
});