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
  let hintsRemaining: number = 2;

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

  function giveHint() {
    if(hintsRemaining <= 0) return;
    const splits = targetWord.split('');
    addChar(splits[charNumber]);
    hintsRemaining--;
  }

  function surrender() {

    for(let i = 0; i < 6; i++)
      removeChar();

    const splits = targetWord.split('');
    for(let i = 0; i < splits.length; i++){
      addChar(splits[i]);
    }
    checkWord();
  }


  function handleKeydown(event: KeyboardEvent) {
      const thaanaMap: Record<string, string> = {
        'h': '\u0780', // ހ
        'S': '\u0781', // ށ
        'n': '\u0782', // ނ
        'r': '\u0783', // ރ
        'b': '\u0784', // ބ
        'L': '\u0785', // ޅ
        'k': '\u0786', // ކ
        'w': '\u0787', // އ
        'v': '\u0788', // ވ
        'm': '\u0789', // މ
        'f': '\u078A', // ފ
        'd': '\u078B', // ދ
        't': '\u078C', // ތ
        'l': '\u078D', // ލ
        'g': '\u078E', // ގ
        'N': '\u078F', // ޏ
        's': '\u0790', // ސ
        'D': '\u0791', // ޑ
        'z': '\u0792', // ޒ
        'T': '\u0793', // ޓ
        'y': '\u0794', // ޔ
        'p': '\u0795', // ޕ
        'j': '\u0796', // ޖ
        'c': '\u0797', // ޗ
        
        // Vowels (Fili)
        'a': '\u07A6', // ަ
        'A': '\u07A7', // ާ
        'i': '\u07A8', // ި
        'I': '\u07A9', // ީ
        'u': '\u07AA', // ު
        'U': '\u07AB', // ޫ
        'e': '\u07AC', // ެ
        'E': '\u07AD', // ޭ
        'o': '\u07AE', // ޮ
        'O': '\u07AF', // ޯ
        'q': '\u07B0', // ް (Sukun)
      };

      // Allow only letter fili letter fili...
      if(charNumber % 2 === 0 && thaanaMap[event.key]?.charCodeAt(0) > 0x07A0) return;
      if(charNumber % 2 === 1 && thaanaMap[event.key]?.charCodeAt(0) < 0x07A0) return;

      if (event.key in thaanaMap) {
        addChar(thaanaMap[event.key]);
      }

      if (event.key === 'Enter') {
        checkWord();
      }
      if (event.key === 'Backspace') {
        removeChar();
      }
  }



  onMount(startRound);
  

</script>

<svelte:window on:keydown={handleKeydown} />

<main>
  <span style="font-size: 1.5em; font-weight: bold;">ދިވެހިލް</span><br />
  <span style="font-size: 1.2em">ހ ނުވަތަ ނ އިން ފެށޭ ބަހެއް</span>
  <Alert bind:this={alertInvalidWord}>ރަދީފުގައި ނެތް ބަހެއް</Alert>
  <Alert bind:this={alertTooShort}>އަކުރު އަދި މަދު</Alert>
  <Alert bind:this={alertWin}>!!މަރުހަބާ</Alert>

  {#if showHowto}
    <Howto bind:show={showHowto}></Howto>
  {/if}

  <div class="sidebar">
    <button on:click={() => showHowto = true}>?</button>
    <button on:click={giveHint} disabled={hintsRemaining <= 0}>ހިންޓް    </button>
    <button on:click={surrender}>އަމާން</button>
    <button on:click={() => window.location.reload()}>↻</button>
    <button on:click={() => window.open('https://github.com/meekaaku/dhivehil', '_blank')}>
      <svg height="20" width="20" viewBox="0 0 16 16">
        <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
      </svg>
    </button>
  </div>


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
    <Key {char} score={keyboardScores[char]} on:click={()=>addChar(char)} disabled={charNumber %2 === 1}></Key>
  {/each}
  </div>

  <div class="keyboardrow">
    
  {#each [...LETTERS].slice(8, 16) as char}
    <Key {char} score={keyboardScores[char]} on:click={()=>addChar(char)} disabled={charNumber %2 === 1}></Key>
  {/each}
  </div>

  <div class="keyboardrow">
  {#each [...LETTERS].slice(16, 24) as char}
    <Key {char} score={keyboardScores[char]} on:click={()=>addChar(char)} disabled={charNumber %2 === 1}></Key>
  {/each}
  </div>


  <div class="keyboardrow">
  {#each [...MARKS].slice(0, 6) as char}
    <Key fili={true} {char} score={keyboardScores[char]} on:click={()=>addChar(char)}  disabled={charNumber %2 === 0}></Key>
  {/each}
  </div>

  <div class="keyboardrow">
  {#each [...MARKS].slice(6, 11) as char}
    <Key fili={true} {char} score={keyboardScores[char]} on:click={()=>addChar(char)} disabled={charNumber %2 === 0}></Key>
  {/each}
  </div>



  <div class="keyboardrow">
  <Key char="ފަހަތަށް" score={null} on:click={removeChar}></Key>
  <Key char="ޗެކް" score={null} on:click={checkWord} ></Key>
  </div>



  </main>


<style>
	main {
		text-align: center;
		padding: 1em;
    padding-top: 0;
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
    gap: 0.3rem;
  }


  .sidebar {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 0;
    right: 0;
    margin-right: 1em;
    margin-top: 1em;
    z-index: 100;
  }
</style>