<template>
<div id="subscriber-search">
  <button id="subscriberSearch"
          class="btn btn-default"
          :disabled="groupId === ''"
          v-if="!showForm"
          @click.prevent="subscriberSearch">Subscriber Search</button>
  
  <modal v-model="showForm" title="Subscriber Search" ref="modal" size="lg">
    <form class="form-horizontal" id="subscriber-form">
      <div class="row">
        <div class="form-group">
          <label for="searchOptionSSN" class="control-label col-sm-2">
            <!-- <input type="radio" name="searchOption" id="searchOptionSSN" value="ssn" v-model="searchByOption" /> -->
            SSN
          </label>
          <div class="col-sm-8">
            <input type="text" id="ssn" name="ssn" class="form-control" v-model="ssn"> <!--  :disabled="this.searchByOption !== 'ssn'" /> -->
          </div>
        </div>
        <div class="form-group">
          <label for="searchOptionSSN" class="control-label col-sm-2">
            <!-- <input type="radio" name="searchOption" id="searchOptionName" value="name" v-model="searchByOption" /> -->
            Last name
          </label>
          <div class="col-sm-8">
            <input type="text" name="lastname" id="lastname" class="form-control" v-model="lastName"> <!--  :disabled="this.searchByOption === 'ssn'"> -->
          </div>
        </div>
        <div class="form-group">
          <label for="firstname" class="control-label col-sm-2">First name</label>
          <div class="col-sm-8">
            <input type="text" name="firstname" id="firstname" class="form-control" v-model="firstName"> <!--  :disabled="this.searchByOption === 'ssn'"> -->
          </div>
        </div>
        <div class="form-group">
          <label for="dob" class="control-label col-sm-2">Birth date</label>
          <div class="col-sm-8">
            <input type="date" name="dob" id="dob" class="form-control" v-model="dob"> <!--  :disabled="this.searchByOption === 'ssn'"> -->
          </div>
        </div>
      </div>
    </form>
    <div slot="footer">
      <div class="col-sm-12">
        <button name="search" class="btn btn-primary" id="search" @click.prevent="handleSearch" :disabled="formInvalid()">Search</button>
        <button name="cancel" class="btn btn-cancel" id="cancel" @click.prevent="resetForm">Cancel</button>
      </div>
    </div>
  </modal>
  
  <div id="search-error" v-if="errorMessage !== ''">
    {{errorMessage}}
  </div>
</div>
</template>

<script>
import api from './api';
import { Modal } from 'uiv';

export default {
  name: 'MemberSearch',
  props: [ 'groupId' ],
  components: { Modal },
  data () {
    return {
      showForm: false,
      dob: '', // '08/06/1959',
      firstName: '', // 'Chris',
      lastName: '', //  'Hall',
      ssn: '', // '322244452',
      searchByOption: 'ssn',
      searchResults: [],
      errorMessage: ''
    };
  },
  methods: {
    formInvalid () {
      if (this.searchByOption === 'ssn' && this.ssn.length === 9) {
        return false;
      } else if (this.searchByOption !== 'ssn') {
        if (this.firstName !== '' && this.lastName !== '' /* && this.dob !== '' */) {
          return false;
        }
      }
      return true;
    },
    async handleSearch () {
      const params = {
        firstName: this.firstName,
        lastName: this.lastName,
        ssn: this.ssn,
        dob: this.dob
      };
      try {
        const results = await api.subscriberSearch(params);
        // this.searchResults = results.data;
        this.showForm = false;
        this.$emit('subscriber-search-complete', results.data);
      } catch (e) {
        this.errorMessage = 'No subscribers found';
      }
      // this.showForm = this.searchResults.length > 0;
    },
    resetForm () {
      this.showForm = false;
      this.dob = '';
      this.firstName = '';
      this.lastName = '';
      this.ssn = '';
      this.searchByOption = 'ssn';
    },
    subscriberSearch () {
      this.showForm = true;
    }
  }
};
</script>

<style>
#subscriber-search { display: inline; padding-left: 20px; }
</style>
