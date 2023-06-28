<template>
  <div v-if="trigger">
    <img
      class="snipper-image"
      src="img/gif/snipper-5.gif"
      alt="сниппер загрузки"
    />
  </div>
</template>

<style>
.snipper-image {
  width: 100%;
  height: 100%;
}
</style>

<script>
export default {
  props: {
    trigger: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
