import PreviousGuesses from "../Components/previousGuesses";
import Keyboard from "../Components/keyboard";
import { useState, useEffect, useRef } from "react";
import Guess from "../Components/guess";
import { Typography } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogContent } from "@mui/material";
import { Alert } from "@mui/material";

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
  let submitRef = useRef();


  // Settings
  let word = "wheel";
  let hint = "Some say the Romans invented this.  Others would contend they merely reinvented it."
  let maxGuesses = 4


  let win = guesses[guesses.length -1] && guesses[guesses.length -1].reduce((prev, curr) => prev + curr[0], "") == word
  let [wordbank, setWordbank] = useState(new Set()) 
  let [invalid, setInvalid] = useState(false)
  useEffect(()=>{
    wordbank.size === 0 && fetch('https://raw.githubusercontent.com/tabatkins/wordle-list/main/words')
    .then((r) => r.text())
    .then(text  => {
      text.split(/\r?\n/).forEach(line => setWordbank(wordbank => wordbank.add(line)))
    })
    !wordbank.has(word) && setWordbank(wordbank => wordbank.add(word))
  }, [])

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
    <div style={{display: "flex", flexDirection: "column"}}>
      <Dialog open={win}>
        <DialogContent>
          <Alert severity="success">Winner! only {guesses.length} guess{guesses.length > 1 && "es"}</Alert>
        </DialogContent>
      </Dialog>
      <Dialog open={!win && guesses.length === maxGuesses}>
        <DialogContent>
          <Alert severity="error">Tough.. better luck tomorrow!  Today's word was {word}</Alert>
        </DialogContent>
      </Dialog>
      <div style={{
      display: "flex", 
      flexDirection: "row", alignItems: "center",
      justifyContent: "space-between",
      width: "90%", marginLeft: "auto", 
      marginRight: "auto"
      }}>
      <h1
        style={{
          marginLeft: "5%",
        }}
      >
        Curdle
      </h1>
      <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <Typography>Guesses Left</Typography>
        <Typography variant="h3">{maxGuesses - guesses.length}</Typography>
      </div>
      </div>
      
      <PreviousGuesses guesses={guesses} />
      <Guess
        guess={guess}
        setGuess={setGuess}
        game={game}
        word={word}
        guesses={guesses}
        setGuesses={setGuesses}
        submitRef={submitRef}
        wordbank={wordbank}
        setInvalid={setInvalid}
      />
      {invalid && <Alert severity="error" outlined>Invalid Word</Alert>}
      <div>
        <Typography style={{
          marginLeft: "30%",
        }}>Clue <sup>(New!)</sup></Typography>
        <Typography style={{
          marginLeft: "35%",
          marginRight: "35%"
        }}>{hint}</Typography>
      </div>
      <Keyboard
        setGuess={setGuess}
        guess={guess}
        lettersGuessed={lettersGuessed}
        submitRef={submitRef}
      />
    </div>
  );
}
export default Curdle;
