<template>
  <div v-if="trigger">
    <button class="btn-reset" type="button" @click.prevent="callback">
      {{ message }}
    </button>
  </div>
</template>

<style>
.btn-reset {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 10px;
  padding-left: 10px;
  background-color: #9eff00;
  border: 1px solid #9eff00;
  font-family: "PressStart";
  color: #222;
  font-size: 13px;
  cursor: pointer;
  transition-duration: 0.4s;
  transition-property: background-color;
}
.btn-reset:hover {
  background-color: aliceblue;
}
</style>

<script>
export default {
  props: {
    trigger: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: false,
      default: "Попробуйте еще раз",
    },
  },
  methods: {
    callback() {
      this.$emit("callback");
    },
  },
};
</script>
