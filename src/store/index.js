import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: []
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
  }
});

