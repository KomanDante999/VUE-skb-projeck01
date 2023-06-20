<template>
  <div>
    <HeaderVue/>
    <router-view />
    <FooterVue/>

  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import HeaderVue from '@/components/Header.vue';
import FooterVue from '@/components/Footer.vue';

export default {
  components: {HeaderVue, FooterVue},
  methods: {
    ...mapMutations(['loadCart'])
  },
  created(){
    this.loadCart()
  }
};
</script>
