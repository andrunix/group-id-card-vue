<template>
  <div class="">
	  <div id="orderID">
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
	        <button id="orderCardsBtn" name="orderCardsBtn"
                 class="btn btn-secondary text-uppercase"
                  @click.prevent="orderReplacement">Place Order</button>
		    </div>
		</form>
	</div>
	  <div class="clearWhiteSpace10"></div>
    
  </div>
</template>

<script>

export default {
  name: 'ReplacementCardForm',
  props: [],
  components: { },
  data () {
    return {
      numberOfCards: '1'
    };
  },
  methods: {
    orderReplacement: function () {
      this.$emit('order-submitted', { numberOfCards: this.numberOfCards });
    }
  }
};
</script>

<style>
</style>
