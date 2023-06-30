<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info"> 3 товара </span>
    </div>

    <section class="cart">
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

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order">
              <h3>Смартфон Xiaomi Redmi Note 7 Pro 6/128GB</h3>
              <b>18 990 ₽</b>
              <span>Артикул: 150030</span>
            </li>
            <li class="cart__order">
              <h3>Гироскутер Razor Hovertrax 2.0ii</h3>
              <b>4 990 ₽</b>
              <span>Артикул: 150030</span>
            </li>
            <li class="cart__order">
              <h3>Электрический дрифт-карт Razor Lil’ Crazy</h3>
              <b>8 990 ₽</b>
              <span>Артикул: 150030</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>3</b> товара на сумму <b>37 970 ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div v-show="formErrorMessage" class="cart__error form__error-block">
          <h4> {{ formErrorMessage }} </h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или
            перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "@/config";
import 'core-js/stable/promise';
import BaseInputTextVue from "@/components/BaseInputText.vue";
import BaseInputTextaryaVue from "@/components/BaseInputTextarya.vue";

export default {
  components: {
    BaseInputTextVue,
    BaseInputTextaryaVue,
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
    };
  },
  methods: {
    order() {
      this.formError = {}
      this.formErrorMessage= ''

      axios.post(
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
      .then(response => {
        this.$store.commit('resetCart');
        this.$store.commit('updateOrderInfo', response.data);
        this.$router.push({name: 'orderInfo', params: {id: response.data.id}})
      })
      .catch(error => {
        this.formError = error.response.data.error.request || {}
        this.formErrorMessage = error.response.data.error.message

      })
    },
  },
};
</script>
