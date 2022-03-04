import PreviousGuess from "./previousGuess";
import { useEffect } from "react";

function PreviousGuesses({ guesses }) {
  useEffect(() => {
    console.log(guesses);
  }, [guesses]);

  return (
    <div>
      {guesses.map((guess) => {
        console.log(guess);
        return <PreviousGuess guess={guess} />;
      })}
    </div>
  );
}
export default PreviousGuesses;
