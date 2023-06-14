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
        <ProductList
          :products="products"
          
        />
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
import products from "@/data/products";
import ProductList from "@/components/ProductList.vue";
import BasePagination from "@/components/BasePagination.vue";
import ProductFilter from "@/components/ProductFilter.vue";

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
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;
      if (this.filterPriseFrom > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.prise > this.filterPriseFrom
        );
      }
      if (this.filterPriseTo > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.prise < this.filterPriseTo
        );
      }
      if (this.filterCategoryId) {
        filteredProducts = filteredProducts.filter(
          (product) => product.categoryId === this.filterCategoryId
        );
      }
      if (this.filterColorId) {
        filteredProducts = filteredProducts.filter((product) =>
          product.params.colorId.includes(this.filterColorId)
        );
      }

      return filteredProducts;
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    productsCountTotal() {
      return this.filteredProducts.length;
    },
  },
};
</script>