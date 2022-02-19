<script lang="ts">
import {MARKS} from './data';
export let char: string;
export let score: number;

</script>


<button class="key" on:click
  class:white ="{score == 0}"
  class:grey="{score == 1}"
  class:yellow="{score == 2}"
  class:green="{score == 3}"
>
  {char}
</button>


<style>
button {
  width: 30px;
  height: 50px;
  margin: 5px;
  border-radius: 5px;
}
</style>