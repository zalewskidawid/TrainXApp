<template>
<section class="main-banner-wrapper">
  <div class="main-banner-container">
    <div class="main-banner-text">
      <h1>Train<span>X</span>App</h1>
      <p class="main-banner-subtitle">Twoje miejsce na spersonalizowany trening i zdrowy styl życia</p>
      <a href="/auth"><div class="cta-button">Rozpocznij już dziś</div></a>
    </div>
    <img :src="require('@/assets/images/homepage-banner-img.png')" alt="homepage-banner-img" class="main-banner-container__img">
  </div>
</section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
.main-banner-wrapper {
  height: 100vh;
  width: 100%;
  max-width: 1600px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  background: transparent;
  .main-banner-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: auto;
    padding: 0 32px;
    width: 100%;
    @media(max-width: 850px) {
      flex-direction: column;
    }
    @media(max-width: 768px) {
      padding: 0 16px;
    }
    .main-banner-text {
      height: 100%;
      @media(max-width: 850px) {
        margin-bottom: 32px;
      }
      h1 {
        color: white;
        font-size: 64px;
        margin-bottom: 16px;
        @media(max-width: 768px) {
          font-size: 48px;
        }
        span {
          color: $primary-color;
        }
      }
      .main-banner-subtitle {
        color: white;
        margin-bottom: 32px;
        font-size: 32px;
        margin-top: 0;
        @media(max-width: 768px) {
          font-size: 24px;
        }
      }
    }
    a {
      display: block;
      text-decoration: none;
      width: fit-content;
      border: 0;
      margin-top: 16px;
      padding: 0;
      .cta-button {
        background-color: transparent;
        padding: 16px;
        border: 1px solid white;
        color: white;
        width: fit-content;
        transition: all .3s ease-in;
        border-radius: 25px;
      }
      &:hover {
        background-color: transparent;
        .cta-button {
          border-color: $primary-color;
        }
      }
    }
    &__img {
      max-width: 300px;
    }
  }
}
</style>