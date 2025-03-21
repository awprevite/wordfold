'use client'
import React from 'react'
import { Model } from './model'
import { Coordinate } from './model'
import { config1, config2, config3 } from './puzzle'

export default function Home() {
  // initial instantiation of the Model comes from the first configuration
  const [model, setModel] = React.useState(new Model(0))
  const [redraw, forceRedraw] = React.useState(0)

  // helper function that forces React app to redraw whenever this is called.
  function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

  function handleArrow(direction: string) {
    if (model.board.selectedSquare === undefined) {
      alert("Select a square first")
      return
    }
    
    let r = model.board.selectedSquare!.getRow()
    let c = model.board.selectedSquare!.getCol()

    if (r == undefined || c == undefined) {
      alert("Undefined, selected sqaure coordinates")
      return
    }

    if(direction === "up"){
      if(r - 1 < 0 || model.board.letters[r - 1][c] === undefined || model.board.letters[r - 1][c] === ""){
        alert("Out of bounds")
        return
      }
      let updated = model.board.letters[r][c] + model.board.letters[r - 1][c]
      if(updated.length > 6){
        return
      }
      model.board.letters[r - 1][c] = model.board.letters[r][c] + model.board.letters[r - 1][c]
      model.board.letters[r][c] = ""
      model.board.selectedSquare = new Coordinate(r - 1, c)
    }
    if(direction === "down"){
      if(r + 1 > 4 || model.board.letters[r + 1][c] === undefined || model.board.letters[r + 1][c] === ""){
        alert("Out of bounds")
        return
      }
      let updated = model.board.letters[r][c] + model.board.letters[r + 1][c]
      if(updated.length > 6){
        return
      }
      model.board.letters[r + 1][c] = model.board.letters[r][c] + model.board.letters[r + 1][c]
      model.board.letters[r][c] = ""
      model.board.selectedSquare = new Coordinate(r + 1, c)
    }
    if(direction === "left"){
      if(model.board.letters[r][c - 1] === undefined || model.board.letters[r][c - 1] === ""){
        alert("Out of bounds")
        return
      }
      let updated = model.board.letters[r][c] + model.board.letters[r][c - 1]
      if(updated.length > 6){
        return
      }
      model.board.letters[r][c - 1] = model.board.letters[r][c] + model.board.letters[r][c - 1]
      model.board.letters[r][c] = ""
      model.board.selectedSquare = new Coordinate(r, c - 1)
    }
    if(direction === "right"){
      if(model.board.letters[r][c + 1] === undefined || model.board.letters[r][c + 1] === ""){
        alert("Out of bounds")
        return
      }
      let updated = model.board.letters[r][c] + model.board.letters[r][c + 1]
      if(updated.length > 6){
        return
      }
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
    //Success or Failure
    if(model.score === 25 && model.found.length === 5){
      alert("Puzzle Completed Successfully")
    }
    else{
      alert("Puzzle Failed")
    }
  }

  // change the style for the given square based on model. Space separated string.
  // So "square" is a regular square, while "square selected" is a selected square. Find
  // these CSS definitions inside the global.css file
  function css(row:number, column:number) {

    if (model.board.selectedSquare?.equals(new Coordinate(row, column))) {
      return "square selected"
    }
    return "square"
  }

  return (
    <div>
      <div className="board">
        <div className="button-container">
          <button data-testid="0,0" className={css(0,0)} onClick={() => handleClick(0, 0)}>{model.contents(0,0)}</button>
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
        <div className="button-container">
          <button className="arrowUp" onClick={() => handleArrow("up")}>UP</button>
          <button className="arrowDown" onClick={() => handleArrow("down")}>DOWN</button>
          <button className="arrowLeft" onClick={() => handleArrow("left")}>LEFT</button>
          <button className="arrowRight" onClick={() => handleArrow("right")}>RIGHT</button>
          </div>
      </div>

      <div>
        <button className="reset" onClick={() => handleReset()}>Reset</button>
        <button className="config1" onClick={() => handleChangeConfig(0)}>Colors</button>
        <button className="config2" onClick={() => handleChangeConfig(1)}>Animals</button>
        <button className="config3" onClick={() => handleChangeConfig(2)}>Fruits</button>
        <button className="check" onClick={() => handleCheckSolution()}>Check Solution</button>
      </div>
     
      <label className="score">{"Score: " + model.score}</label>
      <label className="numMoves">{"Number of Moves: " + model.moves}</label>

    </div>
  )
}