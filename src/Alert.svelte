<svelte:options accessors/>
<script lang="ts">
  import { fade } from 'svelte/transition';
  import {sleep} from './util';

  let visible = false;

  export async function show()
  {
    if(visible) return; // This prevents firing this off on repeated clicks
    visible = true;
    await sleep(2000);
    visible = false;
  }
</script>


{#if visible}
<div class="alert" transition:fade>
<slot></slot>
</div>

{/if}


<style>
.alert {
  z-index: 50;
  font-size: 20px;
  position: absolute;
  left: 50%;
  width: 120px;
  height: 35px;
  margin-left: -60px;
  background-color: black;
  color: white;
  border-radius: 5px;
}
</style>