<template>
  <main class="content container">
    <div class="content__top">
      <BaseBreadcrumbsVue :breadcrumbs="breadcrumbs" />
      <h1 class="content__title">Корзина</h1>
      <ProductTotalVue :totalProduct="totalProductItems" />
    </div>

    <section class="cart">
      <div class="cart-preloader">
        <BasePrelosderVue class="cart-preloader__img" :trigger="orderSending" />
      </div>

      <form
        class="cart__form form"
        action="#"
        method="POST"
        @submit.prevent="order"
      >
        <div class="cart__field">
          <div class="cart__data">
            <BaseInputTextVue
              title="ФИО"
              placeholder="Введите ваше полное имя"
              :error="formError.name"
              v-model="formData.name"
            />
            <BaseInputTextVue
              title="Адрес доставки"
              placeholder="Введите ваш адрес"
              :error="formError.address"
              v-model="formData.address"
            />
            <BaseInputTextVue
              title="Телефон"
              placeholder="Введите ваш телефон"
              type="tel"
              :error="formError.phone"
              v-model="formData.phone"
            />
            <BaseInputTextVue
              title="Email"
              placeholder="Введи ваш Email"
              type="email"
              :error="formError.email"
              v-model="formData.email"
            />

            <BaseInputTextaryaVue
              title="Комментарий к заказу"
              placeholder="Ваши пожелания"
              :error="formError.comment"
              v-model="formData.comment"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="0"
                    checked=""
                  />
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="500"
                  />
                  <span class="options__value"> Курьером <b>500 ₽</b> </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="card"
                  />
                  <span class="options__value"> Картой при получении </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="cash"
                  />
                  <span class="options__value"> Наличными при получении </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <OrderProductsInfoVue
          :products="products"
          :totalPrice="totalPrice"
          :totalProductItems="totalProductItems"
        />

        <div v-show="formErrorMessage" class="cart__error form__error-block">
          <h4>{{ formErrorMessage }}</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или
            перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<style>
.cart-preloader {
  display: flex;
  justify-content: center;
}
.cart-preloader__img {
  width: 250px;
}
</style>

<script>
import axios from "axios";
import { API_BASE_URL, TIMEOUT } from "@/config";
import "core-js/stable/promise";
import BaseInputTextVue from "@/components/BaseInputText.vue";
import BaseInputTextaryaVue from "@/components/BaseInputTextarya.vue";
import productsInfoMixin from "@/mixins/productsInfoMixin";
import OrderProductsInfoVue from "../components/OrderProductsInfo.vue";
import BaseBreadcrumbsVue from "@/components/BaseBreadcrumbs.vue";
import BasePrelosderVue from "@/components/BasePrelosder.vue";
import ProductTotalVue from '@/components/ProductTotal.vue';


export default {
  components: {
    BaseInputTextVue,
    BaseInputTextaryaVue,
    OrderProductsInfoVue,
    BaseBreadcrumbsVue,
    BasePrelosderVue,
    ProductTotalVue,
  },
  data() {
    return {
      formData: {
        name: 'Крайтон Майк Фриман',
        address: 'пятый рукав галлактики',
        phone: '+79131999999',
        email: 'friman@yandex.ru'
      },
      formError: {},
      formErrorMessage: "",
      orderSending: false,
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
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = "";
      this.orderSending = true;
      return new Promise((resolve) => setTimeout(resolve, TIMEOUT)).then(() => {
        return axios
          .post(
            API_BASE_URL + "/api/orders",
            {
              ...this.formData,
            },
            {
              params: {
                userAccessKey: this.$store.state.userAccessKey,
              },
            }
          )
          .then((response) => {
            this.orderSending = false;
            this.$store.commit("resetCart");
            this.$store.commit("updateOrderInfo", response.data);
            this.$router.push({
              name: "orderInfo",
              params: { id: response.data.id },
            });
          })
          .catch((error) => {
            this.orderSending = false;
            this.formError = error.response.data.error.request || {};
            this.formErrorMessage = error.response.data.error.message;
          });
      });
    },
  },
  mixins: [productsInfoMixin],
};
</script>
