<template>
  <div id="replacement-cards">
    <h1>{{title}}</h1>

    <p>Please allow 7 to 10 working days to receive your new cards.</p>

    <div>
      <form class="">

        <!-- Group Select -->
        <label for="groupid">Group ID</label>
        <select id="groupid" name="groupid" v-model="groupId">
          <option value="">-Select group-</option>
          <option v-for="g in groupList" v-bind:value="g.groupId">{{g.groupId}} - {{g.groupName}}</option>
        </select>

        <!-- Subscriber Search Form -->

        <label for="subscriberid">Subscriber ID</label>
        <input type="text" id="subscriberid" name="subscriberid" v-model="subscriberId" />
        <button id="subscriberSearch" name="subscriberSearch" @click.prevent="subscriberSearch">Subscriber Search</button>

        <!-- number of cards -->
        <label for="cards">Number of Cards</label>
        <select id="cards" name="cards" v-model="numberOfCards">
          <option value="1">1</option>
          <option value="2">2</option>
        </select>

        <!-- submit -->
        <button id="submit" @click.prevent="submit">Submit Request</button>
        
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
      groupId: '',
      subscriberId: '',
      numberOfCards: '1'
    };
  },
  methods: {
    subscriberSearch: function () {
      console.log('subscriberSearch called!');
      this.$emit('subscriber-search');
    }
  }
};
</script>
