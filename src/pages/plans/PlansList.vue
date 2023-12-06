<template>
  <div class="margin-top-page">
    <base-dialog :show="!!error" title="Coś poszło nie tak!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <div v-if="userLoggedIn" class="filter-plans-container">
          <label>
            <input type="radio" id="myPlans" value="myPlans" v-model="plansType">
            Moje plany
          </label>
          <label>
            <input type="radio" id="allPlans" value="allPlans" v-model="plansType">
            Wszystkie plany
          </label>
          <label v-if="getUserType === 'trainer'">
              <input type="radio" id="clientsPlans" value="clientsPlans" v-model="plansType">
              Plany dla podopiecznych
          </label>
        </div>
        <div class="client-filter-container" v-if="plansType==='clientsPlans' && getUserType === 'trainer'">
          <input type="text" id="filterClient" class="filterClient" placeholder="Znajdź podopiecznego" v-model="clientFilterInput">
        </div>
        <base-button mode="outline" @click="loadAllPlans(true)">Odśwież</base-button>
        <base-button link to="plans/createPlan">Utwórz plan</base-button>
      </base-card>
    </section>
   <section>
     <base-card>
       <base-spinner v-if="isLoading"></base-spinner>
       <ul v-else-if="!isLoading && hasPlans && filteredPlans.length > 0">
       <plan-item v-for="plan in filteredPlans" :key="plan.id" :id="plan.id" :plan-name="plan.planTitle" :plan-description="plan.planDescription" :plan-first-name="plan.recipientFirstName" :plan-last-name="plan.recipientLastName" :plans-type="plansType" :plan-creator-data="plan.planCreator" :plan-creator-display="plan.planCreatorDisplay">
       </plan-item>
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
      plansType: 'allPlans',
      clientFilterInput: ''
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
    userLoggedIn() {
      return this.$store.getters['isAuthenticated']
    },
    getUserType() {
      return this.$store.getters.userType;
    },
    filteredPlans() {
      const plans = this.$store.getters['plans/plans'];
      const filterInput = this.clientFilterInput.toLowerCase();
      if (this.plansType === 'myPlans') {
        return plans.filter(plan => plan.planRecipientEmail === this.$store.getters['userEmail'] || plan.planCreator === localStorage.getItem('userId'));
      } else if (this.plansType === 'allPlans') {
        return plans;
      } else if(this.plansType === 'clientsPlans') {
        return plans.filter(plan => plan.planRecipientEmail !== this.$store.getters['userEmail']
            && plan.planCreatorEmail === localStorage.getItem('userEmail')
            && ((plan.recipientFirstName + ' ' + plan.recipientLastName).toLowerCase().includes(filterInput) ||
            (plan.recipientLastName + ' ' + plan.recipientFirstName).toLowerCase().includes(filterInput)));
      }
      else {
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
    handleError() {
      this.error = null
      this.$router.replace('/coaches');
    },
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
@import './src/assets/variables';
@import './src/assets/formFields';

.filter-plans-container {
  margin-bottom: 16px;
  color: white;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  input {
    cursor: pointer;
  }
}
.client-filter-container {
  width: 100%;
  margin-bottom: 16px;
}
ul {
  margin: 0;
  padding: 0;
}
h3 {
  color: white;
}
input[type="radio"] {
  display: unset;
  width: unset;
}
</style>