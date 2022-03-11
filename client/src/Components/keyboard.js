function Keyboard({ setGuess, guess, lettersGuessed, submitRef }) {
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
      <div style={{ display: "flex" }}>
        <button
          className="menuButton"
          onClick={() => {
            setGuess((guess) => guess.substring(0, guess.length - 1));
          }}
        >
          Backspace
        </button>
        <button
          className="menuButton"
          onClick={(e) => {
            submitRef.current.dispatchEvent(
              new Event("submit", { bubbles: true, cancelable: true })
            );
          }}
        >
          Enter
        </button>
      </div>
    </div>
  );
}
export default Keyboard;
