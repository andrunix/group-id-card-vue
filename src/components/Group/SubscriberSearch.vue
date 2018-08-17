<template>
<div id="subscriber-search">
  <button id="subscriberSearch"
          class="btn btn-default"
          :disabled="groupId === ''"
          v-if="!showForm"
          @click.prevent="subscriberSearch">Search</button>
  
  <modal v-model="showForm" title="Subscriber Search" ref="modal" size="lg">
    
    <p>
      Search for a subscriber either by SSN or Name and Birth Date.
    </p>
    <alert type="warning" v-if="errorMessage" dismissible  @dismissed="errorMessage=''">{{errorMessage}}</alert>

    <!-- <div class="container"> -->
      <form class="form-horizontal" id="subscriber-form">
        <div class="row">
          <div class="form-group">
            <label for="searchOptionSSN" class="control-label col-sm-2">
              SSN
            </label>
            <div class="col-sm-8">
              <input type="text" id="ssn" name="ssn" class="form-control" v-model="ssn" placeholer="###-##-####" :disabled="searchByName" />
            </div>
          </div>
          <div class="form-group">
            <label for="searchOptionSSN" class="control-label col-sm-2">
              Last name
            </label>
            <div class="col-sm-8">
              <input type="text" name="lastname" id="lastname" class="form-control" v-model="lastName" :disabled="searchBySSN">
            </div>
          </div>
          <div class="form-group">
            <label for="firstname" class="control-label col-sm-2">First name</label>
            <div class="col-sm-8">
              <input type="text" name="firstname" id="firstname" class="form-control" v-model="firstName" :disabled="searchBySSN">
            </div>
          </div>
          
          <div class="form-group">
            <label for="dob" class="control-label col-sm-2">Birth date</label>
            
            <div class="col-sm-8">
              <dropdown> <!-- class="form-group"> -->
                <div class="input-group">
                  <input class="form-control" type="text" v-model="dob" :disabled="searchBySSN">
                  <div class="input-group-btn">
                    <btn class="dropdown-toggle" :disabled="searchBySSN"><i class="glyphicon glyphicon-calendar"></i></btn>
                  </div>
                </div>
                <template slot="dropdown">
                  <li>
                    <date-picker :limit-to="today" format="MM/dd/yyyy" v-model="dob"/>
                  </li>
                </template>
              </dropdown>
              
              <!-- <input type="date" name="dob" id="dob" class="form-control" v-model="dob"> --> 
            </div>
          </div>
          
      </div>
    </form>
    <!-- </div> -->
    <div slot="footer">
      <div class="col-sm-12">
        <button name="search" class="btn btn-primary" id="search" @click.prevent="handleSearch" :disabled="formInvalid()">Search</button>
        <button name="cancel" class="btn btn-cancel" id="cancel" @click.prevent="resetForm">Cancel</button>
      </div>
    </div>
  </modal>
  
</div>
</template>

<script>
import { subscriberSearch } from './api';
import { Alert, Modal, Btn, DatePicker, Dropdown } from 'uiv';
import moment from 'moment';

export default {
  name: 'SubscriberSearch',
  props: [ 'groupId' ],
  components: { Alert, Modal, Btn, DatePicker, Dropdown },
  data () {
    return {
      showForm: false,
      dob: '', // '08/06/1959',
      firstName: '', // 'Chris',
      lastName: '', //  'Hall',
      ssn: '', // '322244452',
      searchResults: [],
      errorMessage: ''
    };
  },
  computed: {
    today () { return new Date() },
    searchBySSN () { return this.ssn.length !== 0 },
    searchByName () { return this.firstName.length !== 0 || this.lastName.length !== 0 }
  },
  methods: {
    formInvalid () {
      if (this.ssn.length === 9 ||
          (this.firstName !== '' && this.lastName !== '' && (moment(this.dob).isValid()))
         ) {
        return false;
      }
      return true;
    },
    async handleSearch () {
      let params = {};
      if (this.ssn.length === 9) {
        params.ssn = this.ssn;
      }
      else {
        params = {
          grpid: this.groupId,
          firstname: this.firstName,
          lastname: this.lastName,
          dob: moment(this.dob).format('MM-DD-YYYY')
        };
      }
      try {
        const results = await subscriberSearch(params);
        console.log('we got results: ', results);
        this.showForm = false;
        this.$emit('subscriber-search-complete', results.data.results);
      } catch (e) {
        console.log('error!', e);
        this.errorMessage = 'No matching subscribers found.';
      }
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
#subscriber-search { display: inline }
</style>
