import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import { API_BASE_URL } from "@/config";
import products from '@/data/products';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    
    userAccessKey: null,
    cartProductsData: [],
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
    deleteCartProduct(state, productId){
      state.cartProducts = state.cartProducts.filter(item => item.productId !== productId)
    },

    updateUserAccessKey(state, accessKey){
      state.userAccessKey = accessKey
    },
    updateCartProductsData(state, items){
      state.cartProductsData = items
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
    cartTotalProductItems(state){
      return state.cartProducts.length
    },
    cartTotalPrise(state, getters){
      return getters.cartDetaiProducts.reduce((acc, item) => (item.product.prise * item.amount) + acc, 0)
    },
  },
  actions: {
    loadCart(context){
      axios
        .get(API_BASE_URL + '/api/baskets')
        .then(response => {
          context.commit('updateUserAccessKey', {accessKey: response.data.user.accessKey})
          context.commit('updateCartProductsData', {items: response.data.items})
        })

      }
  }
});

