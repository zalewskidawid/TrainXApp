<template>

  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid: !planTitle.isValid}">
      <label for="planTitle">Plan title</label>
      <input type="text" id="planTitle" placeholder="Title" v-model="planTitle.val" @click="planTitle.isValid = true">
      <p class="error-msg" v-if="!planTitle.isValid">Plan title cannot be empty.</p>
    </div>
    <div class="form-control" :class="{invalid: !planDescription.isValid}">
      <label for="planDescription">Plan Description</label>
      <textarea type="textarea" id="planDescription" placeholder="Description" v-model="planDescription.val" rows="5" cols="10"  @click="planDescription.isValid = true"></textarea>
      <p class="error-msg" v-if="!planDescription.isValid">Plan description cannot be empty.</p>
    </div>
    <div class="form-control" :class="{invalid: !planRecipient.isValid}">
      <p>Plan recipient</p>
      <div class="radio-btn-container">
        <input name="planRecipient" type="radio" v-model="planRecipient.val" value="forMe" class="register-radio-btn"
               @change="showPlanRecipientEmail"  @click="planRecipient.isValid = true"><span>For me</span>
      </div>
      <div class="radio-btn-container">
        <input name="planRecipient" type="radio" v-model="planRecipient.val" value="forEveryone"
               class="register-radio-btn" @change="showPlanRecipientEmail" @click="planRecipient.isValid = true"><span>For everyone</span>
      </div>
      <div class="radio-btn-container">
        <input name="planRecipient" type="radio" v-model="planRecipient.val" value="forClient"
               class="register-radio-btn" @change="showPlanRecipientEmail" @click="planRecipient.isValid = true"><span>For client</span>
      </div>
      <p class="error-msg" v-if="!planRecipient.isValid">Plan Recipient must be checked.</p>
    </div>
    <div class="form-control" v-if="planRecipientCheck">
      <input type="email" id="planClient" :placeholder="planRecipientText" v-model="planRecipientEmail">
    </div>
    <div class="tabs">
      <div v-for="(childPlan, index) in filteredChildPlans" :key="index" class="tab"
           :class="{ active: activeTabIndex === index }">
        <button type="button" @click="changeActiveTab(index)" class="purple-btn">
          {{ `Child Plan ${index + 1}` }}
        </button>
      </div>
    </div>
    <div class="tab-content">
      <div v-for="(childPlan, index) in filteredChildPlans" :key="index">
        <div v-if="activeTabIndex === index" class='form-control' :class="{invalid: !childPlan.titleValid}">
          <label>
            Child Plan Title:
            <input v-model="childPlan.title" @click="childPlan.titleValid = true"/>
            <p class="error-msg" v-if="!childPlan.titleValid">Title field cannot be empty.</p>
          </label>
          <button type="button" @click="addChildPlanExercise(index)" class="purple-btn">Add Exercise</button>
          <div v-for="(exercise, exerciseIndex) in childPlan.exercises" :key="exerciseIndex">
            <div class="form-control" :class="{invalid: !exercise.exerciseNameValid}">
            <label>
              Exercise Name:
              <input v-model="exercise.name"  @click="exercise.exerciseNameValid = true"/>
              <p class="error-msg" v-if="!exercise.exerciseNameValid">Exercise name cannot be empty.</p>
            </label>
            </div>
            <div class="form-control" :class="{invalid: !exercise.exerciseSeriesValid}">
            <label>
              Amount of Series:
              <input type="number" v-model="exercise.series" min="1" max="10"  @click="exercise.exerciseSeriesValid = true"/>
              <p class="error-msg" v-if="!exercise.exerciseSeriesValid">Exercise Series field cannot be empty.</p>
            </label>
              </div>
            <div class="form-control" :class="{invalid: !exercise.exerciseRepsValid}">
            <label>
              Amount of Reps:
              <input type="number" v-model="exercise.reps" min="1" max="20" @click="exercise.exerciseRepsValid = true"/>
              <p class="error-msg" v-if="!exercise.exerciseRepsValid">Exercise reps field cannot be empty.</p>
            </label>
            </div>
            <button type="button" @click="removeChildPlanExercise(index, exerciseIndex)" class="purple-btn">Remove Exercise</button>
          </div>
          <button type="button" v-if="index > 0" @click="removeChildPlan(index)" class="purple-btn">Remove Child Plan {{
              index + 1
            }}
          </button>
        </div>
      </div>
    </div>
    <button type="button" @click="addChildPlan" :disabled="filteredChildPlans.length >= 5" class="purple-btn">{{filteredChildPlans.length >= 5 ? 'Max plans reached' : 'Add child plan'}}</button>
    <base-button>Create Plan</base-button>
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
          title: 'Plan 1',
          titleValid: true,
          exercises: [
            {
              name: 'Name',
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
      planDescription: {
        val: '',
        isValid: true
      },
      planTitle: {
        val: '',
        isValid: true
      },
      planRecipientEmail: {
        val: '',
        isValid: true
      },
      planRecipient: {
        val: '',
        isValid: true
      },
      planRecipientText: ''
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
      this.childPlans.push({title: "Child Plan", exercises: [], titleValid: true});
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
        name: "Name",
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
        planRecipientEmail: this.planRecipientEmail.val,
        childPlans: this.childPlans
      }
      this.$emit('create-plan-form-data', formData);
    },
    showPlanRecipientEmail() {
      if (this.planRecipient.val === 'forMe') {
        this.planRecipientText = 'Enter your account email';
        this.planRecipientEmail = '';
      } else if (this.planRecipient.val === 'forClient') {
        this.planRecipientText = 'Enter client email';
        this.planRecipientEmail = '';
      } else if (this.planRecipient.val === 'forEveryone') {
        this.planRecipientEmail = 'everyone';
      }
    }
  },
}
</script>


<style scoped lang="scss">
.error-msg {
  margin-top: 10px;
  margin-bottom: 20px;
}

.purple-btn {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
  margin-bottom: 10px;
}

.tabs {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
}

.purple-btn:hover,
.purple-btn:active {
  background-color: #270041;
  border-color: #270041;
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
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
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

.invalid p {
  color: red;
}
</style>