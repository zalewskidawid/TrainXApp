<template>
  <div class="margin-top-page">
    <base-dialog :show="!!error" title="Coś poszło nie tak" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
    <user-profile-info v-for="user in userDataFromStore" :email="user.email" :key="user.id" :firstname="user.firstName" :lastname="user.lastName" :description="user.description" :user-type="user.userType" :rate="user.rate"></user-profile-info>
    </base-card>
  </div>
</template>


<script>

import UserProfileInfo from "@/components/profile/userProfileInfo";
import BaseCard from "@/components/ui/BaseCard";
export default {
  components: {BaseCard, UserProfileInfo},
  data() {
    return {
      userData: [],
      error: null,
      isLoading: false
    }
  },
  methods: {
    async getUserData(refresh) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('profile/loadUserInfo', {
          forceRefresh: refresh
        });
        this.userData = this.$store.getters['profile/userData'];
      } catch (error) {
        this.error = error.message || 'Coś poszło nie tak!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null
      this.$router.replace('/coaches');
    }
  },
  computed: {
    userDataFromStore() {
      return this.$store.getters['profile/userData'];
    }
  },
  created() {
    if(this.$store.getters['profile/shouldUpdate'] === false) {
      this.getUserData(false);
    } else {
      this.getUserData(true);
    }
  },
};
</script>


<style lang="scss" scoped>


</style>