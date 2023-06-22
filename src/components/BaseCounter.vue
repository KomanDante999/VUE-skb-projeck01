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

    <form @submit.prevent="">
      <input
        type="text"
        v-model.number="internalValue"
        name="count"
        :min="minValue"
      />
    </form>

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
  props: {
    count: {
      type: Number,
      required: true,
      validator: function (value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
      },
    },
    minValue: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  computed: {
    internalValue: {
      get() {
        return this.count;
      },
      set(newValue) {
        this.updateCount(newValue);
      },
    },
  },
  methods: {
    increaseCount() {
      this.internalValue++;
    },
    decreaseCount() {
      if (this.internalValue > this.minValue) {
        this.internalValue--;
      }
    },
    updateCount(newValue) {
      this.$emit("update:count", newValue);
    },
  },
};
</script>