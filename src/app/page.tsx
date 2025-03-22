'use client'
import { useEffect, useRef, useState } from 'react'
import { Model } from './model'
import { Coordinate } from './model'
import { config1, config2, config3 } from './puzzle'
import { Instructions} from './instructions'

export default function Home() {

  const [model, setModel] = useState(new Model(0));
  const [redraw, forceRedraw] = useState(0);
  const [history, setHistory] = useState([new Model(0)]);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const squareRef = useRef<HTMLButtonElement>(null);

  // Allows for arrows to be used upon loading
  useEffect(() => {
    if (squareRef.current) {
      squareRef.current.focus();
    }
  }, []);

  function showNotification(message: string) {
    setNotification(message);

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }

  // helper function that forces React app to redraw whenever this is called.
  function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

  function handleBack() {
    if (history.length <= 1) {
      showNotification("No more moves to undo");
    } else {

      const prevState = history[history.length - 1];

      // Revert plain objects back to Model, Coordinate objects to use methods
      const rehydratedModel = new Model(prevState.currentConfig);
      rehydratedModel.board = prevState.board; // Restore the board
      rehydratedModel.score = prevState.score;
      rehydratedModel.moves = prevState.moves;
      rehydratedModel.found = prevState.found;

      if (prevState.board.selectedSquare) {
        rehydratedModel.board.selectedSquare = new Coordinate(
          prevState.board.selectedSquare.row,
          prevState.board.selectedSquare.column
        );
      }

      setModel(rehydratedModel);
      setHistory(history.slice(0, history.length - 1));
      andRefreshDisplay();
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "z") {
      handleBack();
      return;
    }

    if (event.key === "c") {
      handleCheckSolution();
      return
    }

    if (event.shiftKey) {
      switch (event.key) {
        case "ArrowUp":
          handleShiftArrow("up");
          break;
        case "ArrowDown":
          handleShiftArrow("down");
          break;
        case "ArrowLeft":
          handleShiftArrow("left");
          break;
        case "ArrowRight":
          handleShiftArrow("right");
          break;
        default:
          break;
      }
    } else {
      switch (event.key) {
        case "ArrowUp":
          handleArrow("up");
          break;
        case "ArrowDown":
          handleArrow("down");
          break;
        case "ArrowLeft":
          handleArrow("left");
          break;
        case "ArrowRight":
          handleArrow("right");
          break;
        default:
          break;
      }
    }
  }

  function handleShiftArrow(direction: string) {
    
    let r = model.board.selectedSquare!.getRow()
    let c = model.board.selectedSquare!.getCol()

    if(direction === "up"){
      if(r - 1 >= 0){
        model.board.selectedSquare = new Coordinate(r - 1, c);
      }
    }
    if(direction === "down"){
      if(r + 1 <= 4){
        model.board.selectedSquare = new Coordinate(r + 1, c);
      }
    }
    if(direction === "left"){
      if(c - 1 >= 0){
        model.board.selectedSquare = new Coordinate(r, c - 1);
      }
    }
    if(direction === "right"){
      if(c + 1 <= 4){
        model.board.selectedSquare = new Coordinate(r, c + 1);
      }
    }
    r = model.board.selectedSquare!.getRow()
    c = model.board.selectedSquare!.getCol()
    andRefreshDisplay()
  }

  function handleArrow(direction: string) {
    if (model.board.selectedSquare === undefined) {
      showNotification("Select a square first")
      return
    }
    
    let r = model.board.selectedSquare!.getRow()
    let c = model.board.selectedSquare!.getCol()

    if (r == undefined || c == undefined) {
      showNotification("Undefined, selected sqaure coordinates")
      return
    }

    if(direction === "up"){
      if(r - 1 < 0 || model.board.letters[r - 1][c] === undefined || model.board.letters[r - 1][c] === ""){
        showNotification("Out of bounds")
        return
      }
      let updated = model.board.letters[r][c] + model.board.letters[r - 1][c]
      if(updated.length > 6){
        return
      }
      setHistory([...history, JSON.parse(JSON.stringify(model))]);
      model.board.letters[r - 1][c] = model.board.letters[r][c] + model.board.letters[r - 1][c]
      model.board.letters[r][c] = ""
      model.board.selectedSquare = new Coordinate(r - 1, c)
    }
    if(direction === "down"){
      if(r + 1 > 4 || model.board.letters[r + 1][c] === undefined || model.board.letters[r + 1][c] === ""){
        showNotification("Out of bounds")
        return
      }
      let updated = model.board.letters[r][c] + model.board.letters[r + 1][c]
      if(updated.length > 6){
        return
      }
      setHistory([...history, JSON.parse(JSON.stringify(model))]);
      model.board.letters[r + 1][c] = model.board.letters[r][c] + model.board.letters[r + 1][c]
      model.board.letters[r][c] = ""
      model.board.selectedSquare = new Coordinate(r + 1, c)
    }
    if(direction === "left"){
      if(model.board.letters[r][c - 1] === undefined || model.board.letters[r][c - 1] === ""){
        showNotification("Out of bounds")
        return
      }
      let updated = model.board.letters[r][c] + model.board.letters[r][c - 1]
      if(updated.length > 6){
        return
      }
      setHistory([...history, JSON.parse(JSON.stringify(model))]);
      model.board.letters[r][c - 1] = model.board.letters[r][c] + model.board.letters[r][c - 1]
      model.board.letters[r][c] = ""
      model.board.selectedSquare = new Coordinate(r, c - 1)
    }
    if(direction === "right"){
      if(model.board.letters[r][c + 1] === undefined || model.board.letters[r][c + 1] === ""){
        showNotification("Out of bounds")
        return
      }
      let updated = model.board.letters[r][c] + model.board.letters[r][c + 1]
      if(updated.length > 6){
        return
      }
      setHistory([...history, JSON.parse(JSON.stringify(model))]);
      model.board.letters[r][c + 1] = model.board.letters[r][c] + model.board.letters[r][c + 1]
      model.board.letters[r][c] = ""
      model.board.selectedSquare = new Coordinate(r, c + 1)
    }
    model.moves += 1
    updateScore()

    r = model.board.selectedSquare!.getRow()
    c = model.board.selectedSquare!.getCol()
    andRefreshDisplay()
  }

  function updateScore() {
    let configNum = model.currentConfig + 1
    let config
    if(configNum === 1){
      config = config1
    }else if(configNum === 2){
      config = config2
    }else{
      config = config3
    }
    let score = 0
    for(let r = 0; r < 5; r++){
      for(let c = 0; c < 5; c++){
        let subString = model.board.letters[r][c]
        if (subString.length < 2){
          continue
        }
        for(let word of config.words){
          if (word.includes(subString)){
            score += subString.length
          }

        }
        if(config.words.includes(subString) && !model.found.includes(subString)){
          model.found.push(subString)
        }
      }
      model.score = score
    }
  }

  function handleReset() {
    model.reset(model.currentConfig)
    andRefreshDisplay()
  }

  function handleChangeConfig(which: number){
    model.reset(which)
    andRefreshDisplay()
  }

  function handleClick(row:number, column:number) {
    if(model.board.letters[row][column] === ""){
      model.board.selectedSquare = undefined
      andRefreshDisplay()
      return
    }
    model.board.selectedSquare = new Coordinate(row, column)
    andRefreshDisplay()
  }

  function handleCheckSolution(){
    if(model.score === 25 && model.found.length === 5){
      showNotification("Puzzle Solved");
    }
    else{
      showNotification("Puzzle Incomplete");
    }
  }

  // change the style for the given square based on model. Space separated string
  // So "square" is a regular square, while "square selected" is a selected square
  function css(row:number, column:number) {

    if (model.board.selectedSquare?.equals(new Coordinate(row, column))) {
      return "square selected"
    }
    return "square"
  }

  return (
    instructionsOpen ? (
      <div className="vertical-container">
        <h1>Wordfold</h1>
        <button className="menu-button" onClick={() => setInstructionsOpen(false)}>Back to the game</button>
        <Instructions /> 
        </div>
    ): (
      <div className="vertical-container" tabIndex={0} onKeyDown={handleKeyDown}>
        <h1>Wordfold</h1>
        <div className="horizontal-container">
          <button className="menu-button" onClick={() => setInstructionsOpen(true)}>Instructions</button>
          <select className="menu-button" onChange={(e) => handleChangeConfig(Number(e.target.value))}>
            <option value="" disabled>Select a category</option>
            <option value="0">Colors</option>
            <option value="1">Animals</option>
            <option value="2">Fruits</option>
          </select>
          <button className="menu-button" onClick={() => handleBack()}>Undo</button>
          <button className="menu-button" onClick={() => handleReset()}>Reset</button>
          <button className="menu-button" onClick={() => handleCheckSolution()}>Check Solution</button>
        </div>
        <div className="horizontal-container">
          <label className="menu-button">{"Category: " + (model.chosen === 0 ? "Colors" : model.chosen === 1 ? "Animals" : "Fruits")}</label>
          <label className="menu-button">{"Score: " + model.score}</label>
          <label className="menu-button">{"Number of Moves: " + model.moves}</label>
        </div>
        <div className="board">
          <div className="button-container">
            <button data-testid="0,0" className={css(0,0)} onClick={() => handleClick(0, 0)} ref={squareRef}>{model.contents(0,0)}</button>
            <button data-testid="0,1" className={css(0,1)} onClick={() => handleClick(0, 1)}>{model.contents(0,1)}</button>
            <button data-testid="0,2" className={css(0,2)} onClick={() => handleClick(0, 2)}>{model.contents(0,2)}</button>
            <button data-testid="0,3" className={css(0,3)} onClick={() => handleClick(0, 3)}>{model.contents(0,3)}</button>
            <button data-testid="0,4" className={css(0,4)} onClick={() => handleClick(0, 4)}>{model.contents(0,4)}</button>
          </div>
          <div className="button-container">
            <button data-testid="1,0" className={css(1,0)} onClick={() => handleClick(1, 0)}>{model.contents(1,0)}</button>
            <button data-testid="1,1" className={css(1,1)} onClick={() => handleClick(1, 1)}>{model.contents(1,1)}</button>
            <button data-testid="1,2" className={css(1,2)} onClick={() => handleClick(1, 2)}>{model.contents(1,2)}</button>
            <button data-testid="1,3" className={css(1,3)} onClick={() => handleClick(1, 3)}>{model.contents(1,3)}</button>
            <button data-testid="1,4" className={css(1,4)} onClick={() => handleClick(1, 4)}>{model.contents(1,4)}</button>
          </div>
          <div className="button-container">
            <button data-testid="2,0" className={css(2,0)} onClick={() => handleClick(2, 0)}>{model.contents(2,0)}</button>
            <button data-testid="2,1" className={css(2,1)} onClick={() => handleClick(2, 1)}>{model.contents(2,1)}</button>
            <button data-testid="2,2" className={css(2,2)} onClick={() => handleClick(2, 2)}>{model.contents(2,2)}</button>
            <button data-testid="2,3" className={css(2,3)} onClick={() => handleClick(2, 3)}>{model.contents(2,3)}</button>
            <button data-testid="2,4" className={css(2,4)} onClick={() => handleClick(2, 4)}>{model.contents(2,4)}</button>
          </div>
          <div className="button-container">
            <button data-testid="3,0" className={css(3,0)} onClick={() => handleClick(3, 0)}>{model.contents(3,0)}</button>
            <button data-testid="3,1" className={css(3,1)} onClick={() => handleClick(3, 1)}>{model.contents(3,1)}</button>
            <button data-testid="3,2" className={css(3,2)} onClick={() => handleClick(3, 2)}>{model.contents(3,2)}</button>
            <button data-testid="3,3" className={css(3,3)} onClick={() => handleClick(3, 3)}>{model.contents(3,3)}</button>
            <button data-testid="3,4" className={css(3,4)} onClick={() => handleClick(3, 4)}>{model.contents(3,4)}</button>
          </div>
          <div className="button-container">
            <button data-testid="4,0" className={css(4,0)} onClick={() => handleClick(4, 0)}>{model.contents(4,0)}</button>
            <button data-testid="4,1" className={css(4,1)} onClick={() => handleClick(4, 1)}>{model.contents(4,1)}</button>
            <button data-testid="4,2" className={css(4,2)} onClick={() => handleClick(4, 2)}>{model.contents(4,2)}</button>
            <button data-testid="4,3" className={css(4,3)} onClick={() => handleClick(4, 3)}>{model.contents(4,3)}</button>
            <button data-testid="4,4" className={css(4,4)} onClick={() => handleClick(4, 4)}>{model.contents(4,4)}</button>
          </div>
        </div>

        <div>
          <div className="vertical-container">
            <button className="menu-button" onClick={() => handleArrow("up")}>UP</button>
            <div className="horizontal-container">
              <button className="menu-button" onClick={() => handleArrow("left")}>LEFT</button>
              <button className="menu-button" onClick={() => handleArrow("right")}>RIGHT</button>
            </div>
            <button className="menu-button" onClick={() => handleArrow("down")}>DOWN</button>
          </div>
        </div>
        {notification && <div className="notification">{notification}</div>}
      </div>
    )
  )
}