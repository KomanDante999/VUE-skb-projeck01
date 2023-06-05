<template>
  <section class="catalog">

    <ProductList :products="products"/>
    <BasePagination v-model="page" :count="productsCountTotal" :per-page="productsPerPage"></BasePagination>
  </section>
</template>

<script>
import products from './data/products';
import ProductList from './components/ProductList.vue';
import BasePagination from './components/BasePagination.vue';

export default {
  name: 'App',
  components: { ProductList, BasePagination },
  data() {
    return {
      page: 1,
      productsPerPage: 3,  
      // products    
    };
  },
  computed: {
    products(){
      const offset = (this.page - 1) * this.productsPerPage;
      return products.slice(offset, offset + this.productsPerPage)
    },
    productsCountTotal(){
      return products.length
    }
  }
};
</script>
