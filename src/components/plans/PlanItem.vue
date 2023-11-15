<template>
  <li>
    <div class="plan-information-wrapper">
      <div class="plan-information-plan-details-container">
        <p>Tytuł planu: {{ planName }}</p>
        <p>Opis planu: {{ planDescription }}</p>
      </div>
      <div class="plan-people-container">
        <div v-if="plansType === 'clientsPlans'" class="plan-information-plan-recipient-container">
          <p>Podopieczny: <span>{{planFirstName}}</span><span>{{planLastName}}</span></p>
        </div>
        <div class="plan-information-plan-creator" v-if="planCreatorData !== '' && planCreatorDisplay === 'Yes'">
          <p>Twórca: <span>{{planCreatorData}}</span></p>
        </div>
      </div>
    </div>
    <div class="actions">
      <base-button link :to="planDetailsLink">Szczegóły</base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['planName', 'planDescription', 'id', 'planFirstName', 'planLastName', 'plansType', 'planCreatorData', 'planCreatorDisplay'],
  computed: {
    planDetailsLink() {
      return this.$route.path + '/' + this.id;
    },
  },
}
</script>

<style scoped lang="scss">
li {
  margin: 1rem 0;
  border: 1px solid rgba(255,255,255,1);
  border-radius: 12px;
  padding: 1rem;
  list-style-type: none;
  color: white;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
.plan-information-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  span {
    padding-left: 8px;
  }
  .plan-information-plan-details-container {
    margin-right: 32px;
  }
  .plan-people-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    p {
      margin: 0;
    }
  }
}
</style>