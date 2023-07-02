import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      products: "cartDetaiProducts",
      totalPrice: "cartTotalPrise",
      totalProductItems: "cartTotalProductItems",
    })
  },
}