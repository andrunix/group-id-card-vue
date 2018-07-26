<template>
<div id="member-id-form">
  <TemporaryCardForm v-if="!orderSubmitted"/>
  <FormToggle on-message="Or click to order Replacement ID Cards"
              off-message=""
              default="on"
              v-on:toggle-forms="showTemporaryCardForm = !showTemporaryCardForm && !orderSubmitted"/>

  <ReplacementCardForm v-if="!showTemporaryCardForm && !orderSubmitted"
                       v-on:order-submitted="handleOrderSubmitted"/>
  <OrderConfirmation v-if="orderSubmitted" />
</div>
</template>

<script>
import ReplacementCardForm from './Member/ReplacementCardForm.vue';
import TemporaryCardForm from './Member/TemporaryCardForm.vue';
import FormToggle from './FormToggle.vue';
import OrderConfirmation from './Member/OrderConfirmation.vue';

export default {
  name: 'MemberForm',
  components: { ReplacementCardForm, TemporaryCardForm, OrderConfirmation, FormToggle },
  data () {
    return {
      showTemporaryCardForm: true,
      orderSubmitted: false
    };
  },
  methods: {
    handleOrderSubmitted: function () {
      this.orderSubmitted = true;
    }
  }
};
</script>

<style>
input[type="date"]::-webkit-inner-spin-button{display:none;}
</style>
