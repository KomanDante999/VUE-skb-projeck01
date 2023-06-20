<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="item.product.img"
        width="120"
        height="120"
        alt="item.product.title"
      />
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code"> Артикул: {{ item.product.id }} </span>

    <BaseCounterVue :count.sync="amount" :minValue="1"/>

    <b class="product__price">
      {{ numberFormat(item.amount * item.product.prise) }} ₽
    </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct(item.productId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapMutations } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import BaseCounterVue from "@/components/BaseCounter.vue";


export default {
  // filters: {numberFormat},
  props: ['item'],
  components: {BaseCounterVue},
  computed: {
    amount: {
      get(){
        return this.item.amount;
      },
      set(value){
        this.$store.commit('updateCartProductAmount', {productId: this.item.productId, amount: value})
      }
    }
  },
  methods: {
    ...mapMutations({deleteProduct: 'deleteCartProduct'}),
    numberFormat

    // addProductAmount(productId){
    //   this.$store.commit('addCartProductAmount', productId)
    // },
    // deleteProduct(productId){
    //   this.$store.commit('deleteCartProduct', productId)
    // }
  }
}
</script>
