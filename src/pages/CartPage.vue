<template>
  <div>
    <div class="catalog__error-block">
      <BaseSnipperVue :trigger="cartLoading" />
      <BaseErrorMesageVue :trigger="cartLoadingFailed" />
      <BaseResetButtonVue
        :trigger="cartLoadingFailed"
        @callback="loadingCart"
      />
    </div>

    <main v-if="!cartLoadingFailed && !cartLoading" class="content container">
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link"> Корзина </a>
          </li>
        </ul>

        <h1 class="content__title">Корзина</h1>
        <span class="content__info">
          {{
            totalProductItems +
            " " +
            pluralRules(totalProductItems, ["товар", "товара", "товаров"])
          }}
        </span>
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
              :to="{name: 'order'}"
              type="submit"
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
import { mapGetters, mapActions } from "vuex";
import CartItemVue from "@/components/CartItem.vue";
import numberFormat from "@/helpers/numberFormat";
import pluralRules from "@/helpers/pluralRules";
import BaseSnipperVue from "@/components/BaseSnipper.vue";
import BaseErrorMesageVue from "@/components/BaseErrorMesage.vue";
import BaseResetButtonVue from "@/components/BaseResetButton.vue";

export default {
  components: {
    CartItemVue,
    BaseSnipperVue,
    BaseErrorMesageVue,
    BaseResetButtonVue,
  },
  data() {
    return {
      cartLoading: false,
      cartLoadingFailed: false,
    };
  },
  computed: {
    ...mapGetters({
      products: "cartDetaiProducts",
      totalPrice: "cartTotalPrise",
      totalProductItems: "cartTotalProductItems",
    }),
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
    pluralRules,
  },

  created() {
    this.loadingCart();
  },
};
</script>