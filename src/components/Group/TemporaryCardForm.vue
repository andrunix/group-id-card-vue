<template>
<div id="temporary-cards">
  <h1 class="id-card">{{ title }}</h1>
  
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
    
    <div class="row">
	    <div class="form-group">
	      <label for="effectiveDate"
               class="col-sm-2 control-label required">
	        Benefit Effective Date
	      </label>
	      <div class="col-sm-10">
			    <input type="date"
                 id="effectiveDate"
                 class="controls input-append date form_date form-control"
                 v-model="formData.effectiveDate" />
			    <span>(MM/DD/YYYY) </span> 
			    <span class="add-on"><i class="icon-remove"></i></span>
			    <span class="add-on"><i class="icon-th"></i></span>
			  </div>
		  </div>
      <div class="form-group">
        <!-- Group Select -->
        <label for="groupid" class="col-sm-2 control-label required">Group ID</label>
        <div class="col-sm-10">
          <select id="groupid" name="groupid" class="form-control" v-model="formData.groupID" @change="groupChanged">
            <option value="">-Select group-</option>
            <option v-for="g in groupList" v-bind:value="g.groupID">{{g.groupID}} - {{g.groupName}}</option>
          </select>
        </div>
      </div>
      
		  <div class="form-group">
			  <label for="subgroupid" class="col-sm-2 control-label">Subgroup ID</label>
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
				  Department ID
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
				  Subscriber ID
			  </label>
        <div class="col-sm-4">
          <input id="subscriberid" 
			    	     type="text"
                 class="form-control"
                 v-model="formData.subscriberID" />
        </div>
        <div class="col-sm-4">
          OR
          <SubscriberSearch v-on:subscriber-search-complete="handleSearchComplete"
            :group-id="formData.groupID" />
		    </div>
		  </div>
      
      <div class="form-group">
        <div class="col-sm-10 col-sm-offset-2">
          <button id="submit" class="btn btn-primary"
                  @click.prevent="submitForm"
                  :disabled="formInvalid() || submitted">Submit Request</button>
        </div>
      </div>

      <SubscriberSearchResults
        :showModal="showResultsModal"
        :search-results="searchResults"
        v-on:subscriber-selected="handleSubscriberSelected"
        v-on:subscriber-search-cancel="handleCancel"/>

    </div>
	</form>

  </div>
</template>

<script>
import LoadingIndicator from '../LoadingIndicator.vue';
import SubscriberSearch from './SubscriberSearch.vue';
import SubscriberSearchResults from './SubscriberSearchResults.vue';
import api from './api';

export default {
  name: 'TemporaryCardForm',
  props: [ 'groupList' ],
  components: { SubscriberSearch, SubscriberSearchResults, LoadingIndicator },
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
        effectiveDate: '2018-07-17'
      },
      searchResults: [],
      showResultsModal: false
    };
  },
  computed: {
    formValid: function (e) {
      return this.formData.groupID.trim() !== '' &&
        this.formData.effectiveDate.trim() !== '';
    }
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
        const resp = await api.getTempCardPdf(params);
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
