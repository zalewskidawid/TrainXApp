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
          <section>
            <h2>Twoja konwersacja</h2>
          </section>
          <section>
            <div class="message-container" v-for="(message,index) in this.selectedConversation.request" :key="index"
                 :class="{
    'right': message.messageAuthor === this.$store.getters.userId,
    'left': message.messageAuthor !== this.$store.getters.userId
  }">
              <div class="date-container">
                <span class="message-email">{{ message.messageAuthorEmail }}</span>
                <p class="message-date">{{message.date}}</p>
                <p class="message-time">{{message.time}}</p>
              </div>
              <p class="message-text">{{ message.messageText }}</p>
            </div>
            <form @submit.prevent="submitForm">
              <div class="form-control" :class="{invalid: !yourMessage.isValid}">
                <label for="firstname">Twoja wiadomość</label>
                <textarea
                    id="yourMessage"
                    v-model.trim="yourMessage.val"
                    @blur="clearValidity('yourMessage')"
                />
                <p class="invalid" v-if="!yourMessage.isValid">Twoja wiadomość nie może być pusta.</p>
              </div>
              <base-button mode="flat">Wyślij</base-button>
            </form>
          </section>
        </base-card>
      </section>
    </div>
  </div>
</template>

<script>
import BaseCard from "@/components/ui/BaseCard";

export default {
  name: "RequestDetail.vue",
  components: {BaseCard},
  data() {
    return {
      isLoading: false,
      error: null,
      selectedConversation: [],
      yourMessage: {
        val: '',
        isValid: true,
      },

    }
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.yourMessage.val === '') {
        this.yourMessage.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
      const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;

      const formData = {
        messageText: this.yourMessage.val,
        messageAuthorEmail: this.$store.getters.userEmail,
        messageAuthor: this.$store.getters.userId,
        conversationId: this.$route.params.id,
        date: formattedDate,
        time: formattedTime
      };
      this.$store.dispatch('requests/addMessage', formData);
      console.log(this.$store.getters['requests/requests'])
      this.yourMessage.val = '';
    },
    async getConversationData() {
      this.isLoading = true;
      if (this.$store.getters['requests/requests'].length === 0) {
        try {
          await this.$store.dispatch('requests/fetchRequests');
          this.selectedConversation = this.$store.getters['requests/requests'].find((request) => request.id === this.$route.params.id);
          console.log(this.selectedConversation)
        } catch (error) {
          this.error = error.message || 'Coś poszło nie tak!';
        }
      } else {
        this.selectedConversation = this.$store.getters['requests/requests'].find((request) => request.id === this.$route.params.id);
      }
      this.isLoading = false;
    }
  },
  created() {
    this.getConversationData();
  }
}
</script>

<style scoped lang="scss">
@import './src/assets/variables';
@import './src/assets/formFields';

h2 {
  text-align: center;
}

.message-email {
  font-size: 12px;
  font-weight: bold;
  padding-right: 8px;
}

.message-text {
  margin: 8px 0 0 0;
}

.message-container {
  width: 100%;
  border-bottom: 2px solid white;
  padding: 8px;
}
.message-container.right {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
}
.message-container.left {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.message-date, .message-time {
  font-size: 12px;
  margin: 0;
  width: fit-content;
}
.message-time {
  padding-left: 8px;
}
.date-container {
  display: flex;
}
.form-control {
  margin-top: 32px;
}

button.flat {
  margin-top: 16px;
}

.invalid label,
.invalid p {
  color: red;
}

.invalid input,
.invalid textarea, {
  border: 1px solid red;
}
</style>