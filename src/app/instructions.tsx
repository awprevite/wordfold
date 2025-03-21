export function Instructions() {
  return (
    <div className="vertical-container">
      <h2>How to Play</h2>
      <p>The goal of the game is to move letters around to create 5 different english words in the selected category.</p><br/>
      <p>Moving letters from one square to another will append the sequence in the selected square to the beginning of the square it is going into.</p>
      <p>The most letters a square or word can contain is 6.</p><br/>
      <p>The score refers to the number of correct letters in the substrings from the solution words.</p>
      <h2>Controls</h2>
      <p>The game can be played by using the onscreen buttons or by using key strokes.</p><br/>
      <p>z: Undo</p><br/>
      <p>c: Check solution</p><br/>
      <p>Arrow keys: Move letters</p><br/>
      <p>Shift + Arrow keys: Move selected square</p>
      <h2>Github</h2>
      <p>To see source code and solutions visit this page: </p>
      <a href="https://github.com/awprevite/wordfold" target="_blank" rel="noopener noreferrer">https://github.com/awprevite/wordfold</a>
    </div>
  );
}