<template>
  <div class="product__counter form__counter">
    <button
      type="button"
      aria-label="Убрать один товар"
      @click.prevent="decreaseCount"
    >
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="internalValue" name="count" min="1" />

    <button
      type="button"
      aria-label="Добавить один товар"
      @click.prevent="increaseCount"
    >
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ['count'],
  computed: {
    internalValue: {
      get(){
        return this.count
      },
      set(newValue){
        this.$emit('input', newValue)
      }
    }
  },
  methods: {

    decreaseCount() {
      if (this.count > 1) {
        this.$emit("update-count", this.count - 1);
      }
    },
    increaseCount() {
      this.$emit("update-count", this.count + 1);
    },
  },
};
</script>