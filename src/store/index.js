import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import { API_BASE_URL } from "@/config";
// import products from '@/data/products';


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
    },
    syncCartProducts(state){
      state.cartProducts = state.cartProductsData.map(item => {
        return {
          productId: item.product.id,
          amount: item.quantity
        }
      })
    }
  },
  getters: {
    cartDetaiProducts(state){
      return state.cartProducts.map(item => {
        const product = state.cartProductsData.find(
          p => p.product.id === item.productId
        ).product

        return {
          ...item,
          product
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
        .get(API_BASE_URL + '/api/baskets', {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        .then(response => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey)
            context.commit('updateUserAccessKey', response.data.user.accessKey)
          }
          context.commit('updateCartProductsData', response.data.items)
          context.commit('syncCartProducts')
        })

      }
  }
});

