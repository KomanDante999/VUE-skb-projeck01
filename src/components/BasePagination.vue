<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': page === 1 }"
        href="#"
        aria-label="Предыдущая страница"
        @click.prevent="pagunate(page - 1)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li
      class="pagination__item"
      v-for="pageNumber in pagesTotalNum"
      :key="pageNumber"
    >
      <a
        href="#"
        class="pagination__link"
        :class="{ 'pagination__link--current': pageNumber === page }"
        @click.prevent="pagunate(pageNumber)"
      >
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': page === pagesTotalNum }"
        href="#"
        aria-label="Следующая страница"
        @click.prevent="pagunate(page + 1)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: "page",
    event: "pagunate",
  },
  props: ["page", "count", "perPage"],
  computed: {
    pagesTotalNum() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    pagunate(page) {
      if (page < 1) {
        page = 1;
        return;
      }
      if (page > this.pagesTotalNum) {
        page = this.pagesTotalNum;
        return;
      }
      this.$emit("pagunate", page);
    },
  },
};
</script>