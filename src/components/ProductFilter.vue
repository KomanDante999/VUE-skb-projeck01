<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form
      class="filter__form form"
      action="#"
      method="get"
      @submit.prevent="submit"
    >
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="min-price"
            v-model.number="currentPriseFrom"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="max-price"
            v-model.number="currentPriseTo"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            type="text"
            name="category"
            v-model.number="currentCategoryId"
          >
            <option value="0">Все категории</option>
            <option
              :value="category.id"
              v-for="category in catigories"
              :key="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="color in colors" :key="color.id" :aria-label="color.title">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color"
                :value="color.id"
                v-model.number="currentColorId"
              />
              <span class="colors__value" :style="{ backgroundColor: color.code }">
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Объемб в ГБ</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="8"
                checked=""
              />
              <span class="check-list__desc">
                8
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="16"
              />
              <span class="check-list__desc">
                16
                <span>(461)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="32"
              />
              <span class="check-list__desc">
                32
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="64"
              />
              <span class="check-list__desc">
                64
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="128"
              />
              <span class="check-list__desc">
                128
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="264"
              />
              <span class="check-list__desc">
                264
                <span>(313)</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button
        class="filter__reset button button--second"
        type="button"
        @click.prevent="reset"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
// import catigories from "@/data/catigories";
// import colors from "@/data/colors";
import axios from 'axios';
import {API_BASE_URL} from '@/config';

export default {
  data() {
    return {
      currentPriseFrom: 0,
      currentPriseTo: 0,
      currentCategoryId: 0,
      currentColorId: 0,

      catigoriesData: null,
      colorsData: null,
    };
  },
  props: ["priseFrom", "priseTo", "categoryId", 'colorId'],
  computed: {
    catigories() {
      return this.catigoriesData ? this.catigoriesData.items : []
      // return catigories;
    },
    colors() {
      return this.colorsData ? this.colorsData.items : []
      // return colors;
    },
  },
  watch: {
    priseFrom(value) {
      this.currentPriseFrom = value;
    },
    priseTo(value) {
      this.currentPriseTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    colorId(value) {
      this.currentColorId = value;
    },
  },
  methods: {
    submit() {
      this.$emit("update:priseFrom", this.currentPriseFrom);
      this.$emit("update:priseTo", this.currentPriseTo);
      this.$emit("update:categoryId", this.currentCategoryId);
      this.$emit("update:colorId", this.currentColorId);
    },
    reset() {
      this.$emit("update:priseFrom", 0);
      this.$emit("update:priseTo", 0);
      this.$emit("update:categoryId", 0);
      this.$emit("update:colorId", 0);
    },
    loadCatigories(){
      axios.get(API_BASE_URL + '/api/productCategories')
        .then(response => this.catigoriesData = response.data)
    },
    loadColors(){
      axios.get(API_BASE_URL + '/api/colors')
        .then(response => this.colorsData = response.data)
    },
  },
  created(){
    this.loadCatigories();
    this.loadColors();
  }
};
</script>