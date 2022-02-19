<script lang="ts">
import { fade } from 'svelte/transition';

export let show: boolean;
</script>



{#if show}
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