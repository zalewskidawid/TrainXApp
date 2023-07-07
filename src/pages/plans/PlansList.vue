<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <base-button mode="outline" @click="loadAllPlans(true)">Refresh</base-button>
        <base-button link to="plans/createPlan">Create Plan</base-button>
      </base-card>
    </section>
   <section>
     <base-card>
       <base-spinner v-if="isLoading"></base-spinner>
       <ul v-else-if="!isLoading && hasPlans">
       <plan-item v-for="plan in getAllPlans" :key="plan.id" :id="plan.id" :plan-name="plan.planTitle" :plan-description="plan.planDescription"></plan-item>
       </ul>
       <h3 v-else>Doesn't have any plans yet.</h3>
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
    }
  },
  computed: {
    getAllPlans() {
      return this.$store.getters['plans/plans'];
    },
    hasPlans() {
      return this.$store.getters['plans/hasPlans'];
    }
  },
  created() {
    if(this.$store.getters['plans/hasPlans']) {
      this.loadAllPlans(false)
    } else {
      this.loadAllPlans(true);
    }
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

<style scoped>
ul {
  margin: 0;
  padding: 0;
}
</style>