/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending on the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle(src) {
  const copy = [...src];

  const length = copy.length;
  for (let i = 0; i < length; i++) {
    const x = copy[i];
    const y = Math.floor(Math.random() * length);
    const z = copy[y];
    copy[i] = z;
    copy[y] = x;
  }

  if (typeof src === 'string') {
    return copy.join('');
  }

  return copy;
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/

// import React, { useState, useEffect } from 'react';
// import './App.css';

const App = () => {
  const [words, setWords] = React.useState(['']);
  const [scrambledWord, setScrambledWord] = React.useState('');
  const [guess, setGuess] = React.useState('');
  const [points, setPoints] = React.useState(0);
  const [strikes, setStrikes] = React.useState(0);
  const [passes, setPasses] = React.useState(3);
  const [gameOver, setGameOver] = React.useState(false);

  React.useEffect(() => {
    const savedWords = localStorage.getItem('scrambleWords');
    if (savedWords) {
      setWords(JSON.parse(savedWords))
    } else {
      const initialWords = [
        'apple', 'banana', 'cherry', 'orange', 'kiwi', 'grape', 'melon', 'pear', 'plum', 'mango'
      ];
      setWords(initialWords);
      localStorage.setItem('scrambleWords', JSON.stringify(initialWords));
    }
    // setScrambledWord(shuffleWord(words[0]));
  }, []);

  React.useEffect( () => {
    console.log("useEffect", words)
    setScrambledWord(shuffleWord(words[0]));
  }, [words] )

  const shuffleWord = (word) => {
    console.log(word)
    return shuffle(word);
  };

  const handleGuess = (event) => {
    event.preventDefault();
    if (guess.toLowerCase() === words[0]) {
      setPoints(points + 1);
      setGuess('');
      setWords(words.slice(1));
      if (words.length > 1) {
        setScrambledWord(shuffleWord(words[1]));
      } else {
        setGameOver(true);
      }
    } else {
      setStrikes(strikes + 1);
      setGuess('');
    }
  };

  const handlePass = () => {
    if (passes > 0) {
      setPasses(passes - 1);
      setWords(words.slice(1));
      if (words.length > 1) {
        setScrambledWord(shuffleWord(words[1]));
      } else {
        setGameOver(true);
      }
    }
  };

  const handleRestart = () => {
    setPoints(0);
    setStrikes(0);
    setPasses(3);
    setGameOver(false);
    setWords(JSON.parse(localStorage.getItem('scrambleWords')));
    setScrambledWord(shuffleWord(words[0]));
  };

  return (
    <div>
      {gameOver ? (
        <div>
          <h1>Game Over</h1>
          <button onClick={handleRestart}>Play Again</button>
        </div>
      ) : (
        <div>
          <h1>Scramble Game</h1>
          <p>Points: {points}</p>
          <p>Strikes: {strikes}</p>
          <p>Passes Remaining: {passes}</p>
          <p>Scrambled Word: {scrambledWord}</p>
          <form onSubmit={handleGuess}>
            <input
              type="text"
              value={guess}
              onChange={(event) => setGuess(event.target.value)}
              placeholder="Enter your guess"
            />
            <button type="submit">Submit</button>
          </form>
          <button onClick={handlePass} disabled={passes === 0}>Pass</button>
        </div>
      )}
    </div>
  );
};

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
