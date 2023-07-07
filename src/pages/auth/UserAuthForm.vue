<template>
  <form @submit.prevent="submitForm">
    <div class="form-signup-wrapper" v-if="mode === 'signup'">
      <div class="form-control" :class="{invalid: !email.isValid}">
        <label for="email">E-Mail</label>
        <input type="email" id="email" v-model.trim="email.val" @blur="clearValidity('email')"/>
        <p v-if="!email.isValid">Email nie może być pusty.</p>
      </div>
      <div class="form-control" :class="{invalid: !password.isValid}">
        <label for="password">Hasło</label>
        <input type="password" id="password" v-model.trim="password.val" @blur="clearValidity('password')"/>
        <p v-if="!password.isValid">Hasło musi wynosić conajmniej 8 znaków.</p>
      </div>
      <div class="form-control" :class="{invalid: !firstName.isValid}">
        <label for="firstname">Imię</label>
        <input
            type="text"
            id="firstname"
            v-model.trim="firstName.val"
            @blur="clearValidity('firstName')"
        />
        <p v-if="!firstName.isValid">Imię nie może być puste.</p>
      </div>
      <div class="form-control" :class="{invalid: !lastName.isValid}">
        <label for="lastname">Nazwisko</label>
        <input
            type="text"
            id="lastname"
            v-model.trim="lastName.val"
            @blur="clearValidity('lastName')"
        />
        <p v-if="!lastName.isValid">Nazwisko nie może być puste.</p>
      </div>
      <div class="form-control" :class="{invalid: !description.isValid}">
        <label for="description">Opis</label>
        <textarea
            id="description"
            rows="5"
            v-model.trim="description.val"
            @blur="clearValidity('description')"
        ></textarea>
        <p v-if="!description.isValid">Opis nie może być pusty.</p>
      </div>
      <div class="form-control" :class="{invalid: !userType.isValid}" v-if="mode === 'signup'">
        <div class="radio-btn-container">
          <input name="userType" type="radio" v-model="userType.val" value="client" class="register-radio-btn"
                 @blur="clearValidity('userType')"><span>Użytkownik</span>
        </div>
        <div class="radio-btn-container">
          <input name="userType" type="radio" v-model="userType.val" value="trainer"
                 class="register-radio-btn" @blur="clearValidity('userType')"><span>Trener</span>
        </div>
        <p v-if="!userType.isValid">Musi być wybrana wartość</p>
      </div>
      <div v-if="userType.val !== '' && userType.val === 'trainer'" class="form-control" :class="{invalid: !rate.isValid}">
        <label for="rate">Hourly Rate</label>
        <input type="number" id="rate" v-model.number="rate.val" @blur="clearValidity('rate')"/>
        <p v-if="!rate.isValid">Wartość musi być większa od 0.</p>
      </div>
    </div>
    <div class="form-login-wrapper" v-else>
      <div class="form-control" :class="{invalid: !email.isValid}">
        <label for="email">E-Mail</label>
        <input type="email" id="email" v-model.trim="email.val" @blur="clearValidity('email')"/>
        <p v-if="!email.isValid">Email nie może być pusty.</p>
      </div>
      <div class="form-control" :class="{invalid: !password.isValid}">
        <label for="password">Hasło</label>
        <input type="password" id="password" v-model.trim="password.val" @blur="clearValidity('password')"/>
        <p v-if="!password.isValid">Hasło musi wynosić conajmniej 8 znaków.</p>
      </div>
    </div>
    <base-button>{{ submitButtonCaption }}</base-button>
    <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeButtonCaption }}</base-button>
  </form>
</template>

<script>
export default {
  emits: ['auth-form-data'],
  name: "VueAuthForm",
  data() {
    return {
      firstName: {
        val: '',
        isValid: true,
      },
      lastName: {
        val: '',
        isValid: true,
      },
      description: {
        val: '',
        isValid: true,
      },
      rate: {
        val: null,
        isValid: true,
      },
      userType: {
        val: '',
        isValid: true
      },
      email: {
        val: '',
        isValid: true
      },
      password: {
        val: '',
        isValid: true
      },
      mode: 'login',
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if(this.mode === 'signup') {
        if (this.firstName.val === '') {
          this.firstName.isValid = false;
          this.formIsValid = false;
        }
        if (this.lastName.val === '') {
          this.lastName.isValid = false;
          this.formIsValid = false;
        }
        if (this.description.val === '') {
          this.description.isValid = false;
          this.formIsValid = false;
        }
        if (!this.rate.val || this.rate.val < 0) {
          if(this.userType.val === 'trainer') {
            this.rate.isValid = false;
            this.formIsValid = false;
          } else {
            this.rate.isValid = true;
            this.formIsValid = true;
          }
        }
        if (this.userType.val === '') {
          this.userType.isValid = false;
          this.formIsValid = false;
        }
        if (this.email.val === '') {
          this.email.isValid = false;
          this.formIsValid = false;
        }
        if (this.password.val === '' || this.password.val.length < 8) {
          this.password.isValid = false;
          this.formIsValid = false;
        }
      } else {
        if (this.email.val === '') {
          this.email.isValid = false;
          this.formIsValid = false;
        }
        if (this.password.val === '' || this.password.val.length < 8) {
          this.password.isValid = false;
          this.formIsValid = false;
        }
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      let formData;
      if(this.mode === 'signup') {
        formData = {
          first: this.firstName.val,
          last: this.lastName.val,
          email: this.email.val,
          password: this.password.val,
          desc: this.description.val,
          rate: this.rate.val,
          userType: this.userType.val,
          mode: this.mode
        };
      } else {
        formData = {
          email: this.email.val,
          password: this.password.val,
          mode: this.mode
        }
      }
      this.$emit('auth-form-data', formData);
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Zaloguj się';
      } else {
        return 'Zarejestruj się';
      }
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Rejestracja';
      } else {
        return 'Logowanie';
      }
    },
  },
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}
.form-control {
  margin: 0.5rem 0;
}
.radio-btn-container {
  display: flex;
  align-items: center;
}
.register-radio-btn {
  width: auto;
  cursor: pointer;
  margin: 0 10px 0 0;
}
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}
.form-signup-wrapper, .form-login-wrapper {
  margin-bottom: 40px;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
.invalid .radio-btn-container {
  color: red;
  font-weight: 600;
}
</style>