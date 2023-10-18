<template>
  <div class="margin-top-page">
    <base-dialog :show="!!error" title="Coś poszło nie tak!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <div class="plan-main-tab-wrapper">
          <div class="plan-description-container">
            <h2 v-if="!isEditing">{{ selectedPlan.planTitle }}</h2>
            <input v-else v-model="selectedPlan.planTitle" @blur="savePlanTitle" />
            <p class="error-msg" v-if="!planNameValid">Tytuł planu nie może być pusty, bądź zawierać cyfr.</p>
            <h3 v-if="!isEditing">{{ selectedPlan.planDescription }}</h3>
            <textarea v-else v-model="selectedPlan.planDescription" @blur="savePlanDescription" />
            <p class="error-msg" v-if="!planDescriptionValid">Opis planu nie może być pusty, bądź większy niż 256 znaków.</p>
          </div>
          <div class="edit-plan-btn-container">
            <base-button v-if="isPlanCreator" class="edit-plan-btn" :class="{'active' : isEditing}" mode="outline"
                         @click="editPlan">
              Edytuj
            </base-button>
            <base-button v-if="isEditing" class="confirm-plan-btn" mode="outline" @click="savePlan">Zapisz</base-button>
          </div>
        </div>
      </base-card>
    </section>
    <section>
      <base-card>
        <div>
          <div class="tab-buttons">
            <base-button
                v-for="(childPlan, index) in selectedPlan.childPlans"
                :key="index"
                :class="{ 'active-plan-tab': isActiveTab(index) }"
                @click="switchTab(index)"
                mode="outline"
            >
              {{ childPlan.title }}
            </base-button>
          </div>
          <div class="tab-content">
            <div v-for="(childPlan, index) in selectedPlan.childPlans" :key="index" v-show="isActiveTab(index)">
              <div class="plan-description-tabs-container">
                <p class="plan-description-tabs-container__tab">1. Nazwa ćwiczenia</p>
                <p class="plan-description-tabs-container__tab">2. Ilość serii</p>
                <p class="plan-description-tabs-container__tab">3. Ilość powtórzeń</p>
              </div>
              <div v-for="(childPlanExercise, exerciseIndex) in childPlan.exercises" :key="exerciseIndex"
                   class="plan-exercises-container">
                <p v-if="!isEditing" class="plan-exercises-container__name">{{ childPlanExercise.name }}</p>
                <div v-if="!isEditing" class="plan-exercises-series">
                  <p class="plan-exercises-container__series">{{ childPlanExercise.series }}</p>
                  <span> x</span>
                </div>
                <p v-if="!isEditing" class="plan-exercises-container__reps">{{ childPlanExercise.reps }}</p>
                <div class="edit-plan-container" v-for="(exercise, exerciseIndex) in updatedExercises"
                     :key="exerciseIndex">
                  <input type="text" v-model="updatedExercises[exerciseIndex].name" :placeholder="exercise.name"
                         v-if="isEditing">
                  <p class="error-msg" v-if="!updatedExercises[exerciseIndex].exerciseNameValid">Nazwa ćwiczenia nie może być pusta bądź zawierać liczby.</p>
                  <input type="number" v-model="updatedExercises[exerciseIndex].series" :placeholder="exercise.series"
                         v-if="isEditing">
                  <p class="error-msg" v-if="!updatedExercises[exerciseIndex].exerciseSeriesValid">Ilość serii nie może być pusta bądź być mniejsza od 1.</p>
                  <input type="number" v-model="updatedExercises[exerciseIndex].reps" :placeholder="exercise.reps"
                         v-if="isEditing">
                  <p class="error-msg" v-if="!updatedExercises[exerciseIndex].exerciseRepsValid">Ilość powtórzeń nie może być pusta bądź być mniejsza od 1.</p>
                </div>
              </div>
              <hr/>
            </div>
          </div>
        </div>
      </base-card>
    </section>
  </div>
</template>
<script>
import BaseCard from "@/components/ui/BaseCard";
import BaseButton from "@/components/ui/BaseButton";

export default {
  components: {BaseButton, BaseCard},
  props: ['id'],
  data() {
    return {
      selectedPlan: [],
      planDescriptionValid: true,
      planNameValid: true,
      error: null,
      isLoading: false,
      activeTabIndex: 0,
      isPlanCreator: false,
      isEditing: false,
      updatedExercises: [],
      formIsValid: true
    };
  },
  methods: {
    async getData(refresh) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('plans/loadAllPlans', {
          forceRefresh: refresh
        });
      } catch (error) {
        this.error = error.message || 'Coś poszło nie tak!';
      }
      this.selectedPlan = this.$store.getters['plans/plans'].find((plan) => plan.id === this.id);
      if (this.selectedPlan.planCreator === this.$store.getters.userId || this.selectedPlan.planRecipient === this.$store.getters.userId) {
        this.isPlanCreator = true
      }
      this.updatedExercises = this.selectedPlan.childPlans[0].exercises
      if (typeof this.selectedPlan === 'undefined') {
        this.error = 'Coś poszło nie tak!';
        return;
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null
      this.$router.replace('/plans');
    },
    switchTab(index) {
      this.activeTabIndex = index;
      const selectedChildPlan = this.selectedPlan.childPlans[index];
      this.updatedExercises = [...selectedChildPlan.exercises];
    },
    isActiveTab(index) {
      return this.activeTabIndex === index;
    },
    editPlan() {
      this.isEditing = true;
    },
    validForm() {
      this.formIsValid = true;
      this.selectedPlan.childPlans.forEach((childPlan) => {
        childPlan.exercises.forEach((exercise) => {
          if(exercise.name.trim() === '' || /\d/.test(exercise.name)) {
            exercise.exerciseNameValid = false;
            this.formIsValid = false;
          } else {
            exercise.exerciseNameValid = true;
          }
          if(exercise.series <= 0 || exercise.series === '') {
            exercise.exerciseSeriesValid = false;
            this.formIsValid = false
          } else {
            exercise.exerciseSeriesValid = true;
          }
          if(exercise.reps <= 0 || exercise.reps === '') {
            exercise.exerciseRepsValid = false;
            this.formIsValid = false
          } else {
            exercise.exerciseRepsValid = true;
          }
        })
      })
      if(this.selectedPlan.planTitle.trim() === '' || /\d/.test(this.selectedPlan.planTitle)) {
        this.planNameValid = false;
        this.formIsValid = false;
      } else {
        this.planNameValid = true;
      }
      if(this.selectedPlan.planDescription.trim() === '' || this.selectedPlan.planDescription.length > 256) {
        this.planDescriptionValid = false;
        this.formIsValid = false;
      } else {
        this.planDescriptionValid = true;
      }
    },
    savePlan() {
      this.validForm();
      (this.formIsValid ? this.isEditing = false : this.isEditing = true)
    },

  },
  computed: {
    hasPlans() {
      return this.$store.getters['plans/hasPlans'];
    },
  },
  mounted() {
    if (this.hasPlans) {
      this.getData(false);
    } else {
      this.getData(true);
    }
  },
}
</script>

<style lang="scss" scoped>
@import './src/assets/variables';
@import './src/assets/formFields';

input, textarea {
  width: auto;
  margin: 4px 4px;
}
.error-msg {
  color: red;
  width: 100%;
}
.plan-main-tab-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  .plan-description-container {
    max-width: 50%;
    word-wrap: break-word;
  }
  h2 {
    margin-top: 0;
  }
}
.plan-description-tabs-container {
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;

  &__tab {
    margin: 8px 8px 0 0;
  }
}

.active-plan-tab {
  background-color: black;
  border-color: black;

  &:focus, &:hover {
    background-color: black;
    border-color: black;
  }
}

.tab-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .edit-plan-btn-container {
    width: 100%;
    margin: 16px 0 8px 0;
    button {
      cursor: pointer;
    }
  }
}

.plan-exercises-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;

  .edit-plan-container {
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    input:first-of-type {
      margin-left: 0;
    }
  }

  p {
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .plan-exercises-series {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  span {
    padding-right: 6px;
    padding-left: 6px;
  }

  &__name {
    margin-right: 8px;
  }

  &__series {
    margin-right: 8px;
  }

  &__reps {
    margin-left: 8px;
  }
}
</style>