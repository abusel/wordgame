import TextField from "@mui/material/TextField";

function Guess({ guess, setGuess, game, word, guesses, setGuesses }) {
  return (
    <div style={{ justifyContent: "center", display: "flex" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (guess.length === 5) {
            setGuesses([...guesses, game(guess, word)]);
            setGuess("");
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
