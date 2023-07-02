<template>
  <div>
    <div class="catalog__error-block">
      <BasePrelosderVue :trigger="cartLoading" />
      <BaseErrorMesageVue :trigger="cartLoadingFailed" />
      <BaseResetButtonVue
        :trigger="cartLoadingFailed"
        @callback="loadingCart"
      />
    </div>

    <main v-if="!cartLoadingFailed && !cartLoading" class="content container">
      <div class="content__top">
        <BaseBreadcrumbsVue :breadcrumbs="breadcrumbs" />
        <h1 class="content__title">Корзина</h1>
        <ProductTotalVue :totalProduct="totalProductItems"/>
      </div>

      <section class="cart">
        <form class="cart__form form" action="#" method="POST">
          <div class="cart__field" style="position: relative">
            <ul class="cart__list">
              <CartItemVue
                v-for="item in products"
                :item="item"
                :key="item.productId"
              />
            </ul>
          </div>

          <div class="cart__block">
            <p class="cart__desc">
              Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
            </p>
            <p class="cart__price">
              Итого: <span> {{ numberFormat(totalPrice) }} ₽</span>
            </p>
            <router-link
              tag="button"
              class="cart__button button button--primery"
              :to="{ name: 'order' }"
              type="submit"
              v-show="totalProductItems"
            >
              Оформить заказ
            </router-link>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>

<style>
.catalog__error-block {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>


<script>
import { mapActions } from "vuex";
import CartItemVue from "@/components/CartItem.vue";
import numberFormat from "@/helpers/numberFormat";
import BasePrelosderVue from "@/components/BasePrelosder.vue";
import BaseErrorMesageVue from "@/components/BaseErrorMesage.vue";
import BaseResetButtonVue from "@/components/BaseResetButton.vue";
import productsInfoMixin from "@/mixins/productsInfoMixin";
import BaseBreadcrumbsVue from "@/components/BaseBreadcrumbs.vue";
import ProductTotalVue from '@/components/ProductTotal.vue';

export default {
  components: {
    CartItemVue,
    BasePrelosderVue,
    BaseErrorMesageVue,
    BaseResetButtonVue,
    BaseBreadcrumbsVue,
    ProductTotalVue,
  },
  data() {
    return {
      cartLoading: false,
      cartLoadingFailed: false,
    };
  },
  computed: {
    breadcrumbs() {
      return [
        {
          titlePage: "Каталог",
          routerName: "main",
        },
        {
          titlePage: 'Корзина',
          routerName: "",
          cursorNone: true,
        },
      ];
    },
  },
  methods: {
    ...mapActions(["loadCart"]),
    loadingCart() {
      this.cartLoading = true;
      this.cartLoadingFailed = false;
      this.loadCart()
        .then(() => (this.cartLoading = false))
        .catch(() => (this.cartLoadingFailed = true))
        .then(() => (this.cartLoading = false));
    },
    numberFormat,
  },
  mixins: [productsInfoMixin],

  created() {
    this.loadingCart();
  },
};
</script>