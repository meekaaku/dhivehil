<script lang="ts">
  export let char: string = '';
  export let score: number;
  export let index: number;
  export let isMark: boolean;

  $: isBottomMark = ['ި','ީ'].indexOf(char) != -1;

</script>

{#if isMark}

<div class="tile" style="transform:translateX({35 * (3-index)}px); position: absolute;">

  <div class="top"
    class:green="{score == 3}"
    class:yellow="{score == 2}"
    class:grey="{score == 1}"
  >{#if !isBottomMark}<div>{char}</div>{/if}</div>

  <div class="mid transparent"></div>

  <div class="bottom"
    class:green="{score == 3}"
    class:yellow="{score == 2}"
    class:grey="{score == 1}"
  >{#if isBottomMark}<div>{char}</div>{/if}</div>

</div>

{:else}

<div class="tile">
  <div class="top"></div>
  <div class="mid"
    class:green="{score == 3}"
    class:yellow="{score == 2}"
    class:grey="{score == 1}"
  ><div>{char}</div></div>
  <div class="bottom"></div>
</div>

{/if}



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
  transform: translateY(-10px) translateX(-8px);
}
.mid {
  height: 40%;
}
.mid > div {
  transform: translateY(-19px);
}
.bottom {
  height: 30%;
}
.bottom > div {
  transform: translateY(-37px) translateX(-8px);
}

</style>