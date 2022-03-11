function Keyboard({ setGuess, guess, lettersGuessed }) {
  let topRow = "qwertyuiop";
  let middleRow = "asdfghjkl";
  let bottomRow = "zxcvbnm";
  function letterClass(letter) {
    let lClass = "letter";
    if (lettersGuessed[letter] === 0) {
      lClass += " crossed";
    } else if (lettersGuessed[letter] === 1) {
      lClass += " yellow";
    } else if (lettersGuessed[letter] === 2) {
      lClass += " green";
    }
    return lClass;
  }

  return (
    <div className="keyboard">
      <div className="row">
        {topRow.split("").map((letter) => {
          return (
            <button
              className={letterClass(letter)}
              onClick={() => {
                if (guess.length < 5) {
                  setGuess((guess) => guess + letter);
                }
              }}
            >
              {letter}
            </button>
          );
        })}
      </div>
      <div className="row">
        {middleRow.split("").map((letter) => {
          return (
            <button
              className={letterClass(letter)}
              onClick={() => {
                if (guess.length < 5) {
                  setGuess((guess) => guess + letter);
                }
              }}
            >
              {letter}
            </button>
          );
        })}
      </div>
      <div className="row">
        {bottomRow.split("").map((letter) => {
          return (
            <button
              className={letterClass(letter)}
              onClick={() => {
                if (guess.length < 5) {
                  setGuess((guess) => guess + letter);
                }
              }}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default Keyboard;
