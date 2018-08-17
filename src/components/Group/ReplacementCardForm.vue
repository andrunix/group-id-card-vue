<template>
<div id="replacement-cards">
  <p>Please allow 7 to 10 working days to receive your new cards.</p>
  
  <div class="errors" id="errors" v-if="errors.length > 0">
    <ul>
      <li v-for="e in errors">{{e}}</li>
    </ul>
  </div>
  
  <div class="container">
    <div class="row">
      <form class="form-horizontal" id="replacementForm">
        <div class="form-group">
          <!-- Group Select -->
          <label for="groupid" class="col-sm-2 control-label required">Group</label>
          <div class="col-sm-10">
            <select id="groupid" name="groupid" class="form-control" v-model="formData.groupID">
              <option value="">-Select group-</option>
              <option v-for="g in groupList" v-bind:value="g.groupID">{{g.groupID}} - {{g.groupName}}</option>
            </select>
          </div>
        </div>
        
        <div class="form-group">
          <!-- Subscriber Search Form -->
          <label for="subscriberid" class="col-sm-2 control-label required">Subscriber</label>
          <div class="col-sm-2">
            <input type="text" id="subscriberid"
                   name="subscriberid"
                   class="form-control"
                   v-model="formData.subscriberID"
                   required="true"/>
          </div>
          <div class="col-sm-8">
            <SubscriberSearch v-on:subscriber-search-complete="handleSearchComplete"
                              :group-id="formData.groupID" />
          </div>
        </div>
        
        <div class="form-group">
          <!-- number of cards -->
          <label for="cards" class="col-sm-2 control-label">Number of Cards</label>
          <div class="col-sm-10">
            <select id="cards" name="cards" class="form-control" v-model="formData.numberOfCards">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
        </div>
        
        <div class="form-group">
          <div class="col-sm-2 col-sm-offset-2">
            <button id="submit" class="btn btn-primary" @click.prevent="submitForm">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  
  <SubscriberSearchResults
    :showModal="showResultsModal"
    :search-results="searchResults"
    v-on:subscriber-selected="handleSubscriberSelected"
    v-on:subscriber-search-cancel="handleCancel"/>
  
  
</div>
</template>

<script>
import SubscriberSearch from './SubscriberSearch.vue';
import SubscriberSearchResults from './SubscriberSearchResults.vue';

export default {
  name: 'ReplacementCardForm',
  props: [ 'groupList' ],
  components: { SubscriberSearch, SubscriberSearchResults },
  data () {
    return {
      title: 'Order Replacement ID Cards',
      formData: {
        groupID: '',
        subscriberID: '',
        numberOfCards: '1'
      },
      errors: [],
      showSubscriberSearch: false,
      searchResults: [],
      showResultsModal: false
    };
  },
  methods: {
    submitForm: function () {
      this.errors = [];
      if (this.groupID.trim() === '') {
        this.errors.push('Group ID is required');
      }
      if (this.subscriberID.trim() === '') {
        this.errors.push('Subscriber ID is required');
      }
      if (this.errors.length === 0) {
        this.$emit('order-submitted', {
          groupID: this.groupID,
          subscriberID: this.subscriberID,
          numberOfCards: this.numberOfCards
        });
      }
    },
    handleSearchComplete (results) {
      this.searchResults = results;
      this.showResultsModal = results.length > 0;
    },
    handleSubscriberSelected (id) {
      this.searchResults = [];
      this.showResultsModal = false;
      this.formData.subscriberID = id;
    },
    handleCancel () {
      this.searchResults = [];
      this.showResultsModal = false;
    },
    subscriberSearch: function () {
      this.$emit('subscriber-search');
      this.showSubscriberSearch = true;
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
