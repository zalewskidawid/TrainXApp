<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="message">Wiadomość</label>
      <textarea rows="5" id="message" v-model.trim="message"></textarea>
    </div>
    <p class="errors" v-if="!formIsValid">Wprowadź prawidłowy adres email i wprowadź wiadomośc.</p>
    <div class="actions">
      <base-button mode="flat">Wyślij wiadomość</base-button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    coachEmail: {
      type: String,
      required: true,
    },
    coachFirstName: {
      type: String,
      required: true
    },
    coachLastName: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      message: '',
      formIsValid: true,
    };
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      if (
        this.message === ''
      ) {
        this.formIsValid = false;
        return;
      }
      this.$store.dispatch('requests/contactCoach', {
        email: this.$store.getters.userEmail,
        message: this.message,
        coachId: this.$route.params.id,
        coachEmail: this.coachEmail,
        coachData: this.coachFirstName + ' ' + this.coachLastName,
        userData: this.$store.getters.userData
      });
      this.$router.replace('/requests');
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/assets/variables";
form {
  margin: 0;
  padding: 0;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
  background: transparent;
  border: 2px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to left, $primary-color, $primary-color-darker);
  color: white;
}

input:focus,
textarea:focus {
  background-color: $primary-color-darker;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>