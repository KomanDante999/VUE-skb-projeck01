<template>
  <div v-if="trigger" class="message">
    <h3 class="message__title"> {{ message }} </h3>
  </div>
</template>

<style>
.message {
  padding: 20px;
}
.message__title {
  color: red;
}
</style>

<script>
export default {
  props: {
    trigger: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      required: false,
      default: 'Ошибка загрузки данных!'
    }
  }
}
</script>
