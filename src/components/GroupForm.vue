<template>
<div id="group-id-form">
  <a href="#" id="form-toggle" @click.prevent="toggleForms">{{toggleMessage}}</a>
  <TemporaryCardForm v-if="showTemporaryCardForm" :groupList="groupList" @member-search="handleMemberSearch"/>
  <ReplacementCardForm v-if="showReplacementCardForm" :groupList="groupList" @member-search="handleMemberSearch"/>
</div>
</template>

<script>
import ReplacementCardForm from './Group/ReplacementCardForm.vue';
import TemporaryCardForm from './Group/TemporaryCardForm.vue';

const groupList = [
  {
    groupID: '100000',
    groupName: 'Blah blah group',
    subgroups: [
      { id: '0001', name: 'Blah Subgroup 1' },
      { id: '0002', name: 'Blah Subgroup 2' },
      { id: '0003', name: 'Blah Subgroup 3' }
    ]
  },
  {
    groupID: '100050',
    groupName: 'Blah d Blah Group',
    subgroups: [
      { id: '0001', name: 'Blah d Subgroup 1' },
      { id: '0002', name: 'Blah d Subgroup 2' },
      { id: '0003', name: 'Blah d Subgroup 3' }
    ]
  }
];

export default {
  name: 'GroupForm',
  props: [ ],
  components: { TemporaryCardForm, ReplacementCardForm },
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
    showReplacementCardForm: function () { return !this.showTemporaryCardForm; }
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
input[type="date"]::-webkit-inner-spin-button{display:none;}
</style>
