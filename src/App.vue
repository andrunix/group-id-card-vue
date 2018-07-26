<template>
<div id="app">
  
  <MemberForm v-if="false"/>
  
  <GroupForm v-if="true && !submitted"
             v-on:submit="submitted = true"/>
  
  <Confirmation v-if="submitted"/>
</div>
</template>

<script>
import MemberForm from './components/MemberForm.vue';
import GroupForm from './components/GroupForm.vue';
import Confirmation from './components/Group/Confirmation.vue';

export default {
  name: 'app',
  components: {
    MemberForm,
    GroupForm,
    Confirmation
  },
  data () {
    return {
      title: 'Print Temporary ID Card',
      submitted: false
    };
  },
  methods: {
  }
};
</script>

<style>
</style>
