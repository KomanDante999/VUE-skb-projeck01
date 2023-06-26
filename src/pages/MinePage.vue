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

        <BaseSnipperVue :trigger="productsLoading" />

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
import axios from "axios";
import { API_BASE_URL, TIMEOUT } from "@/config";
import ProductList from "@/components/ProductList.vue";
import BasePagination from "@/components/BasePagination.vue";
import ProductFilter from "@/components/ProductFilter.vue";
import BaseSnipperVue from '@/components/BaseSnipper.vue';

export default {
  components: { ProductList, BasePagination, ProductFilter, BaseSnipperVue },
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
    products() {
      return this.productsData ? this.productsData.items : []
    },
    productsCountTotal() {
      return this.productsData ? this.productsData.pagination.total : 0;
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
    // this.loadProducts();
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