<template>
  <header :class="{ 'scrolled': isScrolled, 'menu-active': isMenuActive }" ref="header" >
    <nav>
      <h2 class="header-home">
        <router-link class="menu-logo" to="/">Train<span>X</span>App</router-link>
      </h2>
      <ul class="menu-desktop">
        <li>
          <router-link class="menu-item" to="/coaches">Trenerzy</router-link>
        </li>
        <li>
          <router-link class="menu-item" to="/plans">Plany</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link class="menu-item" :class="{ newmessage: isNewMessage }" to="/requests">Wiadomości</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link class="menu-item" to="/myProfile">Mój profil</router-link>
        </li>
        <li v-else>
          <router-link class="menu-item" to="/auth">Logowanie</router-link>
        </li>
        <li v-if="isLoggedIn">
          <base-button @click="logout" mode="flat">WYLOGUJ SIĘ</base-button>
        </li>
      </ul>
      <div class="menu-hamburger" @click="menuStatusChange">
        <div class="menu-hamburger__line line-1"></div>
        <div class="menu-hamburger__line line-2"></div>
        <div class="menu-hamburger__line line-3"></div>
      </div>
      <ul class="menu-mobile">
        <li>
          <router-link class="menu-item" to="/coaches" @click="disableMenu">Trenerzy</router-link>
        </li>
        <li>
          <router-link class="menu-item" to="/plans" @click="disableMenu">Plany</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link class="menu-item" to="/requests" @click="disableMenu">Wiadomości</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link class="menu-item" to="/myProfile" @click="disableMenu">Mój profil</router-link>
        </li>
        <li v-else>
          <router-link class="menu-item" to="/auth" @click="disableMenu">Logowanie</router-link>
        </li>
        <li v-if="isLoggedIn">
          <base-button @click="logout">WYLOGUJ SIĘ</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isScrolled: false,
      isMenuActive: false,
      isComponentReady: false

    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isNewMessage() {
      const requests = this.$store.getters['requests/requests'];
      const hasMessageWithTrueStatus = requests.some(request => request.messageStatus === true);

      if (hasMessageWithTrueStatus) {
        const lastRequest = requests.find(request => request.messageStatus === true);
        if (lastRequest && lastRequest.request) {
          const keys = Object.keys(lastRequest.request);
          const lastMessageKey = keys[keys.length - 1];
          const lastMessage = lastRequest.request[lastMessageKey];
          return lastMessage && lastMessage.messageAuthor !== this.$store.getters.userId;
        }
      }
      return false;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/coaches');
      this.isMenuActive = false;
    },
    handleScroll() {
        window.scrollY > 0 ? this.isScrolled = true : this.isScrolled = false;
    },
    menuStatusChange() {
      this.isMenuActive = !this.isMenuActive;
    },
    disableMenu() {
      this.isMenuActive = false;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  async created() {
    if (this.$store.getters['requests/requests'].length === 0) {
      try {
        await this.$store.dispatch('requests/fetchRequests');
      } catch (error) {
        console.error('Błąd podczas pobierania danych z serwera:', error);
      }
    }
    this.isComponentReady = true;
  }
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
  z-index: 999;
  transition: all .3s ease-in;
  padding-left: 32px;
  @media(max-width: 768px) {
    padding-left: 16px;
  }
}
header.scrolled {
  background-color: rgba(0,0,0,0.6);
  height: 72px;
}
header .newmessage {
  position: relative;
  &:after {
    content:'';
    position: absolute;
    right: 0;
    top: -5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border:1px solid black;
    background-color: red;
  }
}
header a.menu-item, button {
  text-decoration: none;
  color: white;
  display: inline-block;
  padding: 12px 20px;
  border: 1px solid $primary-color;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 25px;
  text-align: center;
  &:hover {
    color: white;
    background-color: $primary-color-darker
  }
  @media(max-width: 1000px) {
    font-size: 14px;
    padding: 8px 16px;
  }
}
header a.menu-logo {
  text-decoration: none;
  text-transform: uppercase;
  border: unset;
  &:hover {
    border: unset;
    background-color: transparent;
  }
}

a.menu-item:active,
a.menu-item:hover,
a.menu-item.router-link-active {
  border: 1px solid $primary-color;
  color: white;
  background-color: $primary-color-darker
}

.header-home {
  margin: 0;
  z-index: 1;
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
  max-width: 1600px;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s ease-in all;
}
header .menu-desktop {
  display: none;
  @media(min-width:769px) {
    display: flex;
  }
}
header .menu-mobile {
  display: none;
  @media(max-width: 768px) {
    display: flex;
    position: absolute;
    flex-direction: column;
    justify-content: flex-start;
    top:0;
    background-color: black;
    padding: 128px 0 64px 0;
    width: 100%;
    height: 100vh;
    right: -110vw;
    li {
      margin: 16px 0;
      a.menu-item,
      a.menu-item:active,
      a.menu-item:hover,
      a.menu-item.router-link-active,
      button{
        border: 0;
        background-color: transparent;
      }
      a.menu-item,
      button{
        padding: 0;
      }
      a.menu-item:active,
      a.menu-item:hover,
      a.menu-item.router-link-active,
      button:hover,
      button:active {
        color: $primary-color;
      }
    }
  }
}
header.menu-active ul {
  right: 0;
}
li {
  margin: 0 0.5rem;
}
header .menu-hamburger {
  margin-right: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 24px;
  position: relative;
  width: 25px;
  z-index: 1;
  &__line {
    background: white;
    height: 3px;
    width: 25px;
    position: absolute;
    transition: 0.3s ease-in all;
    top: 0;
  }
  .line-2, .line-3 {
    position: absolute;
    content: '';
    top: 10px;
    background: white;
    height: 3px;
    width: 25px;
  }
  .line-3 {
    top: 20px;
  }
  @media(min-width: 769px) {
    display: none;
  }
}
header.menu-active .menu-hamburger {
  .line-1 {
    transform: rotate(45deg);
    top: 10px;
  }
  .line-3 {
    transform: rotate(-45deg);
    top: 10px;
  }
  .line-2 {
    opacity: 0;
  }
}

</style>