<template>
  <ul class="colors colors--black">
    <li class="colors__item" v-for="color in colors" :key="color.id">
      <label class="colors__label">
        <input
          class="colors__radio sr-only"
          type="radio"
          :value="color.id"
          v-model="currentColorId"
        />
        <span class="colors__value" :style="{backgroundColor: color.code}"> </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['colors', 'selectedColorId'],
  computed: {
    currentColorId: {
      get(){
        return this.selectedColorId
      },
      set(colorId){
        this.$emit('update:selectedColorId', colorId)
      }
    }
  }
};
</script>