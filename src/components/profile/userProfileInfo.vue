<template>
  <section class="user-profile-wrapper">
    <base-dialog :show="!!error" title="Coś poszło nie tak!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <h2>Mój profil</h2>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <div v-else class="user-profile-container">
      <template v-if="!isEditMode">
        <p>E-mail: {{ email }}</p>
        <p>Imię: <span>{{ firstname }}</span></p>
        <p>Nazwisko: <span>{{ lastname }}</span></p>
        <p>Opis: <span>{{ description }}</span></p>
        <p v-if="userType === 'trainer'">Stawka: <span>{{ rate }} zł/h</span></p>
      </template>
      <template v-else>
        <p>E-mail: {{ email }}</p>
        <p>Imię: <input v-model="editedFirstname" /></p>
        <p>Nazwisko: <input v-model="editedLastname" /></p>
        <p>Opis: <input v-model="editedDescription" /></p>
        <p v-if="userType === 'trainer'">Stawka: <input v-model="editedRate" /> zł/h</p>
      </template>
      <div v-if="!isEditMode">
        <button @click="toggleEditMode">Edytuj</button>
      </div>
      <div v-else>
        <button @click="confirmEdit">Zatwierdź</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['email', 'firstname', 'lastname', 'description', 'rate', 'userType'],
  data() {
    return {
      error:null,
      isLoading: false,
      isEditMode: false,
      editedFirstname: '',
      editedLastname: '',
      editedDescription: '',
      editedRate: '',
      editedEmail: ''
    };
  },
  methods: {
    handleError() {
      this.error = null
      this.$router.replace('/coaches');
    },
    toggleEditMode() {
      this.isEditMode = !this.isEditMode;
      if (this.isEditMode) {
        this.editedFirstname = this.firstname;
        this.editedLastname = this.lastname;
        this.editedDescription = this.description;
        this.editedRate = this.rate;
        this.editedEmail = this.email;
      }
    },
    async confirmEdit() {
      try {
        this.isLoading = true
        await this.$store.dispatch('profile/updateUserInfo', {
          firstname: this.editedFirstname,
          lastname: this.editedLastname,
          description: this.editedDescription,
          rate: this.editedRate,
          email: this.editedEmail,
        });
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.error = error.message || 'Coś poszło nie tak!';
      }
      this.isEditMode = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import './src/assets/variables';
@import './src/assets/formFields';

input,
textarea {
  display: inline;
  border: 1px solid #ccc;
  width: auto;
  font: inherit;
  background: transparent;
  border: 2px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to left, $primary-color, $primary-color-darker);
  color: white;
  &::placeholder {
    color: white;
  }

}
button {
  background: transparent;
}
a:hover, a:active, button:hover, button:active {
  background-color: $primary-color-darker;
  border-color: $primary-color-darker;
}
</style>