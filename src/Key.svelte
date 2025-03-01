<script lang="ts">
export let char: string;
export let score: number;
export let fili: boolean=false;

</script>

<button class="key" on:click
  class:white="{score == 0}"
  class:grey="{score == 1}"
  class:yellow="{score == 2}"
  class:green="{score == 3}"
  class:fili
>
   {char}
</button>

<style>
button {
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 5px;
}

.fili {
  padding-right: 1.6rem;
}
</style>