function PreviousGuess({ guess }) {
  let colorObj = {
    0: "black",
    1: "#FFD300",
    2: "green",
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        letterSpacing: "1rem",
      }}
    >
      {guess.map((letter) => {
        return (
          <p style={{ color: colorObj[letter[1]] }}>
            {letter[0].toUpperCase()}
          </p>
        );
      })}
    </div>
  );
}
export default PreviousGuess;
