<template>
  <li>
    <p>{{fullName}}</p>
    <p>{{rateDisplay}}</p>
    <div class="actions">
      <base-button mode="outline" link :to="coachContactLink">Kontakt</base-button>
      <base-button link :to="coachDetailsLink">Szczegóły</base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['firstName', 'lastName', 'rate', 'id'],
  computed: {
    coachContactLink() {
      return this.$route.path + '/' + this.id + '/contact'; // /coaches/c1/contact
    },
    coachDetailsLink() {
      return this.$route.path + '/' + this.id; // /coaches/c1
    },
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    rateDisplay() {
      return this.rate + 'zł/h';
    }
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid white;
  border-radius: 12px;
  padding: 1rem;
  color: white;
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