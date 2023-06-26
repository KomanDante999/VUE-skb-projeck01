<template>
  <div v-if="trigger" class="snipper">
    <img
      class="snipper__image"
      src="img/gif/snipper-5.gif"
      alt="сниппер загрузки"
    />
  </div>
</template>

<style>
.snipper {
  position: absolute;
  top: 50%;
  left: 50%;
}
.snipper__image {
  width: 250px;
  height: 250px;
}
</style>

<script>
export default {
  props: ['trigger']
}
</script>
