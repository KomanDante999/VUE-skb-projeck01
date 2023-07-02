<template>
  <ul class="breadcrumbs">
    <li v-for="(page, index) in breadcrumbs" :key="index" class="breadcrumbs__item">

      <router-link class="breadcrumbs__link" :class="{'cursor-none': page.cursorNone}" :to="{ name: page.routerName}">
        {{ page.titlePage }}
      </router-link>
    </li>
  </ul>
</template>

<style>
  .cursor-none {
    pointer-events: none;
  }
</style>

<script>
export default {
  props: ['breadcrumbs']
}
</script>