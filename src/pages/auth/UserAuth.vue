<template>
  <div class="margin-top-page">
    <section>
      <base-dialog :show="!!error" :title="dialogHeader" @close="handleError">
        <p>{{ error }}</p>
      </base-dialog>
      <base-dialog :show="isLoading" title="Uwierzytelnianie..." fixed>
        <base-spinner></base-spinner>
      </base-dialog>
      <base-card>
        <user-auth-form @auth-form-data="AuthFormData"></user-auth-form>
      </base-card>
    </section>
  </div>
</template>

<script>
import UserAuthForm from "@/pages/auth/UserAuthForm";

export default {
  data() {
    return {
      error: false,
      isLoading: false,
      dialogHeader: ''
    }
  },
  components: {
    UserAuthForm
  },
  methods: {
    async AuthFormData(data) {
      this.isLoading = true;
      try {
        if (data.mode === 'login') {
          await this.$store.dispatch('login', data);
          const redirectUrl = '/' + (this.$route.query.redirect || 'coaches');
          this.$router.replace(redirectUrl);
        } else if(data.mode === 'signup') {
          await this.$store.dispatch('signup', data);
          window.location.reload();
        } else {
          await this.$store.dispatch('resetPassword', data);
          this.isLoading = false;
          this.dialogHeader = 'Udało się';
          this.error = 'Link do hasła został wysłany';
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      } catch (err) {
        this.isLoading = false;
        this.dialogHeader = 'Coś poszło nie tak';
        this.error = err.message || 'Nie udało się uwierzytelnić. Spróbuj później.';
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.user-auth-page {
  background: rgb(23, 84, 119);
  background: linear-gradient(180deg, rgba(23, 84, 119, 1) 0%, rgba(9, 34, 48, 1) 35%, rgba(0, 0, 0, 1) 100%);
  min-height: calc(100vh - 120px);
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>