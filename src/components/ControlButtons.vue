<template>
  <div>
    <a @click="$emit('playbackState', localState.paused)"><img src="@/assets/svg/pause.svg"/></a>
    <a @click="$emit('playbackState', localState.stopped)"><img src="@/assets/svg/stop.svg"/></a>
    <a @click="$emit('playbackState', localState.stopped)"><img src="@/assets/svg/rewind.svg"/></a>
    <a @click="$emit('playbackState', localState.playing)"><img src="@/assets/svg/play.svg"/></a>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import state from '../objects/state';

@Component
export default class ControlButtons extends Vue {

private localState = state;

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  
  margin: 0 10px;
}
a {
  color: red;
  font-size: 100px;
  font-family: 'Segoe UI Symbol', Tahoma, Geneva, Verdana, sans-serif;  
}
a img {
    border: 2px solid black;
    border-radius: 25px;
}
</style>
