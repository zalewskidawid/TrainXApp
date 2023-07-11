<template>
  <footer class="footer-wrapper">
    <div class="footer-wrapper-container">
    <router-link to="/" class="footer-wrapper-container__title">Train<span>X</span>App</router-link>
    <div class="footer-content-container">
      <p class="footer-content-container__text">@2023 Dawid Zalewski</p>
      <div class="footer-content-icons-container">
        <a href="https://www.linkedin.com/in/dawidzalewski-1/" target="_blank">
          <font-awesome-icon icon="fa-brands fa-github"></font-awesome-icon>
        </a>
        <a href="https://github.com/zalewskidawid" target="_blank">
          <font-awesome-icon icon="fa-brands fa-linkedin" />
        </a>
      </div>
    </div>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
.footer-wrapper {
  padding: 32px 32px 0 32px;
  background: black;
  .footer-wrapper-container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 32px;
    @media(max-width: 768px) {
      padding: 0 16px;
    }
    a {
      text-decoration: none;
      color: white;
      display: inline-block;
      border: 1px solid transparent;
      text-transform: uppercase;
      font-weight: bold;
      border-radius: 25px;
      font-size: 1.5rem;
      span {
        color: $primary-color;
      }
      &:hover {
        color: white;
      }
    }
    .footer-content-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      &__text {
        color: white;
      }
      a {
        &:first-of-type {
          margin-right: 16px;
        }
      }
      svg {
        color: white;
        font-size: 22px;
        transition: .3s all ease-in;
        cursor: pointer;
        &:hover {
          color: $primary-color;
        }
      }
    }
  }

}
</style>