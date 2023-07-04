<template>
  <main class="content container">
    <div class="order-preloader">
      <BasePrelosderVue
        class="order-preloader__img"
        :trigger="orderLoading"
      />
    </div>

    <div v-if="orderInfo">
      <div class="content__top">
        <BaseBreadcrumbsVue :breadcrumbs="breadcrumbs" />
        <h1 class="content__title">
          Заказ оформлен <span>№ {{ orderInfo.id }}</span>
        </h1>
      </div>

      <section class="cart">
        <form class="cart__form form" action="#" method="POST">
          <div class="cart__field">
            <p class="cart__message">
              Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту
              придет письмо с&nbsp;деталями заказа. Наши менеджеры свяжутся
              с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
            </p>

            <ul class="dictionary">
              <li class="dictionary__item">
                <span class="dictionary__key"> Получатель </span>
                <span class="dictionary__value">
                  {{ orderInfo.name }}
                </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key"> Адрес доставки </span>
                <span class="dictionary__value">
                  {{ orderInfo.address }}
                </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key"> Телефон </span>
                <span class="dictionary__value"> {{ orderInfo.phone }} </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key"> Email </span>
                <span class="dictionary__value"> {{ orderInfo.email }} </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key"> Способ оплаты </span>
                <span class="dictionary__value"> картой при получении </span>
              </li>
            </ul>
          </div>

          <OrderProductsInfoVue
            :products="orderInfo.basket.items"
            :totalPrice="orderInfo.totalPrice"
            :totalProductItems="orderInfo.basket.items.length"
          />
        </form>
      </section>
    </div>
  </main>
</template>

<style>
.order-preloader {
  display: flex;
  justify-content: center;
}
.order-preloader__img {
  width: 250px;
}
</style>


<script>
import OrderProductsInfoVue from "@/components/OrderProductsInfo.vue";
import BaseBreadcrumbsVue from "@/components/BaseBreadcrumbs.vue";
import BasePrelosderVue from "@/components/BasePrelosder.vue";
import { TIMEOUT } from "@/config";
import 'core-js/stable/promise';

export default {
  components: {
    BaseBreadcrumbsVue,
    OrderProductsInfoVue,
    BasePrelosderVue,
  },
  data() {
    return {
      orderInfo: this.$store.state.orderInfo,
      orderLoading: false
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
          titlePage: "Корзина",
          routerName: "cart",
        },
        {
          titlePage: "Оформление заказа",
          routerName: "",
          cursorNone: true,
        },
      ];
    },
  },

  created() {
    if (
      this.$store.state.orderInfo &&
      this.$store.state.orderInfo.id === this.$route.params.id
    ) return;

    this.orderLoading = true
    return (new Promise(resolve => setTimeout(() => {
      this.$store.dispatch("loadOrderInfo", this.$route.params.id);
      this.orderLoading = false;
      resolve()
    }, TIMEOUT)))
  },
};

</script>