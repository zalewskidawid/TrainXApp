<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <h2>{{ selectedPlan.planTitle }}</h2>
        <h3>{{ selectedPlan.planDescription }}</h3>
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
            >
              {{ childPlan.title }}
            </base-button>
          </div>
          <div class="tab-content">
            <div v-for="(childPlan, index) in selectedPlan.childPlans" :key="index" v-show="isActiveTab(index)">
              <div v-for="(childPlanExercise, exerciseIndex) in childPlan.exercises" :key="exerciseIndex" class="plan-exercises-container">
                <p class="plan-exercises-container__name">{{ childPlanExercise.name }}</p>
                <p class="plan-exercises-container__series">{{ childPlanExercise.series }}</p>
                <span>x</span>
                <p class="plan-exercises-container__reps">{{ childPlanExercise.reps }}</p>
              </div>
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
      error: null,
      isLoading: false,
      activeTabIndex: 0
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
        this.error = error.message || 'Something wrong happened!';
      }
      this.selectedPlan = this.$store.getters['plans/plans'].find((plan) => plan.id === this.id);
      if(typeof this.selectedPlan === 'undefined') {
        this.error = 'Something wrong happened!';
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
    },
    isActiveTab(index) {
      return this.activeTabIndex === index;
    }
  },
  computed: {
    hasPlans() {
      return this.$store.getters['plans/hasPlans'];
    },
  },
  mounted() {
    this.getData();
    if(this.hasPlans) {
      this.getData(false);
    } else {
      this.getData(true);
    }
  },
}
</script>

<style lang="scss" scoped>
.active-plan-tab {
  background-color: #270041;
  border-color: #270041;
}
.plan-exercises-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
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