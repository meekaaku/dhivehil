<script lang="ts">
export let char: string;
export let score: number;
export let fili: boolean=false;
export let disabled: boolean=false;

</script>

<button class="key" on:click
  class:white="{score == 0}"
  class:grey="{score == 1}"
  class:yellow="{score == 2}"
  class:green="{score == 3}"
  class:fili
  {disabled}
>
   {char}
</button>

<style>
button {
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 5px;
  border: none;
  background-color: #e6e6e6;
  color: #1a1a1a;
  font-size: 1.2em;
  cursor: pointer;
  margin: 0.2rem;
  transition: all 0.2s;

}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.fili {
  padding-right: 1.6rem;
}
</style>