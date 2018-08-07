<template>
<div class="loading" v-if="isLoading">
  <div class="loading-message">
    Loading...
  </div>
  <fade-loader style="left: -400px; top: 40px;" :color="color"></fade-loader>
</div>
</template>

<script>
import FadeLoader from 'vue-spinner/src/FadeLoader.vue';
export default {
  name: 'LoadingIndicator',
  props: [ 'isLoading' ],
  components: { FadeLoader },
  data () {
    return {
      color: '#ff9800'
    };
  }
};
</script>

<style>
.loading {
    display: table;
    width: 100%;
    margin: 20px;
    min-height: 100px;
    border: solid 2px #FF9800;
    background-color: #ffefd7;
}
.loading-message {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    font-size: 2em;
    color: #FF9800;
}
</style>

