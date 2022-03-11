import PreviousGuesses from "../Components/previousGuesses";
import Keyboard from "../Components/keyboard";
import { useState, useEffect } from "react";
import Guess from "../Components/guess";

function Curdle() {
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [lettersGuessed, setLettersGuessed] = useState({});
  let alphabet = "qwertyuiopasdfghjklzxcvbnm";
  useEffect(() => {
    alphabet.split("").forEach((letter) => {
      setLettersGuessed((lettersGuessed) => {
        return { ...lettersGuessed, [letter]: 3 };
      });
    });
  }, []);
  useEffect(() => {
    console.log(lettersGuessed);
  }, [lettersGuessed]);

  let word = "colby";
  function game(guess, secret) {
    let bulls = 0;
    let cows = 0;
    let output = [];
    let hashMap = {};
    for (let i = 0; i < secret.length; i++) {
      if (!hashMap[secret[i]]) {
        hashMap[secret[i]] = 1;
      } else {
        hashMap[secret[i]]++;
      }
    }

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === secret[i]) {
        let placeholder = { ...lettersGuessed };
        bulls++;
        if (hashMap[guess[i]] === 0) {
          output[
            output.indexOf(
              output.find((arr) => {
                return arr[0] === guess[i];
              })
            )
          ] = [guess[i], 0];
        }
        hashMap[guess[i]]--;
        output.push([guess[i], 2]);
      } else if (hashMap[guess[i]] > 0) {
        cows++;
        hashMap[guess[i]]--;
        output.push([guess[i], 1]);
      } else {
        let placeholder = { ...lettersGuessed };
        placeholder[guess[i]] = 0;

        output.push([guess[i], 0]);
      }
    }
    let placeholder = { ...lettersGuessed };
    output.forEach((letter) => {
      console.log(letter);

      if (letter[1] === 0 && placeholder[letter[0]] === 3) {
        placeholder[letter[0]] = 0;
      } else if (letter[1] === 2) {
        placeholder[letter[0]] = 2;
      } else if (letter[1] === 1 && placeholder[letter[0]] !== 2) {
        placeholder[letter[0]] = 1;
      }
    });
    setLettersGuessed(placeholder);
    return output;
  }
  return (
    <div>
      <h1
        style={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        Curdle
      </h1>
      <PreviousGuesses guesses={guesses} />
      <Guess
        guess={guess}
        setGuess={setGuess}
        game={game}
        word={word}
        guesses={guesses}
        setGuesses={setGuesses}
      />

      <Keyboard
        setGuess={setGuess}
        guess={guess}
        lettersGuessed={lettersGuessed}
      />
    </div>
  );
}
export default Curdle;
