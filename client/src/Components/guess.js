import TextField from "@mui/material/TextField";
import { useState } from "react";

function Guess({ guess, setGuess }) {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(guess);
        }}
      >
        <TextField
          id="outlined-basic"
          label="Guess"
          variant="outlined"
          value={guess}
          onChange={(e) => {
            setGuess(e.target.value);
          }}
        />
      </form>
    </div>
  );
}
export default Guess;
