<template>
  <div v-if="trigger">
    <img
      class="snipper-image"
      :src="src"
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
import { PRELOAD_SNIPPER5 } from '@/config'

export default {
  props: {
    trigger: {
      type: Boolean,
      required: true,
    },
    src: {
      default: PRELOAD_SNIPPER5,
    }
  },
};
</script>
