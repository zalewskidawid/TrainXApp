<template>
  <div class="margin-top-page">
    <base-dialog :show="!!error" title="Coś poszło nie tak" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <h2>{{ fullName }}</h2>
        <h3>{{ rate }}zł/h</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <router-view></router-view>
        <header v-if="!checkRoutePath">
          <h2>Zainteresowany? Napisz do mnie!</h2>
          <base-button link :to="contactLink">Kontakt</base-button>
        </header>
      </base-card>
    </section>
    <section>
      <base-card>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCoach: [],
      error: null,
      isLoading: false
    };
  },
  methods: {
    async getData() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/LoadSpecificCoach');
      } catch (error) {
        this.error = error.message || 'Coś poszło nie tak!';
      }
      this.selectedCoach = this.$store.getters['coaches/coaches'].find((coach) => coach.id === this.id);
      if(typeof this.selectedCoach === 'undefined') {
        this.error = 'Coś poszło nie tak!';
        return;
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null
      this.$router.replace('/coaches');
    }
  },
computed: {
    checkRoutePath() {
      return this.$route.path === `/coaches/${this.id}/contact`;
    },
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    },
    contactLink() {
      return this.$route.path + '/contact';
    },
  },
   mounted() {
    this.getData();
  },
};
</script>