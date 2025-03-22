export function Instructions() {
  return (
    <div className="instruction-container">
      <h2>How to Play</h2>
      <p>
        The goal of the game is to make 5 english words made up of no more than 6 letters within the selected category.<br/>
        Letters are moved from sqaure to square by first selecting a square (yellow) and using an arrow to append the contents of the yellow square to the beginning of the adjascent square in the direction the arrow specified.<br/>
        Once you think you have the solution or have 25 points, press check solution to confirm.<br/>
        The score refers to the number of correct letters in the substrings from the solution words to help you track your progress.      
      </p>
      <h2>Controls</h2>
      <p>
        Use the buttons on screen and click indivudal sqaures or use the keyboard commands below.<br/>
        Arrow keys: Move letters<br/>
        Shift + Arrow keys: Move selected square<br/>
        z: Undo<br/>
        c: Check solution
      </p>
      <h2>Github</h2>
      <p>To see source code and solutions visit these links: </p>
      <a href="https://github.com/awprevite/wordfold" target="_blank" rel="noopener noreferrer">https://github.com/awprevite/wordfold</a><br/>
      <a href="https://youtu.be/AfQYQ5ri6xY" target="_blank" rel="noopener noreferrer">https://youtu.be/AfQYQ5ri6xY</a>
    </div>
  );
}