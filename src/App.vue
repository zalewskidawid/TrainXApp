<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
  <the-footer></the-footer>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheFooter from "@/components/layout/TheFooter";

export default {
  components: {
    TheFooter,
    TheHeader
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    }
  },
  created() {
    this.$store.dispatch('tryLogin');
  },
  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace('/coaches');
      }
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}
#app {
  background: rgb(23,84,119);
  background: linear-gradient(180deg, rgba(23,84,119,1) 0%, rgba(9,34,48,1) 35%, rgba(0,0,0,1) 100%);
}

html {
  font-family: "Nunito", sans-serif !important;
}

body {
  margin: 0;
}
.margin-top-page {
  padding-top: 100px;
  min-height: 100vh;
}
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

</style>