<template>
<section class="main-banner-wrapper">
  <div class="main-banner-container">
    <div class="main-banner-text">
      <h1>Train<span>X</span>App</h1>
      <p class="main-banner-subtitle">Twoje miejsce na spersonalizowany trening i zdrowy styl życia</p>
      <a href="/auth"><div class="cta-button">Rozpocznij już dziś</div></a>
    </div>
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
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  background-image: url("@/assets/images/home-banner-img.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  .main-banner-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    padding: 0 32px;
    .main-banner-text {
      height: 100%;
      h1 {
        color: white;
        font-size: 64px;
        margin-bottom: 16px;
        span {
          color: $primary-color;
        }
      }
      .main-banner-subtitle {
        color: white;
        margin-bottom: 32px;
        font-size: 32px;
        margin-top: 0;
      }
    }
    a {
      text-decoration: none;
      .cta-button {
        background-color: transparent;
        padding: 16px;
        border: 1px solid white;
        color: white;
        margin-top: 16px;
        width: fit-content;
        transition: all .3s ease-in;
      }
      &:hover {
        .cta-button {
          color: $primary-color-darker;
          border-color: $primary-color-darker;
        }
      }
    }
  }
}
</style>