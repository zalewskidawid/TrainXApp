<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
     <user-auth-form @auth-form-data="AuthFormData"></user-auth-form>
    </base-card>
  </div>
</template>

<script>
import UserAuthForm from "@/pages/auth/UserAuthForm";
export default {
  data() {
    return {
      error: false,
      isLoading: false
    }
  },
  components: {
    UserAuthForm
  },
  methods: {
   async AuthFormData(data) {
      this.isLoading = true;
      try {
        if(data.mode === 'login') {
          await this.$store.dispatch('login', data);
        } else {
          await this.$store.dispatch('signup', data);
        }
        const redirectUrl = '/' + (this.$route.query.redirect || 'coaches');
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.isLoading = false;
        this.error = err.message || 'Failed to authenticate, try later.';
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>