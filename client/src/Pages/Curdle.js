import PreviousGuesses from "../Components/previousGuesses";
import { useState } from "react";
import Guess from "../Components/guess";

function Curdle() {
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  let word = "queso";
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
        bulls++;
        if (hashMap[guess[i]] === 0) {
          console.log(output);
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
        output.push([guess[i], 0]);
      }
    }

    return output;
  }
  game(word, "ought");
  return (
    <div>
      <h1 style={{ justifyContent: "center", display: "flex" }}>Curdle</h1>
      <PreviousGuesses guesses={guesses} />
      <Guess
        guess={guess}
        setGuess={setGuess}
        game={game}
        word={word}
        guesses={guesses}
        setGuesses={setGuesses}
      />
    </div>
  );
}
export default Curdle;
