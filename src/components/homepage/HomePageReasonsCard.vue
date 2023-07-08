<template>
  <div class="homepage-reasons-card">
    <p class="homepage-reasons-card__title"><slot name="title"></slot></p>
    <p class="homepage-reasons-card__subtitle"><slot></slot></p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
.homepage-reasons-card {
  padding: 8px 8px 8px 0;
  position: relative;
  max-width: 400px;
  margin: 32px;
  &__title {
    color: white;
    font-size: 24px;
  }
  &__subtitle {
    color: $gray-color;
    font-size: 12px;
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: rgb(23,84,119);
    background: linear-gradient(90deg, rgba(23,84,119,1) 0%, rgba(32,118,166,1) 100%);
  }
}
</style>