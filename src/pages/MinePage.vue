<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> 152 товара </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        :prise-from.sync="filterPriseFrom"
        :prise-to.sync="filterPriseTo"
        :category-id.sync="filterCategoryId"
        :color-id.sync="filterColorId"
      />
      <section class="catalog">
        <div v-if="productsLoading">Загрузка товаров.....</div>
        <div v-if="productsLoadingFailed">
          <h3>Ошибка загрузки данных!</h3>
          <button
            type="button"
            @click.prevent="loadProducts"
          >
            Попробуйте еще раз!
          </button>
        </div>
        <ProductList :products="products" />
        <BasePagination
          v-model="page"
          :count="productsCountTotal"
          :per-page="productsPerPage"
        />
      </section>
    </div>
  </main>
</template>

<script>
// import products from "@/data/products";
import ProductList from "@/components/ProductList.vue";
import BasePagination from "@/components/BasePagination.vue";
import ProductFilter from "@/components/ProductFilter.vue";
import axios from "axios";
import { API_BASE_URL, TIMEOUT } from "@/config";

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      page: 1,
      productsPerPage: 3,
      filterPriseFrom: 0,
      filterPriseTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,

      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    // filteredProducts() {
    //   let filteredProducts = products;
    //   if (this.filterPriseFrom > 0) {
    //     filteredProducts = filteredProducts.filter(
    //       (product) => product.prise > this.filterPriseFrom
    //     );
    //   }
    //   if (this.filterPriseTo > 0) {
    //     filteredProducts = filteredProducts.filter(
    //       (product) => product.prise < this.filterPriseTo
    //     );
    //   }
    //   if (this.filterCategoryId) {
    //     filteredProducts = filteredProducts.filter(
    //       (product) => product.categoryId === this.filterCategoryId
    //     );
    //   }
    //   if (this.filterColorId) {
    //     filteredProducts = filteredProducts.filter((product) =>
    //       product.params.colorId.includes(this.filterColorId)
    //     );
    //   }
    //   return filteredProducts;
    // },
    products() {
      return this.productsData ? this.productsData.items : []
        // ? this.productsData.items.map((product) => {
        //     return { ...product, image: product.image.file.url };
        //   })
        // : [];
      // const offset = (this.page - 1) * this.productsPerPage;
      // return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    productsCountTotal() {
      return this.productsData ? this.productsData.pagination.total : 0;
      // return this.filteredProducts.length;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(API_BASE_URL + `/api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              colorId: this.filterColorId,
              minPrice: this.filterPriseFrom,
              maxPrice: this.filterPriseTo,
            },
          })
          .then((response) => (this.productsData = response.data))
          .catch(() => (this.productsLoadingFailed = true))
          .then(() => (this.productsLoading = false));
      }, TIMEOUT);
    },
  },
  created() {
    this.loadProducts();
    this.loadProducts();
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    },
    filterPriseFrom() {
      this.loadProducts();
    },
    filterPriseTo() {
      this.loadProducts();
    },
  },
};
</script>