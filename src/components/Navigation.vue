<template>
<div id="navigation">
    <div id="menuBar"> <a href="#" v-on:click="back()" v-if="currentPage === 'Scroller'"> ⬅️ </a> </div>
    <component :is="currentPage" @SongListSongSelected="songSelected" :SongId="currentSongId">  </component>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SongList from "./SongList.vue";
import Scroller from "./Scroller.vue";

@Component({
    components: {    
      SongList,
        Scroller
      }

})
export default class Navigation extends Vue {
  currentPage : string = "SongList";
  currentSongId : number = 0;
  back () : void {
    this.currentPage = "SongList";

  }
  songSelected(id : number) : void {
    // eslint-disable-next-line no-console
    console.log(id);
    this.currentSongId = id;
        this.currentPage = "Scroller";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#navigation {
  height:100%;
}
#menuBar {
  background: #163f46;
  padding:10px;
  height:$MenuBarHeight;
  text-align: left;

}
#menuBar a{
  font-size: 26px;
}
</style>
