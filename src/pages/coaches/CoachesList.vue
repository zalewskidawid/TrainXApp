<template>
  <div class="margin-top-page">
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item v-for="coach in returnCoaches" :id="coach.id" :first-name="coach.firstName" :last-name="coach.lastName" :rate="coach.hourlyRate" :email="coach.email" :userType="coach.userType" :key="coach.id"></coach-item>
        </ul>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from "@/components/coaches/CoachItem";


export default {
  components: {
    CoachItem,
  },
  data() {
    return {
      isLoading: false,
      error: null
    };
  },
  computed: {
    returnCoaches() {
      const coaches = this.$store.getters['coaches/coaches']
      return coaches;
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>