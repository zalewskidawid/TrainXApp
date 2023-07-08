<template>
  <section class="homepage-reasons-wrapper">
    <div class="homepage-reasons-text-container">
      <h2 class="homepage-reasons-text-container__title">
        Odkryj moc zdrowego trybu życia z TrainXApp!
      </h2>
      <p class="homepage-reasons-text-container__subtitle">
        Witaj w TrainXApp - Twoim wsparciu w drodze do zdrowego i aktywnego trybu życia. Czasami, aby zobaczyć prawdziwą
        zmianę, musisz podjąć decyzję o wprowadzeniu zdrowych nawyków. Oto dlaczego warto zacząć prowadzić zdrowy tryb
        życia:
      </p>
    </div>
    <div class="homepage-reasons-card-wrapper">
      <home-page-reasons-card>
        <template v-slot:title>Poprawa kondycji fizycznej</template>
        Zdrowy tryb życia to klucz do utrzymania dobrej kondycji fizycznej. Regularna aktywność fizyczna pomaga wzmocnić mięśnie, zwiększa wytrzymałość i poprawia ogólną sprawność organizmu. Dzięki TrainXApp możesz odkryć różnorodne treningi i aktywności, które pomogą Ci osiągnąć swoje cele fitness.
      </home-page-reasons-card>
      <home-page-reasons-card>
        <template v-slot:title>Zwiększenie poziomu energii</template>
        Regularna aktywność fizyczna i zdrowa dieta mają ogromny wpływ na Twoje samopoczucie. Prowadzenie zdrowego trybu życia pomaga zwiększyć poziom energii, poprawia koncentrację i redukuje stres. Dzięki TrainXApp możesz znaleźć inspirujące treningi, które pobudzą Twoje ciało i umysł.
      </home-page-reasons-card>
      <home-page-reasons-card>
        <template v-slot:title>Poprawa samopoczucia psychicznegoj</template>
        Badania wykazują, że aktywność fizyczna ma korzystny wpływ na zdrowie psychiczne. Regularne ćwiczenia pomagają w redukcji stresu, lęku i depresji, a także poprawiają samopoczucie i poczucie własnej wartości. TrainXApp oferuje szeroki wybór treningów i programów, które wspierają Twój dobrostan psychiczny.
      </home-page-reasons-card>
      <home-page-reasons-card>
        <template v-slot:title>Kontrola wagi</template>
        Zdrowy tryb życia jest kluczowy dla utrzymania prawidłowej wagi. Regularna aktywność fizyczna w połączeniu z właściwym odżywianiem pozwala efektywnie kontrolować wagę. TrainXApp oferuje specjalne programy i porady żywieniowe, które pomogą Ci osiągnąć i utrzymać swoje cele wagowe.
      </home-page-reasons-card>
      <home-page-reasons-card>
        <template v-slot:title>Zdrowe serce i układ krążenia</template>
        Zdrowy tryb życia przyczynia się do dobrego stanu serca i układu krążenia. Regularne ćwiczenia wzmacniają serce, obniżają ciśnienie krwi i redukują ryzyko chorób serca. Dzięki TrainXApp możesz znaleźć treningi kardio, które pomogą Ci zadbać o swoje serce.
      </home-page-reasons-card>
      <home-page-reasons-card>
        <template v-slot:title>Długoterminowe korzyści dla zdrowia</template>
        Prowadzenie zdrowego trybu życia to inwestycja w swoje zdrowie na długą metę. Regularna aktywność fizyczna, zdrowa dieta i dbanie o siebie przynoszą wiele korzyści, takich jak redukcja ryzyka chorób, poprawa jakości snu i dłuższe życie. TrainXApp jest Twoim wsparciem w realizacji długoterminowych celów zdrowotnych.
      </home-page-reasons-card>
    </div>
  </section>
</template>

<script>
import HomePageReasonsCard from "@/components/homepage/HomePageReasonsCard";
export default {
  components: {HomePageReasonsCard}
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
.homepage-reasons-wrapper {
  height: auto;
  width: 100%;
  background: transparent;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 32px;

  .homepage-reasons-text-container {
    max-width: 1200px;
    &__title {
      color: white;
      text-align: center;
      font-size: 36px;
    }

    &__subtitle {
      font-size: 16px;
      color: $gray-color;
      text-align: center;
    }
  }
  .homepage-reasons-card-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>