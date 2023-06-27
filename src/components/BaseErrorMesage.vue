<template>
  <div v-if="trigger">
    <h3>Ошибка загрузки данных!</h3>
    <button type="button" @click.prevent="loadProducts">
      Попробуйте еще раз!
    </button>
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
