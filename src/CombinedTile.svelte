<svelte:options accessors/>
<script lang="ts">
  import {sleep} from './util';
  export let letter: string = '';
  export let mark: string = '';
  export let letterScore: number;
  export let markScore: number;

  $: isBottomMark = ['ި','ީ'].indexOf(mark) != -1;
  let flipped: boolean = false;  // When true, tile is rolled back
  let jumpup: boolean = false;
  let jumpdown: boolean = false;

  export async function flip()
  {
    flipped = !flipped;
    await sleep(300);
    flipped = !flipped;
  }

  export async function jump()
  {
    jumpup = true; jumpdown = false;
    await sleep(70);
    jumpup = false; jumpdown = true;
  }

</script>

<div  class="tile"
      class:flipped="{flipped}"
      class:unflipped="{!flipped}"
      class:jumpup="{jumpup}"
      class:jumpdown="{jumpdown}"
>

  <div class="top"
    class:green="{markScore == 3}"
    class:yellow="{markScore == 2}"
    class:grey="{markScore == 1}"
  >{#if !isBottomMark}<div>{mark}</div>{/if}</div>


  <div class="mid"
    class:green="{letterScore == 3}"
    class:yellow="{letterScore == 2}"
    class:grey="{letterScore == 1}"
  ><div>{letter}</div></div>

  <div class="bottom"
    class:green="{markScore == 3}"
    class:yellow="{markScore == 2}"
    class:grey="{markScore == 1}"
  >{#if isBottomMark}<div>{mark}</div>{/if}</div>

</div>



<style>
.tile {
  width: 60px;
  height: 60px;
  border: 2px solid rgb(211, 214, 218);
  margin: 3px;
  font-size: 2rem;
}

.transparent {
  opacity: 0;
}

.top {
  height: 30%;
}

.top > div {
  transform: translateY(-2px) translateX(-8px);
}

.top .unflipped {
  background-color: blue;
}

.mid {
  height: 40%;
}

.mid > div {
  transform: translateY(-15px);
}

.bottom {
  height: 30%;
}

.bottom > div {
  transform: translateY(-30px) translateX(-8px);
}

.flipped {
  transform: rotateX(90deg);
  transition: transform 0.3s;
  transform-style: preserve-3d;
}

.unflipped {
  transform: rotateX(0deg);
  transition: transform 0.3s;
  transform-style: preserve-3d;
}

.jumpup {
  transform: translateY(-20px);
  transition: transform 0.2s;
}

.jumpdown {
  transform: translateY(0px);
  transition: transform 0.2s;
}


</style>