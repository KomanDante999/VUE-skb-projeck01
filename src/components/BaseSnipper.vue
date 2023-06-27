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
  width: 250px;
  height: 250px;
  padding: 30px;
}
</style>

<script>
export default {
  props: ['trigger']
}
</script>
