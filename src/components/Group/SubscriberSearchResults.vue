<template>
<modal v-model="showModal" title="Search Results" ref="modal" size="lg"
       v-on:hide="handleHide"
       :footer="false">
  <div id="search-results" v-if="searchResults.length > 0">
    <p>
      To select a subscriber, click the Subscriber ID.
    </p>
    <table class="table table-striped" id="results-table">
      <thead>
        <tr>
          <th>Subscriber ID</th><th>Name</th><th>Birth Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="s in searchResults">
          <td><a href="#" @click.prevent="handleSubscriberSelected(s.subscriberID)">{{s.subscriberID}}</a></td>
          <td>{{s.lastName}}, {{s.firstName}}</td>
          <td>{{s.birthDate.replace(/-/g, '/')}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  </modal>
</template>
<script>
import { Modal, DatePicker } from 'uiv';

export default {
  name: 'SubscriberSearchResults',
  props: [ 'searchResults', 'showModal' ],
  components: { Modal },
  methods: {
    handleSubscriberSelected (id) {
      this.$emit('subscriber-selected', id);
    },
    handleHide () {
      this.$emit('subscriber-search-cancel');
    }
  }
};
</script>

  
