<template>
<div id="temporary-cards">
  <h1 class="id-card">{{ title }}</h1>
  
  <div>Temporary ID cards can be produced for a Group, Subgroup, Department, or Subscriber</div>
  
  <div class="errors" id="errors" v-if="errors.length > 0">
    <ul>
      <li v-for="e in errors">{{e}}</li>
    </ul>
  </div>
  
	<form class="form-horizontal"
        id="downloadTempCard"
        name="downloadTempCard"
        action="#"
        @submit="checkForm"
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
                 v-model="effectiveDate" />
			    <span>(MM/DD/YYYY) </span> 
			    <span class="add-on"><i class="icon-remove"></i></span>
			    <span class="add-on"><i class="icon-th"></i></span>
			  </div>
		  </div>
      <div class="form-group">
        <!-- Group Select -->
        <label for="groupid" class="col-sm-2 control-label required">Group ID</label>
        <div class="col-sm-10">
          <select id="groupid" name="groupid" class="form-control" v-model="groupID" @change="groupChanged">
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
                  v-model="subgroupID">
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
                 v-model="departmentID" />
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
                 v-model="subscriberID" />
        </div>
        <div class="col-sm-4">
          OR
          <button id="subscriberSearch"
                  name="subscriberSearch"
                  class="btn btn-default"
                  @click.prevent="subscriberSearch">Subscriber Search</button>
		    </div>
		  </div>
      
      <div class="form-group">
        <div class="col-sm-10 col-sm-offset-2">
          <button id="submit" class="btn btn-primary">Submit Request</button>
        </div>
      </div>
    </div>
	</form>

  </div>
</template>

<script>
export default {
  name: 'TemporaryCardForm',
  props: [ 'groupList', 'submitForm' ],
  data () {
    return {
      title: 'Print Temporary ID Cards',
      groupID: '',
      subgroupID: '',
      departmentID: '',
      subscriberID: '',
      effectiveDate: '2018-07-17',
      errors: [],
      subgroups: []
    };
  },
  computed: {
    formValid: function (e) {
      return this.groupID.trim() !== '' && this.effectiveDate.trim() !== '';
    }
  },
  methods: {
    groupChanged: function () {
      const val = this.groupID;
      const grp = this.groupList.find(g => g.groupID === val);
      this.subgroups = grp.subgroups;
    },
    checkForm: function (e) {
      this.errors = [];
      if (this.groupID.trim() === '') {
        this.errors.push('Group ID is required');
      }
      if (this.effectiveDate.trim() === '') {
        this.errors.push('Benefit effective date is required');
      }
      if (!this.errors.length) {
        return true;
      }
      e.preventDefault();
      this.$emit('form-submitted');
    },
    subscriberSearch: function () {
      this.$emit('subscriber-search');
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
