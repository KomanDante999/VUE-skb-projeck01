<template>
  <div>
    <HeaderVue/>
    <router-view />
    <FooterVue/>

  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import HeaderVue from '@/components/Header.vue';
import FooterVue from '@/components/Footer.vue';

export default {
  components: {HeaderVue, FooterVue},
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserAccessKey'])
  },
  created(){
    const userAccessKey = localStorage.getItem('userAccessKey')
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey)
    }

    this.loadCart()
  }
};
</script>
