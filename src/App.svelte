<script lang="ts">
  import { Router, Route, Link } from "svelte-routing";
  import { onMount } from 'svelte';
  import CombinedTile from './CombinedTile.svelte';
  import Word from './Word.svelte';
  import Key from './Key.svelte';
  import Alert from './Alert.svelte';
  import Howto from './Howto.svelte';
  import {LETTERS, MARKS, WORDS, PRESENT, ABSENT, CORRECT} from './data'
  import {sleep} from './util';

  // The characters of the guessed words. Each element is the character.
  let guesses: Array<Array<string>> = [
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
  ];

  // Scores
  let scores: Array<Array<number>> = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ];

  // Object to store scores for the keyboard so that the keys can be highlighted
  let keyboardScores: Object = {};

  // Array of Svelete component for a tile
  let tiles = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]

  // Alert components that are bound with bind:this
  let alertWin;
  let alertInvalidWord;
  let alertTooShort;

  let guessNumber: number = 0;    // The guess number, currently we are giving 5 guesses, so 0-5
  let charNumber: number = 0;
  let targetWord: string = '';
  let showHowto: boolean = false;

  function addChar(ch: string)
  {
    if (charNumber > guesses[0].length - 1) return;
    guesses[guessNumber][charNumber] = ch;
    charNumber++;
  }

  function removeChar()
  {
    if (charNumber <= 0) return;
    guesses[guessNumber][--charNumber] = '';
  }

  async function checkWord()
  {
    const guess: string = guesses[guessNumber].join('');

    if(guess.length < 6){
      alertTooShort.show();
      return;
    }

    if(!WORDS.includes(guess)){
      alertInvalidWord.show();
      return;
    }

    const targetArray: string[] = targetWord.split('');
    for(let index = 0; index < guesses[guessNumber].length; index++){

      if (index % 2 === 0) tiles[guessNumber][Math.floor(index/2)].flip();
      await sleep(200) ;

      let score = 0;
      if (guesses[guessNumber][index] === targetArray[index])
        score = CORRECT;
      else if (targetArray.includes(guesses[guessNumber][index]))
        score = PRESENT;
      else
        score = ABSENT;

      scores[guessNumber][index] = score;
      keyboardScores[guesses[guessNumber][index]] = score;
    };
    const totalScore = scores[guessNumber].reduce((curr, prev) => curr + prev);

    if (totalScore === 18){
      for (let i = 0; i < 2; i++){
        for(let index = 0; index < guesses[guessNumber].length; index++){
          if (index % 2 === 0) tiles[guessNumber][Math.floor(index/2)].jump();
          await sleep(50) ;
        }
      }

      alertWin.show();
      return;
    }

    guessNumber++;
    charNumber = 0;
  }



  function selectTargetWord(numChars: number)
  {
    const validWords: string[] = [...WORDS].filter(w => w.length == numChars);
    return validWords[Math.floor(Math.random() * validWords.length)];
  }

  function startRound(wordLength: number = 3, numGuesses: number = 6)
  {
    console.log("Round started");
    //Eg: for 3 letter words, there are 6 characters including the diacritic marks
    targetWord = selectTargetWord(wordLength * 2);
    //console.log('Target word is ' + targetWord);
  }


  onMount(startRound);
  
  async function processJson()
  {
    const response = await fetch('/words.json');
    const lines = await response.json();
    const goodWords = [];

    for(const line of lines){
      if(line.approved_word_dv.length === 6){
        goodWords.push(line.approved_word_dv);
      }
    }

  }
</script>

<main>
  <Alert bind:this={alertInvalidWord}>ރަދީފުގައި ނެތް ބަހެއް</Alert>
  <Alert bind:this={alertTooShort}>އަކުރު އަދި މަދު</Alert>
  <Alert bind:this={alertWin}>!!މަރުހަބާ</Alert>

  {#if showHowto}
    <Howto bind:show={showHowto}></Howto>
  {/if}

  {#each guesses as guess, i}
    <Word>
    {#each [0, 2, 4] as j}
      <CombinedTile
        letter={guess[j]}
        mark={guess[j+1]}
        letterScore={scores[i][j]}
        markScore={scores[i][j+1]}
        bind:this={tiles[i][j/2]}
      ></CombinedTile>
    {/each}
    </Word>
  {/each}


  <div class="keyboardrow">
  {#each [...LETTERS].slice(0, 8) as char}
    <Key {char} score={keyboardScores[char]} on:click={()=>addChar(char)}></Key>
  {/each}
  </div>

  <div class="keyboardrow">
    
  {#each [...LETTERS].slice(8, 16) as char}
    <Key {char} score={keyboardScores[char]} on:click={()=>addChar(char)}></Key>
  {/each}
  </div>

  <div class="keyboardrow">
  {#each [...LETTERS].slice(16, 24) as char}
    <Key {char} score={keyboardScores[char]} on:click={()=>addChar(char)}></Key>
  {/each}
  </div>


  <div class="keyboardrow">
  {#each [...MARKS].slice(0, 6) as char}
    <Key fili={true} {char} score={keyboardScores[char]} on:click={()=>addChar(char)}></Key>
  {/each}
  </div>

  <div class="keyboardrow">
  {#each [...MARKS].slice(6, 11) as char}
    <Key fili={true} {char} score={keyboardScores[char]} on:click={()=>addChar(char)}></Key>
  {/each}
  </div>



  <div class="keyboardrow">
  <Key char="ފަހަތަށް" score={null} on:click={removeChar}></Key>
  <Key char="ޗެކް" score={null} on:click={checkWord} ></Key>
  </div>


  <button on:click={() => showHowto = true}>ކުޅެނީ ކިހިނެތް؟</button>

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
			max-width: 768px;
		}
	}

  .keyboardrow {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    gap: 0.5rem;
  }
</style>