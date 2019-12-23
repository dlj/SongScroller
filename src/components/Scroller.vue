<template>
  <div v-on:click="funky()" id="Scollercontainer">
    <EditSong></EditSong>
    <span id="songsettings">✍🏻</span>
    <span id="songtiming">⏱️</span>    
    <div class="ThirdLine ScrollerLine" :v-bind="Song">{{Song.lyric[currentLine-4]}} <br /></div>
    <div class="ThirdLine ScrollerLine" :v-bind="Song">{{Song.lyric[currentLine-3]}} <br /></div>
    <div class="SecondLine ScrollerLine" :v-bind="Song">{{Song.lyric[currentLine-2]}} <br /></div>
    <div class="SecondLine ScrollerLine" :v-bind="Song">{{Song.lyric[currentLine-1]}} <br /></div>
    <div class="MiddleLine ScrollerLine" :v-bind="Song">{{Song.lyric[currentLine]}} </div>
    <div class="MiddleLine ScrollerLine" :v-bind="Song">{{Song.lyric[currentLine+1]}} </div>
    <div class="SecondLine ScrollerLine" :v-bind="Song">{{Song.lyric[currentLine+2]}} <br /></div>
    <div class="SecondLine ScrollerLine" :v-bind="Song">{{Song.lyric[currentLine+3]}} <br /></div>
    <div class="ThirdLine ScrollerLine" :v-bind="Song">{{Song.lyric[currentLine+4]}} <br /></div>
    <div class="ThirdLine ScrollerLine" :v-bind="Song">{{Song.lyric[currentLine+5]}} <br /></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { songlyric } from '../types/songlyric'
import  EditSong from "./EditSong.vue";

@Component({
    components: {    
      EditSong
      }

})
export default class Scroller extends Vue {
@Prop() SongId! : number;
private Song : songlyric = { id : 0, songid : 0, lyric : []};

@Watch('SongId', {immediate : true})
onSongIdChanged(value: number, oldValue : number) {  
  this.Song = this.loadSong(value);
}
private interval : any;
private tmpData : songlyric[] = [
  { id : 1, songid : 1, lyric : 
    [  
        "I hurt myself today",
        "   G     D         ",
    "To see if i still feel",
    "Focus on the pain",
    "The only thing thats real",
    "The needel tears a hole",
    "The old familiar sting",
    "Try to kill it all away",
    "But I remember everything",
      "I hurt myself today",
    "To see if i still feel", 
    "Focus on the pain",
    "The only thing thats real",
    "The needel tears a hole",
    "The old familiar sting",
    "Try to kill it all away",
    "But I remember everything"] },
    {id : 2, songid : 2, lyric : 
      ["I en lille båd der gynger", "sidder jeg og synger",
  "Synger om de ting", "der gi'r livet værdi",
  "Jeg kan ikke gå på vandet", "men jeg kan så meget andet",
  "Jeg kan føle mig glad", "jeg kan føle mig fri",
  "Der er forår i min mave.", "Jeg ved, hvad jeg vil lave",
  "Ud at finde fred", "fri for nogen der glor",
  "Drive rundt ude på fjorden","med begge ben på jorden",
  "Jeg er godt tilfreds med en pilsner i snor",
  "I en lille båd der gynger", "sidder jeg og synger",
  "Synger om de ting", "der gi'r livet værdi",
  "Jeg kan ikke gå på vandet","men jeg kan så meget andet",
  "Jeg kan føle mig glad","jeg kan føle mig fri"] }
];
  currentLine : number = 0;

funky() : void {
  this.startScrolling();
}

startScrolling()
{
  if (this.interval !== undefined)
  {
    clearInterval(this.interval);
    this.currentLine = 0;
    return;
  }

    // eslint-disable-next-line no-console
    console.log("Start Scrolling");
  this.interval = setInterval(() => {  this.currentLine = this.currentLine+2 }, 2500);
}

loadSong(id : number) : songlyric {
  
  for (let sl of this.tmpData)
  {
    if (sl.id == id) {
        return sl;
    }
  }
  return { id : 0, songid : 0, lyric : []} as songlyric;
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

 $backgroundHighLight: #1a3530; 

#Scollercontainer
{
  height:100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
 
}

.ScrollerLine
{
  width:100%;
  white-space: pre;
  font-family: 'Courier New', Courier, monospace
}

.MiddleLine {
  font-size: 30px;
  background-color: $backgroundHighLight;
}
.SecondLine
{
  font-size: 20px;
  opacity: 40%;
  background-color: lighten($backgroundHighLight, 2);
}
.ThirdLine
{
 font-size: 15px;
 opacity: 20%;
}

#songsettings {
  opacity: 10%;
  font-size: 64px;
  position: absolute;
  top:$MenuBarHeight + 64px;
  right:64px;
}
#songsettings:hover {
  opacity: 50%;  
}
#songtiming {
  opacity: 10%;
  font-size: 64px;
  position: absolute;
  top:$MenuBarHeight + 64px;
  right:150px;
}
#songtiming:hover {
  opacity: 50%;  
}
</style>
