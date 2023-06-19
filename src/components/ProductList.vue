<template>
  <ul class="catalog__list">
    <ProductItem
      v-for="product in products"
      :product="product"
      :key="product.id"
      
    />
  </ul>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";

export default {
  name: "ProductList",
  components: { ProductItem },
  data() {
    return {
      product: {},
    };
  },
  props: ["products"],
};
</script>
