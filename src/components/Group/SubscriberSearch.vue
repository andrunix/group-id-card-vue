<template>
<div id="member-search">
  <button id="subscriberSearch"
          class="btn btn-default"
          v-if="!showForm"
          @click.prevent="subscriberSearch">Subscriber Search</button>
  
  <div id="formdiv" v-if="showForm">
    <div v-if="showForm">
      <h1>Member Search {{searchByOption}}</h1>
    </div>
    <form id="subscriber-form">
      
      <input type="radio" name="searchOption" id="searchOptionSSN" value="ssn" v-model="searchByOption" />
      <label for="searchOptionSSN" class="control-label">SSN</label>
      <input type="text" id="ssn" name="ssn" v-model="ssn" :disabled="this.searchByOption !== 'ssn'">
      <input type="radio" name="searchOption" id="searchOptionName" value="name" v-model="searchByOption" />
      <label for="searchOptionSSN">Last name</label>
      <input type="text" name="lastname" id="lastname" v-model="lastName" :disabled="this.searchByOption === 'ssn'">
      <label for="firstname">First name</label>
      <input type="text" name="firstname" id="firstname" v-model="firstName" :disabled="this.searchByOption === 'ssn'">
      <label for="dob">Birth date</label>
      <input type="date" name="dob" id="dob" v-model="dob" :disabled="this.searchByOption === 'ssn'">
      <button name="search" id="search" @click.prevent="handleSearch">Search</button>
      <button name="cancel" id="cancel" @click.prevent="resetForm">Cancel</button>
    </form>
  </div>

  <div id="search-results" v-if="searchResults.length > 0">
    <h2>Search Results</h2>
  </div>
</div>
</template>

<script>
import api from './api';

export default {
  name: 'MemberSearch',
  props: {
  },
  data () {
    return {
      showForm: false,
      dob: '',
      firstName: '',
      lastName: '',
      ssn: '',
      searchByOption: 'ssn',
      searchResults: []
    };
  },
  methods: {
    async handleSearch () {
      // do search here
      const params = {
        firstName: this.firstName,
        lastName: this.lastName,
        ssn: this.ssn,
        dob: this.dob
      };
      this.searchResults = await api.subscriberSearch(params);
      this.showForm = this.searchResults.length > 0;
    },
    resetForm () {
      this.showForm = false;
      this.searchResults = [];
    },
    subscriberSearch () {
      this.showForm = true;
    }
  }
};
</script>


         
