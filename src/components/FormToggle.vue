<template>
	<div class="greyBkgrd">
		<div id="orangePlusDiv" style="display:inherit;">
			<a href="#" id="form-toggle" @click.prevent="toggleMe">
        <h3 class="btn-secondary">{{toggleMessage}}</h3>
      </a>
		</div>
	</div>
</template>

<script>
// this is basically a two-way switch. On or Off.
// Props are messages for each state, onMessage and offMessage
// as well as a default value of "on" or "off"
export default {
  name: 'FormToggle',
  props: [ 'onMessage', 'offMessage', 'default' ],
  data () {
    return {
      on: true
    };
  },
  methods: {
    toggleMe: function () {
      this.on = !this.on;
      this.$emit('toggle-forms');
    }
  },
  computed: {
    toggleMessage: function () { return this.on ? this.onMessage : this.offMessage; }
  },
  created: function () {
    this.on = this.default.trim().toLowerCase() === 'on';
  }
};
</script>

