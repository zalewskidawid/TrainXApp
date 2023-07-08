<template>
  <header :class="{ 'scrolled': isScrolled }">
    <nav>
      <h2 class="header-home">
        <router-link to="/">Train<span>X</span>App</router-link>
      </h2>
      <ul>
        <li>
          <router-link to="/coaches">Trenerzy</router-link>
        </li>
        <li>
          <router-link to="/plans">Plany</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/requests">Wiadomości</router-link>
        </li>
        <li v-else>
          <router-link to="/auth">Logowanie</router-link>
        </li>
        <li v-if="isLoggedIn">
          <base-button @click="logout">Wyloguj się</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isScrolled: false
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/coaches');
    },
    handleScroll() {
        console.log(this.isScrolled);
        window.scrollY > 0 ? this.isScrolled = true : this.isScrolled = false;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
header {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  transition: all .3s ease-in;
}
header.scrolled {
  background-color: rgba(0,0,0,0.6);
  height: 72px;
}

header a {
  text-decoration: none;
  color: white;
  display: inline-block;
  padding: 16px 32px;
  border: 1px solid transparent;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 25px;
  &:hover {
    color: white;
  }
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid $primary-color;
  color: $primary-color-dark;
}

.header-home {
  margin: 0;
}

.header-home a {
  color: white;
  margin: 0;
  span {
    color: $primary-color;
  }
}

.header-home a:hover,
.header-home a:active,
.header-home a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>