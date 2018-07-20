<template>
<div id="group-id-form">
  <TemporaryCardForm v-if="showTemporaryCardForm"/>
  <ReplacementCardForm v-if="showReplacementCardForm" :groupList="groupList" @member-search="handleMemberSearch"/>
</div>
</template>

<script>
import ReplacementCardForm from './Group/ReplacementCardForm.vue';
import TemporaryCardForm from './Group/temporary-card-form.vue';

const groupList = [
  { groupId: '100000', groupName: 'Blah blah group' },
  { groupId: '100050', groupName: 'Blah d Blah Group' }
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
    showReplacementCardForm: function () { return !this.showTemporaryCardForm; }
  },
  methods: {
    handleMemberSearch (params) {
      console.log('handleMemberSearch ', params);
    }
  }
};
</script>

<style>
input[type="date"]::-webkit-inner-spin-button{display:none;}
</style>
