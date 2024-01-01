<template>
  <li>
    <div>
      <span>Od: </span><a :href="emailLink">{{ email }}</a>
    </div>
    <p>{{ request }}</p>
    <base-button mode="flat" link :to="conversationLink">Wyświetl</base-button>
  </li>
</template>

<script>
import BaseButton from "@/components/ui/BaseButton";
export default {
  components: {BaseButton},
  props: ['email', 'request', 'id'],
  computed: {
    emailLink() {
      return 'mailto:' + this.email;
    },
    conversationLink() {
      return this.$route.path + '/' + this.id;
    },
  }
}
</script>

<style scoped lang="scss">
@import './src/assets/variables';
@import './src/assets/formFields';

li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  border: 0;
  padding: 0;
}
a.flat {
  border: 1px solid $primary-color;
  padding: 0.75rem 1.5rem;
  margin-top: 16px;
  &:hover {
    background: $primary-color-darker;
    border-color: $primary-color-darker;
  }
}
a:hover,
a:active {
  background-color: transparent;
}

p {
  margin: 0.5rem 0 0 0;
}
</style>