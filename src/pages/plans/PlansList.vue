<template>
  <div class="margin-top-page">
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <div class="filter-plans-container">
          <label>
            <input type="checkbox" v-model="myPlansChecked">
            Moje plany
          </label>
          <label>
            <input type="checkbox" v-model="allPlansChecked">
            Wszystkie plany
          </label>
        </div>
        <base-button mode="outline" @click="loadAllPlans(true)">Refresh</base-button>
        <base-button link to="plans/createPlan">Create Plan</base-button>
      </base-card>
    </section>
   <section>
     <base-card>
       <base-spinner v-if="isLoading"></base-spinner>
       <ul v-else-if="!isLoading && hasPlans && filteredPlans.length > 0">
       <plan-item v-for="plan in filteredPlans" :key="plan.id" :id="plan.id" :plan-name="plan.planTitle" :plan-description="plan.planDescription"></plan-item>
       </ul>
       <h3 v-else-if="filteredPlans.length === 0">Nie masz żadnych planów.</h3>
     </base-card>
   </section>
  </div>
</template>

<script>
import BaseCard from "@/components/ui/BaseCard";
import PlanItem from "@/components/plans/PlanItem";
import BaseButton from "@/components/ui/BaseButton";
import BaseSpinner from "@/components/ui/BaseSpinner";
export default {
  name: "PlansList.vue",
  components: {BaseSpinner, BaseButton, PlanItem, BaseCard},
  data() {
    return {
      error:null,
      isLoading: false,
      myPlansChecked: false,
      allPlansChecked: false
    }
  },
  watch: {
    myPlansChecked(newVal) {
      if (newVal) {
        this.allPlansChecked = false;
      }
    },
    allPlansChecked(newVal) {
      if(newVal) {
        this.myPlansChecked = false;
      }
    }
  },
  computed: {
    hasPlans() {
      return this.$store.getters['plans/hasPlans'];
    },
    filteredPlans() {
      const plans = this.$store.getters['plans/plans'];

      if (this.myPlansChecked) {
        return plans.filter(plan => plan.planRecipientEmail === this.$store.getters['userEmail'] || plan.planCreator === localStorage.getItem('userId'));
      } else if (this.allPlansChecked) {
        return plans;
      } else {
        return [];
      }
    }
  },
  created() {
    if (this.$store.getters['plans/hasPlans']) {
      this.loadAllPlans(false)
    } else {
      this.loadAllPlans(true);
    }
    this.allPlansChecked = true;
  },
  methods: {
    async loadAllPlans(refresh) {
      try {
        this.isLoading = true
        await this.$store.dispatch('plans/loadAllPlans', {
          forceRefresh: refresh
        });
        this.isLoading = false;
      } catch(err) {
        this.isLoading = false
        this.error = err.message || 'Failed to fetch, try again later.';
      }
    }
  },

}
</script>

<style scoped lang="scss">
.filter-plans-container {
  margin-bottom: 16px;
  input {
    cursor: pointer;
  }
}
ul {
  margin: 0;
  padding: 0;
}
</style>