<template>
    <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}" > Каталог </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ getPluralRules(10) }} 
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItemVue v-for="item in products" :item="item" :key="item.productId"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span> {{ numberFormat(totalPrice) }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>

</template>

<script>
import { mapGetters } from 'vuex';
import CartItemVue from '@/components/CartItem.vue'
import numberFormat from '@/helpers/numberFormat';
// import pluralRules from '@/helpers/pluralRules';


export default {
  components: {CartItemVue},
  computed: {
    ...mapGetters({products: 'cartDetaiProducts', totalPrice: 'cartTotalPrise', NumberProductItems: 'cartNumberProductItems'}),
    
  },
  methods: {
    numberFormat,
    getPluralRules(count) {
    const forms = ['товар', 'товара', 'товаров'];
    const pr = new Intl.PluralRules('ru', { type: 'cardinal' }); 
    const formIndex = pr.select(count); 
    return '{0} {1}'.format(count, forms[formIndex]);}
  }
}
</script>