<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <li v-for="item in products" :key="item.productId" class="cart__order">
        <h3>{{ item.product.title }}</h3>
        <b> {{ numberFormat(item.product.price) }} ₽</b>
        <span>Артикул: {{ item.productId }}</span>
      </li>
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>500 ₽</b></p>
      <p>
        Итого: <b> {{ totalProductItems }} </b>
        {{ pluralRules(totalProductItems, ["позиция", "позиции", "позиций"]) }} на сумму
        <b>{{ numberFormat(totalPrice) }} ₽</b>
      </p>
    </div>

    <button class="cart__button button button--primery" type="submit">
      Оформить заказ
    </button>
  </div>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";
import pluralRules from "@/helpers/pluralRules";

export default {
  props: ["products", "totalPrice", "totalProductItems"],
  methods: {
    numberFormat,
    pluralRules,
  },
};
</script>