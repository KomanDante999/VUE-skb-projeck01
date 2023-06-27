import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import { API_BASE_URL, TIMEOUT } from "@/config";
// import { resolve } from 'core-js/es6/promise';
// import { setTimeout } from 'core-js';
import 'core-js/stable/promise';
// import products from '@/data/products';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],

    userAccessKey: null,
    cartProductsData: [],
  },
  mutations: {
    // addProductToCard(state, {productId, amount}){
    //   const item = state.cartProducts.find(item => item.productId === productId)
    //   if (item) {
    //     item.amount += amount
    //   } else {
    //     state.cartProducts.push({productId, amount})
    //   }
    // },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find(item => item.productId === productId)
      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter(item => item.productId !== productId)
    },

    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map(item => {
        return {
          productId: item.product.id,
          amount: item.quantity
        }
      })
    }
  },
  getters: {
    cartDetaiProducts(state) {
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
    cartTotalProductItems(state) {
      return state.cartProducts.length
    },
    cartTotalPrise(state, getters) {
      return getters.cartDetaiProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0)
    },
  },
  actions: {
    loadCart(context) {
      return (new Promise(resolve => setTimeout(resolve, TIMEOUT)))
        .then(() => {          
          return axios
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
        })
    },
    addProductToCard(context, { productId, amount }) {
      return (new Promise(resolve => setTimeout(resolve, TIMEOUT)))
        .then(() => {
          return axios
            .post(API_BASE_URL + '/api/baskets/products', { productId: productId, quantity: amount },
              { params: { userAccessKey: context.state.userAccessKey } })
            .then(response => {
              context.commit('updateCartProductsData', response.data.items)
              context.commit('syncCartProducts')
            })
        })
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount })

      if (amount < 1) {
        return
      }

      return axios
        .put(API_BASE_URL + '/api/baskets/products', { productId: productId, quantity: amount },
          { params: { userAccessKey: context.state.userAccessKey } })
        .then(response => {
          context.commit('updateCartProductsData', response.data.items)
        })
        .catch(() => {
          context.commit('syncCartProducts')
        })
    },
    deleteCartProduct(context, productId) {
      context.commit('deleteCartProduct', productId)

      return axios
        .delete(API_BASE_URL + '/api/baskets/products',
          {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
            data: {
              productId: productId
            }
          })
        .then(response => {
          context.commit('updateCartProductsData', response.data.items)
        })
        .catch(() => {
          context.commit('syncCartProducts')
        })
    }
  }
});

