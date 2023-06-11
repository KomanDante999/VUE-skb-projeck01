<template>
  <component
    :is="currentPageComponent"
    :page-params="currentPageParams"
    
  />
</template>

<script>
import MinePage from "@/pages/MinePage.vue";
import ProductPage from "@/pages/ProductPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import eventBus from '@/eventBus';

const routes = {
  main: "MinePage",
  product: "ProductPage",
};

export default {
  components: { MinePage, ProductPage, NotFoundPage },
  data() {
    return {
      currentPage: "main",
      currentPageParams: {},
    };
  },
  methods: {
    gotoPage(pageName, pageParams) {
      this.currentPage = pageName;
      this.currentPageParams = pageParams || {};
    },
  },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || "NotFoundPage";
    },
  },
  created(){
    eventBus.$on('gotoPage', (pageName, pageParams) => this.gotoPage(pageName, pageParams))
  }
};
</script>
