<template>
<div> 
  <div>
    <input id="songArtist" :v-bind="currentSong" :value="currentSong.artist" @input="songArtistUpdated" />
  </div>
  <div>
    <input id="songName" :v-bind="currentSong" :value="currentSong.title" @input="songNameUpdated" />
  </div>
  <div>
    <textarea id="songText" :v-bind="lyrics" :value="lyrics" @input="songLyricsUpdated">  </textarea>  
  </div>
  <button @click="updateSong">Update</button>
  <button>Cancel</button>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { GetSong, GetSongLyric, UpdateSongLyric } from "../logic/loader";
import { song } from "@objects/song";
import { songlyric } from '../objects/songlyric';

@Component({
    components: {    

      }

})
export default class EditSong extends Vue {
  private currentSong : song = { id : 0, artist : "Loading", title : "Loading" };
  private currentLyrics : songlyric = { songid : 0, timing : [], id : 0, lyric : []};
  private lyrics : string = "";

  @Prop() private SongId! : number;  
  @Watch('SongId', { immediate : true })
  onSongIdChanged(value : number, oldValue : number)
  {
      GetSong(value).then(x => this.currentSong = x);
      GetSongLyric(value).then(x => {
       this.currentLyrics = x;
        this.lyrics = x.lyric.join('\n')
      }
        );
  }
  
  songNameUpdated(event : any) : void
  {
    this.currentSong.title = event.target.value;
  }

  songLyricsUpdated(event : any) : void {
   var text : string = event.target.value;
   var textAry : Array<string> = text.split('\n');
   
   // Add extra line to make for loop "safe"
    if (textAry.length % 2 == 1) {
      textAry.push("");
    }

    for (var i = 0; textAry.length-1 > i; i = i+2) {
      var lineLength = textAry[i].length > textAry[i+1].length ? textAry[i].length : textAry[i+1].length;
      textAry[i] = textAry[i].padEnd(lineLength);
      textAry[i+1] = textAry[i+1].padEnd(lineLength);
    }
    this.currentLyrics.lyric = textAry;
  }

  songArtistUpdated(event : any) : void
  {
    this.currentSong.artist =  event.target.value;
  }

  updateSong() : void
  {      
      UpdateSongLyric(this.currentLyrics);
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#songName{
  width: 33%;
}
#songArtist{
  width: 33%;
}
#songText {
width: 33%;
}
</style>
