import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      {productId: 5, amount: 2},
      {productId: 7, amount: 10},
      {productId: 3, amount: 1},
    ]
  },
  mutations: {
    addProductToCard(state, {productId, amount}){
      const item = state.cartProducts.find(item => item.productId === productId)
      if (item) {
        item.amount += amount
      } else {
        state.cartProducts.push({productId, amount})
      }
    },
    updateCartProductAmount(state, {productId, amount}){
      const item = state.cartProducts.find(item => item.productId === productId)
        if (item) {
          item.amount = amount;
        }
    },
    addCartProductAmount(state, productId){
      const item = state.cartProducts.find(item => item.productId === productId)
        if (item) {
          item.amount += 1;
        }
    },
    removeCartProductAmount(state, productId){
      const item = state.cartProducts.find(item => item.productId === productId)
        if (item && item.amount > 0) {
          item.amount -= 1;
        }
    },
    deleteCartProduct(state, productId){
      state.cartProducts = state.cartProducts.filter(item => item.productId !== productId)
    }
  },
  getters: {
    cartDetaiProducts(state){
      return state.cartProducts.map(item => {
        return {
          ...item,
          product: products.find(p => p.id === item.productId)
        }
      })
    },
    cartTotalPrise(state, getters){
      return getters.cartDetaiProducts.reduce((acc, item) => (item.product.prise * item.amount) + acc, 0)
    }
  }
});

