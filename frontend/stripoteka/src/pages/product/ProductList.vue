<template>
  <div>
    <v-row>
      <v-col cols="8" md="4" class="mx-auto">
        <v-select
          ref="selectEdition"
          class=""
          label="Edicija"
          chips
          multiple
          @update:menu="applyFilters"
          v-model="editionFilters"
          :items="editions"
        ></v-select>
      </v-col>
    </v-row>

    <h2>{{ editionFilters }}</h2>
    <v-row>
      <v-col cols="12" md="4" class="mx-auto mt-8"> </v-col>
    </v-row>

    <v-row class="mx-3 my-2" justify="center">
      <v-col v-for="p in filteredProducts" :key="p._id" lg="4" md="6" sm="12">
        <product-item
          :_id="p._id"
          :edition="p.edition"
          :title="p.title"
          :issue="p.issue"
          :description="p.description"
          :price="p.price"
          :imageUrl="p.imageUrl"
        >
        </product-item>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ProductItem from "./ProductItem.vue";
import { useProductsStore } from "@/stores/products";
export default {
  components: {
    ProductItem,
  },
  computed: {
    products() {
      return this.productsStore.products;
    },
  },
  setup() {
    const productsStore = useProductsStore();
    return {
      productsStore,
    };
  },
  data() {
    return {
      editionFilters: [],
      filteredProducts: null,
      editions: [
        "Dilan Dog",
        "Milan Dog",
        "Milki Dogi",
        "Milan Dogic",
        "Texas",
        "Wyoming",
      ],
    };
  },
  methods: {
    applyFilters() {
      this.filteredProducts = this.products.filter((p) => {
        return this.editionFilters.includes(p.edition);
      });
    },
  },
  async mounted() {
    // console.log(this.$refs.selectEdition);
    // console.log(this.edition);
    console.log(this.filteredProducts);
    await this.productsStore.fetchProducts();
    this.filteredProducts = this.products;
  },
};
</script>