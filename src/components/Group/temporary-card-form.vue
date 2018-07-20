<template>
  <div id="temporary-cards">
  <h1 class="id-card">{{ title }}</h1>
  
  <div>Temporary ID cards can be produced for a Group, Subgroup, Department, or Subscriber</div>
  
	<form  class="form-horizontal" id="downloadTempCard"
         name="downloadTempCard"
         action="#"
         target="_blank">
    
	  <div class="form-group">
	    <label id="benefitEffectiveDateLabel"
             for="benefitEffectiveDate"
             class="col-sm-2 control-label">
	      Benefit Effective Date:
	    </label>
	    <div class="col-sm-10">
			  <input type="date"
               id="benefitEffectiveDate"
               class="controls input-append date form_date"
               data-date-format="mm/dd/yyyy"
               data-link-field="benefitEffectiveDate" 
			         data-link-format="mm/dd/yyyy"
               name="benefitEffectiveDate"
               v-model="benefitEffectiveDate" />
        
			  <span>(MM/DD/YYYY) </span> 
			  <span class="add-on"><i class="icon-remove"></i></span>
			  <span class="add-on"><i class="icon-th"></i></span>
			</div>
		</div>
    
		<div class="form-group">
		  <label for="groupid" class="col-sm-2 control-label">Group ID</label>
      <div class="col-sm-10">
			  <input aria-labelledby="dateSelectionRadioLabel" 
			    	   id="groupid"
			    	   type="text" 
               v-model="groupID" />
		  </div>
		</div>
		<div class="form-group">
			<label for="subgroupid" class="col-sm-2 control-label">Subgroup ID</label>
      <div class="col-sm-10">
			  <input id="subgroupid" 
			    	   type="text" 
               v-model="subgroupID" />
		  </div>
		</div>
    
		<div class="form-group">
			<label for="subscriberid" class="col-sm-2 control-label">
				Subscriber ID
			</label>
      <div class="col-sm-10">
        <input id="subscriberid" 
			    	   type="text" 
               v-model="subscriberID" />
        OR
        <button id="subscriber-search"
                @click.prevent="subscriberSearch">Subscriber Search</button>
		  </div>
		</div>

    <div class="form-group">
      <div class="col-sm-10 col-sm-offset-2">
        <button id="submit" @click.prevent="groupSubmit">Submit Request</button>
      </div>
    </div>
	</form>

  </div>
</template>

<script>
export default {
  name: 'TemporaryCardForm',
  data () {
    return {
      title: 'Print Temporary ID Cards',
      groupID: '',
      subgroupID: '',
      departmentID: '',
      subscriberID: '',
      benefitEffectiveDate: '2018-07-17'
    };
  },
  methods: {
    subscriberSearch: function () {
      console.log('search!');
    },
    groupSubmit: function () {
      console.log('submittted!');
      const data = { groupID: this.groupID };
      this.$emit('submit', data);
    }
  }
};
</script>
