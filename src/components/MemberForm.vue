<template>
<div id="member-id-form">
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
                   data-date=""
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
	    
	    <input type="submit" style="margin-top: 0;"name="downloadTempCardBtn" class="btn btn-secondary text-uppercase" value="Download ID Card" />
	    <span>Please make sure your browser's pop-up blocker is disabled.</span>
		</div>
		<input type="hidden" name="jspContent" value="printOrderId"/>
	</form>
	
	<div class="clearWhiteSpace30"></div>
	
	<div class="greyBkgrd">
		<div id="orangePlusDiv" style="display:inherit;">
			<a href="#" @click.prevent="orderNew = !orderNew">
        <h3 class="btn-secondary">Or click to order new ID Cards</h3>
      </a>
		</div>
		<div id="orangeMinusDiv" style="display:none;">
			<a href="#" ><h3 class="btn-secondary">Or click to order new ID Cards</h3></a>
		</div>
	</div>
	
	
	<div id="orderID" v-if="orderNew">
		<p class="formRow">
			New card(s) will be mailed to the address on file. Please allow 7-14 business days<br>to receive your new card(s).
		</p>
		
		<div class="clearWhiteSpace20"></div>
    
		<form id="orderCards"
          name="orderCards"
          action="#">
			<p class="formRow">
			  <label for="idList">
			    Number of ID Cards:&nbsp;&nbsp;
			  </label>
	      
			  <select aria-label="Number of Cards"
                name="idList"
                readOnlyAttr="readOnly"
                id="idList"
                autocomplete="false"
                style="width:60px; "
                v-model="numberOfCards">
			    <option value="1">1</option>
			    <option value="2">2</option>
			  </select>
			</p>
			
		  <div class="clearWhiteSpace10"></div>
		  
			<div>
	      <input type="submit" name="orderCardsBtn" class="btn btn-secondary text-uppercase" value="Place Order" />
		  </div>
		</form>
	</div>
	<div class="clearWhiteSpace10"></div>
</div>
</template>

<script>
export default {
  name: 'MemberForm',
  components: { },
  data () {
    return {
      title: 'Print Temporary ID Card',
      forPlanToday: 'today',
      orderNew: false,
      benefitEffectiveDate: '2018-07-17',
      numberOfCards: '1'
    };
  },
  methods: {
  }
};
</script>

<style>
input[type="date"]::-webkit-inner-spin-button{display:none;}
</style>
