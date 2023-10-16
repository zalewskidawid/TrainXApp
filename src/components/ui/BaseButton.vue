<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: '/'
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/variables.scss";
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  border: 1px solid $primary-color;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: $primary-color-darker;
  border-color: $primary-color-darker;
}

.flat {
  background-color: $primary-color;
  color: white;
  border: 1px solid $primary-color;
}

.outline {
  background-color: transparent;
  color: white;
  border: 1px solid $primary-color;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active,
.outline.active,
.flat.active{
  background-color: $primary-color-darker;
  border: 1px solid $primary-color;
}
</style>