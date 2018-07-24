<template>
<div id="replacement-cards">
  <h1>{{title}}</h1>
  
  <p>Please allow 7 to 10 working days to receive your new cards.</p>

  <div class="errors" id="errors" v-if="errors.length > 0">
    <ul>
      <li v-for="e in errors">{{e}}</li>
    </ul>
  </div>

  <div class="row">
    <form class="form-horizontal" id="replacementForm">
      <div class="form-group">
        <!-- Group Select -->
        <label for="groupid" class="col-sm-2 control-label required">Group ID</label>
        <div class="col-sm-10">
          <select id="groupid" name="groupid" class="form-control" v-model="groupID">
            <option value="">-Select group-</option>
            <option v-for="g in groupList" v-bind:value="g.groupID">{{g.groupID}} - {{g.groupName}}</option>
          </select>
        </div>
      </div>
      
      <div class="form-group">
        <!-- Subscriber Search Form -->
        <label for="subscriberid" class="col-sm-2 control-label required">Subscriber ID</label>
        <div class="col-sm-2">
          <input type="text" id="subscriberid" name="subscriberid" class="form-control" v-model="subscriberId" required="true"/>
        </div>
        <div class="col-sm-8">
          <button id="subscriberSearch"
                  name="subscriberSearch"
                  class="btn btn-default"
                  @click.prevent="subscriberSearch">Subscriber Search</button>
        </div>
      </div>
      
      <div class="form-group">
        <!-- number of cards -->
        <label for="cards" class="col-sm-2 control-label">Number of Cards</label>
        <div class="col-sm-10">
          <select id="cards" name="cards" class="form-control" v-model="numberOfCards">
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
      </div>
      
      <div class="form-group">
        <div class="col-sm-2 col-sm-offset-2">
          <button id="submit" class="btn btn-primary" @click.prevent="submitForm">Submit Request</button>
        </div>
      </div>
    </form>
    
    
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReplacementCardForm',
  props: [ 'groupList', 'submit' ],
  data () {
    return {
      title: 'Order Replacement ID Cards',
      groupID: '',
      subscriberID: '',
      numberOfCards: '1',
      errors: []
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
