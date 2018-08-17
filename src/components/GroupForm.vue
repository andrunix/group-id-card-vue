<template>
<div id="group-id-form">
  <h1>{{title}}</h1>
  <FormToggle on-message="Or order Replacement ID Cards"
              off-message="Or print Temporary ID Cards"
              default="on"
              v-on:toggle-forms="showTemporaryCardForm = !showTemporaryCardForm"/>
  
  <TemporaryCardForm v-if="showTemporaryCardForm"
                     :groupList="groupList"
                     @member-search="handleMemberSearch"/>
  
  <ReplacementCardForm v-if="showReplacementCardForm" :groupList="groupList" @member-search="handleMemberSearch"/>
</div>
</template>

<script>
import FormToggle from './FormToggle.vue';
import ReplacementCardForm from './Group/ReplacementCardForm.vue';
import TemporaryCardForm from './Group/TemporaryCardForm.vue';

import groupList from './groupList';

export default {
  name: 'GroupForm',
  props: [ ],
  components: { FormToggle, TemporaryCardForm, ReplacementCardForm },
  data () {
    return {
      showTemporaryCardForm: true,
      groupList
    };
  },
  computed: {
    toggleMessage: function () {
      return this.showTemporaryCardForm ? 'Or order Replacement ID Cards' : 'Or print temporary ID Cards';
    },
    showReplacementCardForm: function () { return !this.showTemporaryCardForm; },
    title () { return this.showTemporaryCardForm ? 'Print Temporary ID Cards' : 'Order Replacement ID Cards'; }
  },
  methods: {
    handleMemberSearch (params) {
    },
    toggleForms () {
      this.showTemporaryCardForm = !this.showTemporaryCardForm;
    }
  }
};
</script>

<style>
#group-id-form h1 { display: inline }
input[type="date"]::-webkit-inner-spin-button{display:none;}
</style>
