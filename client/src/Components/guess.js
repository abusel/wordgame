import TextField from "@mui/material/TextField";

function Guess({ guess, setGuess, game, word, guesses, setGuesses }) {
  return (
    <div style={{ justifyContent: "center", display: "flex" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(game(guess, word));
          setGuesses([...guesses, game(guess, word)]);
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
