<template>
  <div class="margin-top-page">
    <base-dialog :show="!!error" title="Coś poszło nie tak" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <div v-if="isLoading">
    <base-spinner></base-spinner>
    </div>
    <div v-else>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>{{ rate }}zł/h</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <p>{{ description }}</p>
      </base-card>
    </section>
    <div v-if="isLoggedIn">
      <section v-if="!this.hasConversation && getUserType !== 'trainer'">
        <base-card>
          <header>
            <h2>Zainteresowany? Napisz do mnie!</h2>
            <contact-coach :coach-email ="this.selectedCoach.email" :coach-first-name="this.selectedCoach.firstName" :coach-last-name="this.selectedCoach.lastName"></contact-coach>
          </header>
        </base-card>
      </section>
        <section v-else-if="this.hasConversation && getUserType !== 'trainer'">
          <base-card>
            <h4 class="conversation-text">
              Masz już konwersację z tym trenerem. <a :href="requestUrl"><span>Przejdź do konwersacji</span></a>
            </h4>
          </base-card>
        </section>
        <section v-else>
          <base-card>
            <h4 class="conversation-text">
             Jako trener nie możesz kontaktować się z trenerami.
            </h4>
          </base-card>
        </section>
    </div>
    </div>
  </div>
</template>
<style scoped lang="scss">

@import './src/assets/variables';
@import './src/assets/formFields';

.conversation-text {
  a {
    margin-top: 16px;
    margin-left: 10px;
  }
}
form {
  padding: 0;
  margin: 0;
}
</style>
<script>
import ContactCoach from "@/pages/requests/ContactCoach.vue";
import BaseCard from "@/components/ui/BaseCard";

export default {
  components: {BaseCard, ContactCoach},
  props: ['id'],
  data() {
    return {
      selectedCoach: [],
      hasConversation: false,
      error: null,
      isLoading: false,
    };
  },
  methods: {
    async getData() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/LoadSpecificCoach');
        await this.$store.dispatch('requests/checkConversation', {
          trainerId: this.$route.params.id,
          userId: this.$store.getters.userId
        });
        this.hasConversation = this.$store.getters['requests/hasConversation'];
        if (this.$store.getters['requests/requests'].length === 0) {
          await this.$store.dispatch('requests/fetchRequests');
        }
        this.hasConversation = this.$store.getters['requests/requests']
            .some(request => request.userIdAddress === this.$store.getters.userId &&
                request.userIdRecipient === this.$route.params.id);
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
    isLoggedIn() {
      return this.$store.getters.userType !== ""
    },
  getUserType() {
    return this.$store.getters.userType;
  },
  requestUrl() {
      const userId = this.$store.getters.userId;
    const trainerId = this.$route.params.id;

    return `/requests/${userId}${trainerId}`;
  }
  },
   mounted() {
    this.getData();
  },
};
</script>