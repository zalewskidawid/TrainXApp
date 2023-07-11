<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
.card {
  display: block;
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
  position: relative;
  z-index: 1;
  &:before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50px;
    padding: 2px;
    background:linear-gradient(45deg,$primary-color,$primary-color-dark);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: -1;
  }
}
</style>