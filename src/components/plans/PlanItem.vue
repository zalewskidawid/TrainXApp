<template>
  <li>
    <p>{{ planName }}</p>
    <p>{{ planDescription }}</p>
    <div class="actions">
      <base-button link :to="planDetailsLink">View Details</base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['planName', 'planDescription', 'id'],
  computed: {
    planDetailsLink() {
      return this.$route.path + '/' + this.id;
    }
  }
}
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
  list-style-type: none;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>