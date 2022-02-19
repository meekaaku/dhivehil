<script lang="ts">
  import { onMount } from 'svelte';
  import Tile from './Tile.svelte';
  import Word from './Word.svelte';
  import Key from './Key.svelte';
  import Alert from './Alert.svelte';
  import {LETTERS, MARKS, WORDS} from './data'
  let guesses: Array<Array<string>> = [
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
  ];

  let scores = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ]

  let guessNumber = 0;
  let charNumber = 0;
  let targetWord = '';
  let invalidWord = false;
  let tooFewLetters = false;

  const addChar = (ch: string) => {
    console.log(`${charNumber} > ${guesses[0].length - 1}`);
    if (charNumber > guesses[0].length - 1) return;
    guesses[guessNumber][charNumber] = ch;
    charNumber++;
  }

  const removeChar = () => {
    if (charNumber <= 0) return;
    guesses[guessNumber][--charNumber] = '';
  }

  const checkWord = () => {
    const guess: string = guesses[guessNumber].join('');
    
    if(guess.length < 6){
      tooFewLetters = true;
      setTimeout(() => tooFewLetters = false, 2000);
      return;
    }

    if(!WORDS.includes(guess)){
      invalidWord = true;
      setTimeout(() => invalidWord = false, 2000);
      return;
    }

    const targetArray: string[] = targetWord.split('');
    guesses[guessNumber].forEach((char, index) =>  {
      if(char === targetArray[index]) {scores[guessNumber][index] = 3; return;}
      if(targetArray.includes(char)) {scores[guessNumber][index] = 2; return;}
      scores[guessNumber][index] = 1;
    });
    guessNumber++;
    charNumber = 0;
  }



  const selectTargetWord = (numChars: number) => {
    const validWords: string[] = [...WORDS].filter(w => w.length == numChars);
    targetWord = validWords[Math.floor(Math.random() * validWords.length)];
    console.log('valid words are ', validWords);
  }

  const startRound = (wordLength: number = 3, numGuesses: number = 6) => {
    //Eg: for 3 letter words, there are 6 characters including the diacritic marks
    selectTargetWord(wordLength * 2);
    console.log('Target word is ' + targetWord);
  }


  onMount(startRound);

</script>

<main>
  <Alert show={invalidWord}>ރަދީފުގައި ނެތް ބަހެއް</Alert>
  <Alert show={tooFewLetters}>އަކުރު އަދި މަދު</Alert>
  {#each guesses as guess, i}
    <Word>
    {#each guess as char, j}
      <Tile {char} score={scores[i][j]} isMark={j % 2 == 1} index={j}></Tile>
    {/each}
    </Word>
  {/each}
  


  <Word>
  {#each [...LETTERS].slice(0, 12) as char}
    <Key {char} score={1} on:click={()=>addChar(char)}></Key>
  {/each}
  </Word>
  <br />

  <Word>
  {#each [...LETTERS].slice(-12) as char}
    <Key {char} score={1} on:click={()=>addChar(char)}></Key>
  {/each}
  </Word>
  <br />

  {#each [...MARKS].reverse() as char}
    <Key {char} score={1} on:click={()=>addChar(char)}></Key>
  {/each}
  <br />

  <Key char="ޗެކް" score={1} on:click={checkWord} ></Key>
  <Key char="ފަހަތަށް" score={1} on:click={removeChar}></Key>

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}



	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>