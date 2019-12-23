<template>
  <div>
<ul id="Songul">
  <li v-for="item of songs"  v-bind:key="item.id">
    <a @click="itemClicked(item.id)">{{item.artist}} - {{ item.title }} </a>
  </li>
</ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { song } from "../types/song"
@Component
export default class SongList extends Vue {

get songs() : song[]
{
  return [{ id : 1, artist : "Nine Inch Nails", title : "Hurt"  } as song, {  id :2 , artist :  "Bamse", title: "I en lille båd der gynger"} as song];
}
    itemClicked (id : number) : void {
      this.$emit("SongListSongSelected", id);
    }
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
  color: #42b983;
}
</style>
