<template>
<div id="temporary-cards">
  
  <div>Temporary ID cards can be produced for a Group, Subgroup, Department, or Subscriber</div>

  <LoadingIndicator :is-loading="isLoading" />

  <div class="errors" id="errors" v-if="errors.length > 0">
    <ul>
      <li v-for="e in errors">{{e}}</li>
    </ul>
  </div>

	<form class="form-horizontal"
        id="downloadTempCard"
        name="downloadTempCard"
        target="_blank">

    <div class="container">
      <div class="row">
        
	      <div class="form-group">
	        <label for="effectiveDate"
                 class="col-sm-2 control-label required">
	          Benefit Effective Date
	        </label>
          
	        <div class="col-sm-10">
            <dropdown> <!--  class="form-group"> -->
              <div class="input-group">
                <input class="form-control" type="text" v-model="formData.effectiveDate">
                <div class="input-group-btn">
                  <btn class="dropdown-toggle"><i class="glyphicon glyphicon-calendar"></i></btn>
                </div>
              </div>
              <template slot="dropdown">
                <li>
                  <date-picker :limit-from="today" format="MM/dd/yyyy" v-model="formData.effectiveDate"/>
                </li>
              </template>
            </dropdown>
			    </div>
		    </div>

        
        <div class="form-group">
          <!-- Group Select -->
          <label for="groupid" class="col-sm-2 control-label required">Group</label>
          <div class="col-sm-10">
            <select id="groupid" name="groupid" class="form-control" v-model="formData.groupID" @change="groupChanged">
              <option value="">-Select group-</option>
              <option v-for="g in groupList" v-bind:value="g.groupID">{{g.groupID}} - {{g.groupName}}</option>
            </select>
          </div>
        </div>
        
		    <div class="form-group">
			    <label for="subgroupid" class="col-sm-2 control-label">Subgroup</label>
          <div class="col-sm-10">
			      <select id="subgroupid"
			    	        type="text"
                    class="form-control"
                    v-model="formData.subgroupID"
                    :disabled="formData.groupID === ''">
              <option v-for="s in subgroups" v-bind:value="s.id">{{s.id}} - {{s.name}}</option>
            </select>
		      </div>
		    </div>
        
		    <div class="form-group">
			    <label for="departmentid" class="col-sm-2 control-label">
				    Department
			    </label>
          <div class="col-sm-4">
            <input id="departmentid" 
			    	       type="text"
                   class="form-control"
                   v-model="formData.departmentID" />
          </div>
        </div>
        
		    <div class="form-group">
			    <label for="subscriberid" class="col-sm-2 control-label">
				    Subscriber
			    </label>
          <div class="col-sm-8">
            <input id="subscriberid" 
			    	       type="text"
                   class="form-control"
                   v-model="formData.subscriberID" />
          </div>
          <div class="col-sm-2">
            <SubscriberSearch v-on:subscriber-search-complete="handleSearchComplete"
                              :group-id="formData.groupID" />
		      </div>
		    </div>
        
        <div class="form-group">
          <div class="col-sm-10 col-sm-offset-2 pull-right">
            <button id="submit" class="btn btn-primary"
                    @click.prevent="submitForm"
                  :disabled="formInvalid() || submitted">Submit</button>
        </div>
      </div>

      <SubscriberSearchResults
        :showModal="showResultsModal"
        :search-results="searchResults"
        v-on:subscriber-selected="handleSubscriberSelected"
        v-on:subscriber-search-cancel="handleCancel"/>

    </div>
    </div>
	</form>

  </div>
</template>

<script>
import moment from 'moment';
import { Alert, Btn, DatePicker, Dropdown } from 'uiv';
import LoadingIndicator from '../LoadingIndicator.vue';
import SubscriberSearch from './SubscriberSearch.vue';
import SubscriberSearchResults from './SubscriberSearchResults.vue';
import { getTempCardPdf } from './api';

export default {
  name: 'TemporaryCardForm',
  props: [ 'groupList' ],
  components: {
    Alert,
    Btn,
    DatePicker,
    Dropdown,
    SubscriberSearch,
    SubscriberSearchResults,
    LoadingIndicator
  },
  data () {
    return {
      title: 'Print Temporary ID Cards',
      errors: [],
      subgroups: [],
      idcard: '',
      isLoading: false,
      submitted: false,
      formData: {
        groupID: '',
        subgroupID: '',
        departmentID: '',
        subscriberID: '',
        effectiveDate: moment().format('MM/DD/YYYY')
      },
      searchResults: [],
      showResultsModal: false
    };
  },
  computed: {
    formValid: function (e) {
      return this.formData.groupID.trim() !== '' &&
        this.formData.effectiveDate.trim() !== '';
    },
    today () { return new Date() }
  },
  methods: {
    groupChanged () {
      const val = this.formData.groupID;
      const grp = this.groupList.find(g => g.groupID === val);
      this.subgroups = typeof grp !== 'undefined' ? grp.subgroups : [];
      // Reset the subgroup id
      this.formData.subgroupID = '';
      this.formData.subscriberID = '';
    },
    checkForm: function (e) {
      this.errors = [];
      if (this.formData.groupID.trim() === '') {
        this.errors.push('Group ID is required');
      }
      if (this.formData.effectiveDate.trim() === '') {
        this.errors.push('Benefit effective date is required');
      }
      if (!this.errors.length) {
        return true;
      }
      e.preventDefault();
    },
    formInvalid () {
      if (this.formData.groupID.trim() !== '' && this.formData.effectiveDate.trim() !== '') {
        return false;
      }
      return true;
    },
    subscriberSearch () {
      this.$emit('subscriber-search');
    },
    handleSubscriberSelected (id) {
      this.searchResults = [];
      this.showResultsModal = false;
      this.formData.subscriberID = id;
    },
    handleSearchComplete (results) {
      this.searchResults = results;
      this.showResultsModal = results.length > 0;
    },
    handleCancel () {
      this.searchResults = [];
      this.showResultsModal = false;
    },
    submitForm: async function () {
      this.isLoading = true;
      this.submitted = true;
      this.$emit('form-submitted');
      // TODO: pass the required parameters to the service
      const params = {};
      try {
        const resp = await getTempCardPdf(params);
        // Downloading/Opening the PDF directly. Refer to this:
        // https://github.com/kennethjiang/js-file-download/blob/master/file-download.js
        // The response is the raw PDF. Construct a Blob from it.
        let blob = new Blob([resp], { type: 'application/pdf' });
        // this is for IE...
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(blob, 'idcard.pdf');
        } else {
          var blobURL = window.URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.style.display = 'none';
          a.href = blobURL;
          a.setAttribute('download', 'idcard.pdf');
          // Safari thinks _blank anchor are pop ups. We only want to set _blank
          // target if the browser does not support the HTML5 download attribute.
          // This allows you to download files in desktop safari if pop up blocking
          // is enabled.
          if (typeof a.download === 'undefined') {
            a.setAttribute('target', '_blank');
          }
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(blobURL);
        }
      } catch (e) {
        console.log('caught err: ', e);
      }
      this.submitted = false;
      this.isLoading = false;
    }
  },
  created () {
    const today = moment();
    // this.formData.effectiveDate = today.format('YYYY-MM-DD');
  }
};
</script>

<style>
.required {
}
.required:after {
    color: red;
    content: '*';
    padding-left: 4px;
}
</style>
