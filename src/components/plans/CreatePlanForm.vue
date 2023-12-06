<template>

  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid: !planTitle.isValid}">
      <label for="planTitle">Tytuł planu</label>
      <input type="text" id="planTitle" placeholder="Title" v-model="planTitle.val" @click="planTitle.isValid = true">
      <p class="error-msg" v-if="!planTitle.isValid">Tytuł planu nie może być pusty.</p>
    </div>
    <div class="form-control" :class="{invalid: !planDescription.isValid}">
      <label for="planDescription">Opis planu</label>
      <textarea type="textarea" id="planDescription" placeholder="Description" v-model="planDescription.val" rows="5" cols="10"  @click="planDescription.isValid = true"></textarea>
      <p class="error-msg" v-if="!planDescription.isValid">Opis planu nie może być pusty.</p>
    </div>
    <div class="form-control">
      <label for="planCreator">Czy chcesz wyświetlać twórcę planu?</label>
      <div class="plan-creator-radio-container">
        <input name="planCreator" type="radio" v-model="planCreatorDisplay" value="Yes"><span>Tak</span>
      </div>
      <div class="plan-creator-radio-container">
        <input name="planCreator" type="radio" v-model="planCreatorDisplay" value="No"><span>Nie</span>
      </div>
    </div>
    <div class="form-control" :class="{invalid: !planRecipient.isValid}">
      <p>Odbiorca planu</p>
      <div class="radio-btn-container">
        <input name="planRecipient" type="radio" v-model="planRecipient.val" value="forMe" class="register-radio-btn"
               @change="showPlanRecipientEmail"  @click="planRecipient.isValid = true"><span>Dla mnie</span>
      </div>
      <div class="radio-btn-container">
        <input name="planRecipient" type="radio" v-model="planRecipient.val" value="forEveryone"
               class="register-radio-btn" @change="showPlanRecipientEmail" @click="planRecipient.isValid = true"><span>Dla wszystkich</span>
      </div>
      <div class="radio-btn-container">
        <input name="planRecipient" type="radio" v-model="planRecipient.val" value="forClient"
               class="register-radio-btn" @change="showPlanRecipientEmail" @click="planRecipient.isValid = true"><span>Dla klienta</span>
      </div>
      <p class="error-msg" v-if="!planRecipient.isValid">Przynajmniej jedno pole musi być zaznaczone.</p>
    </div>
    <div class="form-control" v-if="planRecipientCheck">
      <input type="email" id="planClient" :placeholder="planRecipientText" v-model="planRecipientEmail">
    </div>
    <div class="tabs">
      <div v-for="(childPlan, index) in filteredChildPlans" :key="index" class="tab"
           :class="{ active: activeTabIndex === index }">
        <button type="button" @click="changeActiveTab(index)" class="purple-btn">
          {{ `Trening ${index + 1}` }}
        </button>
      </div>
    </div>
    <div class="tab-content">
      <div v-for="(childPlan, index) in filteredChildPlans" :key="index">
        <div v-if="activeTabIndex === index" class='form-control' :class="{invalid: !childPlan.titleValid}">
          <label>
            Tytuł treningu:
            <input v-model="childPlan.title" @click="childPlan.titleValid = true"/>
            <p class="error-msg" v-if="!childPlan.titleValid">Pole tytułu nie może być puste.</p>
          </label>
          <div v-for="(exercise, exerciseIndex) in childPlan.exercises" :key="exerciseIndex">
            <div class="form-control" :class="{invalid: !exercise.exerciseNameValid}">
            <label>
              Nazwa ćwiczenia:
              <input v-model="exercise.name"  @click="exercise.exerciseNameValid = true"/>
              <p class="error-msg" v-if="!exercise.exerciseNameValid">Pole nazwy ćwiczenia nie może być puste, bądź zawierać liczb.</p>
            </label>
            </div>
            <div class="form-control" :class="{invalid: !exercise.exerciseSeriesValid}">
            <label>
              Liczba serii:
              <input type="number" v-model="exercise.series" min="1" max="10"  @click="exercise.exerciseSeriesValid = true"/>
              <p class="error-msg" v-if="!exercise.exerciseSeriesValid">Pole liczba serii nie może być puste.</p>
            </label>
              </div>
            <div class="form-control" :class="{invalid: !exercise.exerciseRepsValid}">
            <label>
              Liczba powtórzeń:
              <input type="number" v-model="exercise.reps" min="1" max="20" @click="exercise.exerciseRepsValid = true"/>
              <p class="error-msg" v-if="!exercise.exerciseRepsValid">Liczba powtórzeń nie może być pusta.</p>
            </label>
            </div>
            <button type="button" @click="removeChildPlanExercise(index, exerciseIndex)" class="purple-btn">Usuń ćwiczenie</button>
          </div>
          <button type="button" @click="addChildPlanExercise(index)" class="purple-btn">Dodaj ćwiczenie</button>
          <button type="button" v-if="index > 0" @click="removeChildPlan(index)" class="purple-btn">Usuń trening {{
              index + 1
            }}
          </button>
        </div>
      </div>
    </div>
    <button type="button" @click="addChildPlan" :disabled="filteredChildPlans.length >= 5" class="purple-btn">{{filteredChildPlans.length >= 5 ? 'Maksymalna liczba treningów osiągnięta' : 'Dodaj trening'}}</button>
    <base-button mode="flat">Utwórz plan</base-button>
  </form>
</template>

<script>
import BaseButton from "@/components/ui/BaseButton";

export default {
  components: {BaseButton},
  emits: ['create-plan-form-data'],
  data() {
    return {
      formIsValid: true,
      exerciseFieldsValid: true,
      childPlans: [
        {
          title: 'Trening 1',
          titleValid: true,
          exercises: [
            {
              name: 'Nazwa',
              exerciseNameValid: true,
              series: 1,
              exerciseSeriesValid: true,
              reps: 1,
              exerciseRepsValid: true
            }
          ]
        },
      ],
      activeTabIndex: 0,
      planRecipientEmail: '',
      planRecipientEmailValid: true,
      planDescription: {
        val: '',
        isValid: true
      },
      planTitle: {
        val: '',
        isValid: true
      },
      planRecipient: {
        val: '',
        isValid: true
      },
      planRecipientText: '',
      planCreatorDisplay: 'No',
      planCreator: ''
    }
  },
  computed: {
    planRecipientCheck() {
      return this.planRecipient.val !== 'forEveryone' && this.planRecipient.val
    },
    filteredChildPlans() {
      return this.childPlans;
    },
  },
  methods: {
    changeActiveTab(index) {
      this.activeTabIndex = index;
    },
    addChildPlan() {
      this.childPlans.push({title: "Trening", exercises: [], titleValid: true});
      this.activeTabIndex = this.childPlans.length - 1;
    },
    removeChildPlan(index) {
      this.childPlans.splice(index, 1);
      if (this.activeTabIndex >= this.childPlans.length) {
        this.activeTabIndex = this.childPlans.length - 1;
      }
    },
    addChildPlanExercise(childPlanIndex) {
      this.childPlans[childPlanIndex].exercises.push({
        name: "Nazwa",
        series: 1,
        reps: 1,
        exerciseNameValid: true,
        exerciseRepsValid: true,
        exerciseSeriesValid: true
      });
    },
    removeChildPlanExercise(childPlanIndex, exerciseIndex) {
      this.childPlans[childPlanIndex].exercises.splice(exerciseIndex, 1);
    },
    validForm() {
      this.formIsValid = true;
      if (this.planTitle.val.trim() === '' || /\d/.test(this.planTitle.val)) {
        this.planTitle.isValid = false;
        this.formIsValid = false;
      }
      if (this.planDescription.val.trim() === '') {
        this.planDescription.isValid = false;
        this.formIsValid = false
      }
      if (this.planRecipient.val === '') {
        this.planRecipient.isValid = false;
        this.formIsValid = false
      }
      this.childPlans.forEach(el => {
        if(el.title.trim() === '') {
          el.titleValid = false;
          this.formIsValid = false;
        }
        el.exercises.forEach(el => {
          if(el.name.trim() === '' || /\d/.test(el.name)) {
            el.exerciseNameValid = false;
            this.formIsValid = false;
          }
          if(el.series === '') {
            el.exerciseSeriesValid = false;
            this.formIsValid = false;
          }
          if(el.reps === '') {
            el.exerciseRepsValid = false;
            this.formIsValid = false;
          }
        })
      })
      this.planCreatorDisplay === 'Yes' ? this.planCreator = this.$store.getters.userData : this.planCreator = ''
    },
    submitForm() {
      this.validForm();
      if (this.formIsValid === false) {
        return true;
      }

      const formData = {
        planTitle: this.planTitle.val,
        planDescription: this.planDescription.val,
        planRecipient: this.planRecipient.val,
        planRecipientEmail: this.planRecipientEmail,
        childPlans: this.childPlans,
        planCreator: this.planCreator,
        planCreatorDisplay: this.planCreatorDisplay,
        planCreatorEmail: this.$store.getters['userEmail']
      }
      this.$emit('create-plan-form-data', formData);
    },
    showPlanRecipientEmail() {
      if (this.planRecipient.val === 'forMe') {
        this.planRecipientText = 'Wprowadź swój email';
        this.planRecipientEmail = '';
      } else if (this.planRecipient.val === 'forClient') {
        this.planRecipientText = 'Wprowadź email klienta';
        this.planRecipientEmail = '';
      } else if (this.planRecipient.val === 'forEveryone') {
        this.planRecipientEmail = 'everyone';
      }
    }
  },
}
</script>


<style scoped lang="scss">
@import './src/assets/variables';
.error-msg {
  margin-top: 10px;
  margin-bottom: 20px;
}

.purple-btn {
  text-decoration: none;
  color: white;
  display: inline-block;
  padding: 13px 20px;
  border: 1px solid #2587be;
  border-radius: 25px;
  background-color: transparent;
  cursor: pointer;
  margin: 8px 8px 8px 0;
  font-size: 16px;
}

.tabs {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
}

.purple-btn:hover,
.purple-btn:active {
  border: 1px solid #2587be;
  color: white;
  background-color: #1C658F;
}

ul {
  list-style-type: none;
  padding: 0;
}

.form-exercises-wrapper {
  margin: 0 auto;
}

.form-exercise-content-wrapper {
  display: flex;
  align-items: center;
}

.form-exercise-container {
  margin: 0 5px;
}

.radio-btn-container {
  display: flex;
  align-items: center;
  span {
    color: white;
  }
}

.register-radio-btn {
  width: auto;
  cursor: pointer;
  margin: 0 10px 0 0;
}

.form-control {
  margin: 0.5rem 0;
}

p {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
  color: white;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
  color: white;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
  color: white;
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
  &::placeholder {
    color: white;
  }

}

input:focus,
textarea:focus {
  background-color: $primary-color-darker;
  outline: none;
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

.invalid p {
  color: red;
}
.plan-creator-radio-container {
  display: flex;
  align-items: center;
  flex-direction: row;
  input {
    width: auto;
    margin-right: 10px;
    margin-left: 0;
    cursor: pointer;
  }
}

</style>