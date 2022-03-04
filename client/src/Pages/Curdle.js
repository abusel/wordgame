import TextField from "@mui/material/TextField";
import PreviousGuess from "../Components/previousGuess";
import { useState } from "react";
import Guess from "../Components/guess";

function Curdle() {
  const [guess, setGuess] = useState("");
  let word = "queso";
  return (
    <div>
      <h1>Curdle</h1>
      <PreviousGuess guess={guess} />
      <Guess guess={guess} setGuess={setGuess} />
    </div>
  );
}
export default Curdle;
