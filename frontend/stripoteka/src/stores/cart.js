import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "./user";
import config from "../config";
export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      items: [],
    };
  },
  actions: {
    async addToCart(productId, quantity) {
      const userStore = useUserStore();
      const headers = {
        Authorization: "Bearer " + userStore.token,
      };
      const reqBody = {
        productId,
        quantity,
      };
      try {
        const res = await axios.post(
          config.API_URL + "/api/v1/user/cart",
          reqBody,
          {
            headers,
          }
        );
        console.log(res.data);
        console.log(this.items);

        await this.getCart();
      } catch (error) {
        return error.message;
      }
    },
    async getCart() {
      const userStore = useUserStore();
      const headers = {
        Authorization: "Bearer " + userStore.token,
      };
      try {
        const res = await axios.get(config.API_URL + "/api/v1/user/cart", {
          headers,
        });

        this.items = res.data.items;
      } catch (error) {
        return error.message;
      }
    },
    async removeFromCart(id) {
      const userStore = useUserStore();
      const headers = {
        Authorization: "Bearer " + userStore.token,
      };
      // remove item from pinia store
      let updatedItems = [...this.items];
      updatedItems = updatedItems.filter((item) => {
        console.log(item);
        return item._id.toString() !== id;
      });
      this.items = [...updatedItems];

      try {
        // remove item from server
        await axios.delete(config.API_URL + "/api/v1/user/cart/" + id, {
          headers,
        });

        // this.items = res.data.items;
      } catch (error) {
        return error.message;
      }
    },
    async editItem(productId, quantity) {
      const userStore = useUserStore();
      const headers = {
        Authorization: "Bearer " + userStore.token,
      };
      const reqBody = { productId, quantity };
      try {
        const res = await axios.patch(
          config.API_URL + "/api/v1/user/cart",
          reqBody,
          { headers }
        );
        this.items = res.body.data.items;
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    totalPrice: (state) => {
      let total = state.items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);

      return total;
    },
  },
});
