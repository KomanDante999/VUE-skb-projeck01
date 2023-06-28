<template>
  <div>
    
    <router-link
      class="header__cart"
      :to="{ name: 'cart' }"
      aria-label="Корзина с товарами"
    >
      <svg width="30" height="21" fill="currentColor">
        <use xlink:href="#icon-cart"></use>
      </svg>
      <span class="header__count" aria-label="Количество товаров">
        {{ totalProductItems }}
      </span>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseSnipperVue from "@/components/BaseSnipper.vue";
export default {
  components: {
    BaseSnipperVue,
  },
  computed: {
    ...mapGetters({ totalProductItems: "cartTotalProductItems" }),
  },
};
</script>