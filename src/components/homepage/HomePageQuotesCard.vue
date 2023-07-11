<template>
  <div class="homepage-quotes-card-container">
    <font-awesome-icon icon="fa-solid fa-quote-right"></font-awesome-icon>
    <p class="homepage-quotes-card-container__title"><slot name="title"></slot></p>
    <p class="homepage-quotes-card-container__author"><slot></slot></p>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
export default {
  components: {FontAwesomeIcon}
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.homepage-quotes-card-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 16px;
  background: $primary-color-dark;
  border-radius: 15px;
  max-width: 350px;
  margin: 16px;
  @media(max-width: 768px) {
    margin: 16px 0;
  }
  svg {
    color: white;
    font-size: 32px;
  }
  &__title {
    color: white;
    font-size: 24px;
  }
  &__author {
    color: white;
    margin-top: 0;
    font-weight: bold;
  }
}
</style>