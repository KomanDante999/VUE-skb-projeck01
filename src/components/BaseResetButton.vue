<template>
  <div v-if="trigger">
    <button type="button" @click.prevent="callback">
      {{ message }}
    </button>
  </div>
</template>

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
      default: 'Попробуйте еще раз'
    }
  },
  methods: {
    callback(){
      this.$emit('callback')
    }
  }  
}
</script>
