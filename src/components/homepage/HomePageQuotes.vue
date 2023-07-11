<template>
<section class="homepage-quotes-section-wrapper">
  <div class="homepage-quotes-section-container">
  <div class="homepage-quotes-section-wrapper-text-container">
    <h2 class="homepage-quotes-section-wrapper-text-container__title">
      Znajdź Motywację i Siłę do Zdrowego Trybu Życia!
    </h2>
    <p class="homepage-quotes-section-wrapper-text-container__subtitle">
      Odkryj inspirujące cytaty od największych postaci ze świata, które motywują do zdrowego trybu życia. Z TrainxApp znajdziesz siłę i determinację, by pokonać każde wyzwanie na drodze do sukcesu!
    </p>
  </div>
  <div class="homepage-quotes-section-wrapper-card-wrapper">
    <home-page-quotes-card>
      <template #title>
        Sukces jest zależny od działania, a nie od życzeń.
      </template>
      <template #default>Tony Robbins</template>
    </home-page-quotes-card>
    <home-page-quotes-card>
      <template #title>
        Twoje ciało jest jedynym miejscem, w którym musisz żyć. Zadbaj o nie.
      </template>
      <template #default>Jim Rohn</template>
    </home-page-quotes-card>
    <home-page-quotes-card>
      <template #title>
        Twoje ciało osiągnie to, czego umysł w nie włoży.
      </template>
      <template #default>Arnold Schwarzenegger</template>
    </home-page-quotes-card>
  </div>
  </div>
</section>
</template>

<script>

import HomePageQuotesCard from "@/components/homepage/HomePageQuotesCard";
export default {
  components: {HomePageQuotesCard}
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
.homepage-quotes-section-wrapper {
  height: auto;
  width: 100%;
  text-align: center;
  padding: 0 32px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  @media(max-width: 768px) {
    padding: 0 16px;
  }
  .homepage-quotes-section-container {
    max-width: 1600px;
    .homepage-quotes-section-wrapper-text-container {
      &__title {
        font-size: 36px;
        font-weight: bold;
        color: white;
        @media(max-width: 768px) {
          font-size: 26px;
        }
      }
      &__subtitle {
        font-size: 16px;
        color: $gray-color;
        @media(max-width: 768px) {
          font-size: 14px;
        }
      }
    }
    .homepage-quotes-section-wrapper-card-wrapper {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
}
</style>
