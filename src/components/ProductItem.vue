<template>
  <li class="catalog__item">
    <router-link
      class="catalog__pic"
      :to="{ name: 'product', params: { id: product.id } }"
    >
      <img :src="product.image.file.url" :alt="product.title" />
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price"> {{ numberFormat(product.price) }} ₽ </span>

    <BaseColorSelectorVue
      :colors="product.colors"
      :selectedColorId.sync="selectedColorId"
    />
  </li>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";
import BaseColorSelectorVue from "@/components/BaseColorSelector.vue";

export default {
  name: "ProductItem",
  props: ["product"],
  components: { BaseColorSelectorVue },
  data() {
    return {
      selectedColorId: this.product.colors[0].id,
    };
  },
  methods: {
    numberFormat,
  },
};
</script>