<script lang="ts">
  import { onMount } from 'svelte';
  import Tile from './Tile.svelte';
  import CombinedTile from './CombinedTile.svelte';
  import Word from './Word.svelte';
  import Key from './Key.svelte';
  import Alert from './Alert.svelte';
  import {LETTERS, MARKS, WORDS, PRESENT, ABSENT, CORRECT} from './data'
  import {sleep} from './util';
  let guesses: Array<Array<string>> = [
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
  ];

  let scores: Array<Array<number>> = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ];

  let keyboardScores: Object = {};

  let tiles = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]

  let guessNumber = 0;
  let charNumber = 0;
  let targetWord = '';
  let invalidWord = false;
  let tooFewLetters = false;
  let win = false;

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
      tooFewLetters = true;
      await sleep(2000);
      tooFewLetters = false;
      return;
    }

    if(!WORDS.includes(guess)){
      invalidWord = true;
      await sleep(2000);
      invalidWord = false;
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

      console.log('Total score is '+ totalScore);
    if (totalScore === 18){
      win = true;
      // Do win animation
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
    console.log("Hello");
    //Eg: for 3 letter words, there are 6 characters including the diacritic marks
    targetWord = selectTargetWord(wordLength * 2);
    console.log('Target word is ' + targetWord);
  }


  onMount(startRound);

</script>

<main>
  <Alert show={invalidWord}>ރަދީފުގައި ނެތް ބަހެއް</Alert>
  <Alert show={tooFewLetters}>އަކުރު އަދި މަދު</Alert>
  <Alert show={win}>މަރުހަބާ!!</Alert>
  <!--
  {#each guesses as guess, i}
    <Word>
    {#each guess as char, j}
      <Tile {char} score={scores[i][j]} isMark={j % 2 == 1} index={j}></Tile>
    {/each}
    </Word>
  {/each}
  -->
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


  <Word>
  {#each [...LETTERS].slice(0, 12) as char}
    <Key {char} score={keyboardScores[char]} on:click={()=>addChar(char)}></Key>
  {/each}
  </Word>

  <Word>
  {#each [...LETTERS].slice(-12) as char}
    <Key {char} score={keyboardScores[char]} on:click={()=>addChar(char)}></Key>
  {/each}
  </Word>

  <Word>
  {#each [...MARKS] as char}
    <Key {char} score={keyboardScores[char]} on:click={()=>addChar(char)}></Key>
  {/each}
  </Word>

  <Word>
  <Key char="ޗެކް" score={null} on:click={checkWord} ></Key>
  <Key char="ފަހަތަށް" score={null} on:click={removeChar}></Key>
  </Word>

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