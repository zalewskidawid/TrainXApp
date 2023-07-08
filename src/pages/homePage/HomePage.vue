<template>
  <div class="main-homepage">
    <div class="homepage-first-sections-container">
      <TheMainBaner></TheMainBaner>
      <HomePageReasons></HomePageReasons>
    </div>
  </div>
</template>

<script>
import TheMainBaner from "@/components/homepage/TheMainBaner";
import HomePageReasons from "@/components/homepage/HomePageReasons.vue";
export default {
  components: {HomePageReasons, TheMainBaner}
}
</script>

<style lang="scss" scoped>
.homepage-first-sections-container {
  background: rgb(23,84,119);
  background: linear-gradient(180deg, rgba(23,84,119,1) 0%, rgba(9,34,48,1) 35%, rgba(0,0,0,1) 100%);
}
</style>