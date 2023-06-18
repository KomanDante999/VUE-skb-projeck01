<template>
  <div class="product__counter form__counter">
    <button
      type="button"
      aria-label="Убрать один товар"
      @click.prevent="decreaseProduct"
    >
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="productAmount" name="count" min="1" />

    <button
      type="button"
      aria-label="Добавить один товар"
      @click.prevent="increaseProduct"
    >
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: [productAmount],
  methods: {
    decreaseProduct() {
      if (this.productAmount > 1) {
        this.$emit("update-product", this.productAmount - 1);
      }
    },
    increaseProduct() {
      this.$emit("update-product", this.productAmount + 1);
    },
  },
};
</script>