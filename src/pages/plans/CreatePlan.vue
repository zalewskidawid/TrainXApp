<template>
  <div class="margin-top-page">
    <base-dialog :show="!!error" title="Coś poszło nie tak!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <h2>Stwórz swój plan</h2>
      <create-plan-form @create-plan-form-data="createPlanFormData"></create-plan-form>
    </base-card>
  </div>
</template>

<script>
import CreatePlanForm from "@/components/plans/CreatePlanForm";
import BaseCard from "@/components/ui/BaseCard";

export default {
  components: {BaseCard, CreatePlanForm},
  data() {
    return {
      error: false,
      isLoading: false
    }
  },
  methods: {
    async createPlanFormData(data) {
        this.isLoading = true;
        try {
         await this.$store.dispatch('plans/addNewPlan', data);
          await this.$store.dispatch('plans/loadAllPlans', {
            forceRefresh: true
          });
          this.$router.replace('/plans');
        } catch (err) {
          this.isLoading = false;
          this.error = err.message || 'Failed to add new plan.';
        }
    },
    handleError() {
      this.error = null;
    },
  }
}
</script>


<style scoped>
h2 {
  color: white;
}
</style>