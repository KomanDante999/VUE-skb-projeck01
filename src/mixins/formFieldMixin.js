import BaseFormFieldVue from '@/components/BaseFormField.vue'

export default {
  components: {
    BaseFormFieldVue
  },
  props: ['title', 'error', 'placeholder', 'value'],
  computed: {
    dataValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }

}
