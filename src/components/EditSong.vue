<template>
<div> 
  <input />
  <textarea> </textarea>  
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';


@Component({
    components: {    

      }

})
export default class EditSong extends Vue {
  @Prop() private currentSongId! : number;
  @Watch('currentSongId', { immediate : true })
  oncurrentSongIdChanged(value : number, oldValue : number)
  {

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
  height: 16px;
}
</style>
