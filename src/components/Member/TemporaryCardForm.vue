<template>
  <div class="member-temp-card">
    <h1 class="IDCard">{{ title }}</h1>
	  <form  class="form-inline" id="downloadTempCard"
           name="downloadTempCard"
           action="#"
           target="_blank">		  
		  <div class="formRow">
			  <div class="formRadio">
          
			    <input aria-labelledby="dateSelectionRadioLabel" 
			    	     name="dateSelectionRadio" 
			    	     id="dateSelectionRadioToday" 
			    	     type="radio" 
			    	     value="today"
                 v-model="forPlanToday" />
          
		      <label for="dateSelectionRadioToday">
		        Get a card for the plan I have today.
		      </label>
		    </div>
		  </div>
      
	    <div class="clearWhiteSpace10"></div>
		  
		  <div class="formRow">
		    <div>
			    <input name="dateSelectionRadio" 
			    	     id="dateSelectionRadio" 
			    	     type="radio" 
			    	     value="later" 
                 v-model="forPlanToday"
			    	     />
				  <label for="dateSelectionRadio">
					  Get a card for a plan starting at a later date.
				  </label>			    	
		    </div>
		    <div class="row">
	        
	        <div class="form-group">
	          <label id="benefitEffectiveDateLabel" for="benefitEffectiveDate" style="display: inline-block;text-align :left;">
	            When does this plan begin:
	          </label>
	          <div  style="display: inline-block;">
			        <input type="date"
                     id="benefitEffectiveDate"
                     class="controls input-append date form_date"
                     data-date-format="mm/dd/yyyy"
                     data-link-field="benefitEffectiveDate" 
			               data-link-format="mm/dd/yyyy"
                     name="benefitEffectiveDate"
                     v-model="benefitEffectiveDate"
                     :disabled="forPlanToday !== 'later'"/>
			        <span>(MM/DD/YYYY)</span> 
			        <span class="add-on"><i class="icon-remove"></i></span>
			        <span class="add-on"><i class="icon-th"></i></span>
			      </div>
			      <input type="hidden"  id="benefitEffectiveDate" name="benefitEffectiveDate" value="07/17/2018" /><br/>
			    </div>
		    </div>
		  </div>
	    <div class="clearWhiteSpace10"></div>
		  <br>
	    <div style="margin-top: 30;">     
	      
	      <button style="margin-top: 0;" name="download"
                id="download"
                class="btn btn-secondary text-uppercase"
                @click.prevent="downloadPdf">
                Download ID Card</button>
	      <span>Please make sure your browser's pop-up blocker is disabled.</span>
		  </div>
	</form>
	<div class="clearWhiteSpace30"></div>

	</div>
</template>

<script>
export default {
  name: 'TemporaryCardForm',
  props: [],
  data () {
    return {
      title: 'Print Temporary ID Card',
      forPlanToday: 'today',
      benefitEffectiveDate: '2018-07-17'
    };
  },
  methods: {
    downloadPdf: function () {
      this.$emit('download-pdf');
    }
  }
};
</script>

<style>
</style>
