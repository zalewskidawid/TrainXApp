<template>
    <section class="user-profile-wrapper">
      <h2>Mój profil</h2>
      <div class="user-profile-container">
        <p>E-mail: {{email}}</p>
        <p>Imię: <span>{{ firstname }}</span></p>
        <p>Nazwisko: <span>{{ lastname }}</span></p>
        <p>Opis: <span>{{ description }}</span></p>
        <p v-if="userType === 'trainer'">Stawka: <span>{{ rate }} zł/h</span></p>
      </div>
    </section>
</template>


<script>

export default {
props: ['email', 'firstname', 'lastname', 'description', 'rate', 'userType'],
  data() {
  return {

  }
  },

};
</script>

<style lang="scss" scoped>


</style>