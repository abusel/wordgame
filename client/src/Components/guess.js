import TextField from "@mui/material/TextField";
import { useState } from "react";

function Guess({
  guess,
  setGuess,
  game,
  word,
  guesses,
  setGuesses,
  submitRef,
  wordbank,
  setInvalid
}) {

  return (
    <div style={{ justifyContent: "center", display: "flex" }}>
      <form
        ref={submitRef}
        onSubmit={(e) => {
          e.preventDefault();
          if (guess.length === 5 && wordbank.has(guess.toLowerCase())) {
            setInvalid(false)
            setGuesses([...guesses, game(guess.toLowerCase(), word)]);
            setGuess("");
          }
          else{
            setInvalid(true)
          }
        }}
      >

        <TextField
          id="outlined-basic"
          label="Guess"
          variant="outlined"
          value={guess}
          onChange={(e) => {
            if (e.target.value.length <= 5) {
              setGuess(e.target.value);
            }
          }}
        />
      </form>
    </div>
  );
}
export default Guess;
