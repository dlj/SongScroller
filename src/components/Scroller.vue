<template>
  <div id="Scollercontainer">  
    <ControlButtons @playbackState="playbackChanged"/>
    <EditSong id="editSong" :SongId="SongId" v-if="editMode" />    
    <span id="songtimingedit" @click="TimingMode = !TimingMode" v-if="!editMode">⏲️</span>
    <span id="songtiming" @click="ShowTiming = !ShowTiming" v-if="!editMode"><div id="songtimingedithand">⚙️</div>⏱️</span>  
    <span id="songsettings" @click="editMode = !editMode" v-if="!editMode">✍🏻</span>
    <div  @click="timerMark" v-if="!editMode">     
      <ul id="ScrollerList">
          <template v-for="(item, index) in something()">
              <li v-bind:key="index" >    
                <div>
                  <div :class="'Line' + item.index" class="ScrollerLine">{{item.lyric}} <br /></div>
                  <input v-if="item.timing !== undefined && ShowTiming === true" :value=item.timing />
                </div>
            </li>      
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { songlyric } from "@objects/songlyric"
import state from "../objects/state"

import  EditSong from "./EditSong.vue"
import ControlButtons from "./ControlButtons.vue"
import { GetSong, GetSongLyric } from "../logic/loader"
import { VNode, CreateElement } from 'vue';
import EventBus from '../logic/eventbus'

class tmpLyric
{
  lyric! : string;
  timing? : number;
  index! : number;
}


@Component({
    components: {    
      EditSong,
      ControlButtons
      }

})
export default class Scroller extends Vue {
private lineOffset : number = 5; 
private Song : songlyric = { id : 0, songid : 0, lyric : [], timing :[]};
private lastTimerMark : number = 0;

@Prop() SongId! : number;
@Watch('SongId', {immediate : true})
onSongIdChanged(value: number, oldValue : number) {  
  this.loadSong(value);  
}

private editMode : boolean = false;
@Watch('editMode', {immediate : true})
oneditModeChanged(value: boolean, oldValue : boolean) {  
  
}

private ShowTiming : boolean = false;
@Watch('ShowTiming', {immediate : true})
onShowTimingChanged(value: boolean, oldValue : boolean) {  

}

private TimingMode : boolean = false;
@Watch('TimingMode', {immediate : true})
onTimingModeChanged(value: boolean, oldValue : boolean) {  
  if (value == true) {
    this.startTiming();
  }
}

private Playing : boolean = false;
@Watch('Playing', {immediate : true})
onPlayingChanged(value: boolean, oldValue : boolean) {  
  this.currentLine = 0;
  if (value == true) {
    this.startScrolling();
  }
}
currentLine : number = 0;

playbackChanged(newState : state) : void {

switch(newState)
{
  case state.stopped : this.Playing = false;
  break;
  case state.playing : this.Playing = true;
  break;
  default: 
  break;
}

      // eslint-disable-next-line no-console
    console.log(newState);
}
something() : Array<tmpLyric>
{
  var rtn = Array<tmpLyric>();
  // *2 as two lines are handled at the same time
  var startPosition = this.currentLine;// - this.lineOffset * 2;
  var endPosition = this.currentLine + this.lineOffset * 2;

  // Only start from a positive line number
  // Easier to read than inline if
  if (this.ShowTiming || startPosition < 0) {
    startPosition = 0;
  }

  
  if (this.ShowTiming || endPosition > this.Song.lyric.length) {
    endPosition = this.Song.lyric.length;
  }
  
  // Update method should take care of the uneven number of rows
  for (var i = startPosition, y = 0; i <= endPosition; i = i + 2, y++)
  {
    // Line 4 is the lowest one, so cap it with Matn.min.
    var line =  this.ShowTiming ? (i === this.currentLine ? 0 : 2) : Math.min(Math.abs(i - this.currentLine),4);

    rtn.push({ lyric : this.Song.lyric[i], timing : this.Song.timing[y], index : line});
    rtn.push({ lyric : this.Song.lyric[i + 1], index : line});
  }
  return rtn;
}

startTiming() : void 
{
  // Reset
  this.ShowTiming = false;
  this.Song.timing = [];
  this.lastTimerMark = new Date().getTime();
}

timerMark() : void
{
  if (!this.TimingMode) {
    return;
  }

  // Mark current time and get the difference.
  let currentTime = new Date().getTime();
  let between = currentTime - this.lastTimerMark;
  this.lastTimerMark = currentTime;

  this.Song.timing.push(between);    
  this.currentLine = this.currentLine + 2;

  if (this.currentLine >= this.Song.lyric.length) {
    // Reset
    this.TimingMode = false;
    this.ShowTiming = true;
    this.currentLine = 0;
  }

  //Save in some way or another

}

startScrolling() : void
{
  if (this.Playing === false) {
    return;
  }

  this.currentLine = this.currentLine + 2; 
  let nextTimeout = Math.floor(this.currentLine / 2);
  
  // Stop if we run out of timing
  if (this.Song.timing.length < nextTimeout) {
    this.Playing = false;
    return;
  }

  setTimeout(() => {  
    this.startScrolling(); },     
    this.Song.timing[nextTimeout]);
}

loadSong(id : number) : void {  
  GetSongLyric(this.SongId).then(x => {  this.Song = x;
   });
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

 $backgroundHighLight: #1a3530; 

#Scollercontainer
{
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  flex-flow: row wrap; 
}

#ScrollerList
{
  list-style: none;
  padding:0px;
}

#ScrollerList li div
{
  align-items: center;
  justify-content: center;
  display: flex;  
}

#ScrollerList li input
{
  height: 24px;
  width: 75px;
}

.ScrollerLine
{
  width:100%;
  white-space: pre;
  font-family: 'Courier New', Courier, monospace
}

.Line0 {
  font-size: 20px;
  background-color: $backgroundHighLight;
}
.Line2
{
  font-size: 20px;
  opacity: 50%;
  background-color: lighten($backgroundHighLight, 2);
}
.Line4
{
 font-size: 20px;
 opacity: 20%;
}

#songsettings {
  opacity: 10%;
  font-size: 64px;
  position: absolute;
  top: 0px;
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

#songtimingedithand {
  position: absolute;
  font-size: 32px;
  bottom: 0;
  right: 0;
}

#songtimingedit {
  opacity: 10%;
  font-size: 64px;
  position: absolute;
  top:$MenuBarHeight + 64px;
  right:230px;
}
#songtimingedit:hover {
  opacity: 50%;  
}

#editSong {
  width:100%;
}
</style>
