import Vue from 'vue';
import Vuex from 'vuex';
import product from '@/data/products';
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
    // addProductToCard(state, payload){
    //   state.cartProducts.push({
    //     productId: payload.productId,
    //     amount: payload.amount
    //   })
    // },
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
      return getters.cartDetaiProducts.reduce((acc, item) => (item.product.prise * item.amount) + acc, 1)
    }
  }
});

