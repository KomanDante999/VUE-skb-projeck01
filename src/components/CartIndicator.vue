<template>
  <div class="p-rel">
    <BasePrelosderVue class="header-preload" :trigger="$store.state.cartLoading" :src="src" />
    <router-link
      class="header__cart"
      :to="{ name: 'cart' }"
      aria-label="Корзина с товарами"
      v-show="!$store.state.cartLoading"
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

<style>
.p-rel {
  position: relative;
}
.header-preload {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>

<script>
import { mapGetters } from "vuex";
import { PRELOAD_GEARS } from "@/config";
import BasePrelosderVue from "@/components/BasePrelosder.vue";
export default {
  components: {
    BasePrelosderVue,
  },
  data() {
    return {
      src: PRELOAD_GEARS,
    };
  },
  computed: {
    ...mapGetters({ totalProductItems: "cartTotalProductItems" }),
  },
};
</script>