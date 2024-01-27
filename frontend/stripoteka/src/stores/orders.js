import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "./user";
import { useCartStore } from "./cart";

export const useOrdersStore = defineStore("orders", {
  state: () => {
    return {
      orders: [],
    };
  },
  actions: {
    async createOrder(firstName, lastName, shippingAddress, billingAddress) {
      const userStore = useUserStore();
      const cartStore = useCartStore();
      const headers = {
        Authorization: "Bearer " + userStore.token,
      };

      const reqBody = {
        userId: userStore._id,
        firstName,
        lastName,
        shippingAddress,
        billingAddress,
        products: cartStore.items.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
      };
      try {
        const res = await axios.post(
          "http://localhost:3500/api/v1/orders/",
          reqBody,
          {
            headers,
          }
        );
        console.log(res.data);
        console.log(this.orders);
      } catch (error) {
        return error.message;
      }
    },
  },
  getters: {},
});
