<template>
  <span class="content__info">
    {{
      totalProduct +
      " " +
      pluralRules(totalProduct, ["товар", "товара", "товаров"])
    }}
  </span>
</template>

<script>
import pluralRules from "@/helpers/pluralRules";

export default {
  props: ['totalProduct'],
  methods: {
    pluralRules
  }
};
</script>