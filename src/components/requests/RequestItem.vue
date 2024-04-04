<template>
  <li :class="{newMessage: newMessage && !compareUserRecipient }">
    <div v-if="getUserType === 'trainer'">
      <span>Konwersacja z: </span><p class="user-data">{{ userData }}</p>
    </div>
    <div v-else>
      <span>Konwersacja z: </span><p class="user-data">{{ coachData }}</p>
    </div>
    <p v-if="newMessage && !compareUserRecipient" class="new-message-text">Nowa wiadomość !!!: <span>{{ request }}</span></p>
    <p v-else>{{ request }}</p>
    <base-button mode="flat" link :to="conversationLink">Wyświetl</base-button>
  </li>
</template>

<script>
import BaseButton from "@/components/ui/BaseButton";
export default {
  components: {BaseButton},
  props: ['email', 'request', 'id', 'coachData', 'userData', 'newMessage', 'messageAuthor'],
  computed: {
    emailLink() {
      return this.getUserType === 'trainer' ? 'mailto:' + this.email : 'mailto:' + this.coachEmail;
    },
    conversationLink() {
      return this.$route.path + '/' + this.id;
    },
    getUserType() {
      return this.$store.getters.userType;
    },
    compareUserRecipient() {
      return this.messageAuthor === this.$store.getters['userId']
    }
  },
  created() {
    console.log(this.userData)
  }
}
</script>

<style scoped lang="scss">
@import './src/assets/variables';
@import './src/assets/formFields';

li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  border: 0;
  padding: 0;
}
a.flat {
  border: 1px solid $primary-color;
  padding: 0.75rem 1.5rem;
  margin-top: 16px;
  &:hover {
    background: $primary-color-darker;
    border-color: $primary-color-darker;
  }
}
a:hover,
a:active {
  background-color: transparent;
}

p {
  margin: 0.5rem 0 0 0;
}
.user-data {
  display: inline;
  font-weight: bold;
}
.newMessage {
  border: 2px solid #ccc;
  position: relative;
  &:after {
    content:'';
    position: absolute;
    right: -5px;
    top: -10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border:1px solid black;
    background-color: red;
  }
}
.new-message-text {
  span {
    font-weight: bold;
  }
}
</style>