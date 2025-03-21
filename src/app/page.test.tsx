import { expect, test } from 'vitest'
import { render, fireEvent, cleanup } from '@testing-library/react'

import React from 'react'
import Home from './page'
import { Model } from './model'

// to write this kind of test, we need to be able to render canvas, so we need 
// to simply run (once) npm install canvas. Tricky for GUI but these have to 
// be async functions that are cleaned up afterwards. Only for REACT gui
/*
test('Home', async () => {
  const { getByText, getByTestId } = render(<Home />)
  const scoresElement = getByText(/Score:/i);     // scrape text that should be there...

  const b00 = getByTestId('0,0')
  expect(b00.textContent).toBe("E")

  cleanup()
})
*/
test('Move', async() => {
  const { getByText, getByTestId } = render(<Home />)

  let m:Model = new Model(0)
  const b00 = getByTestId("0,0")
  const b10 = getByTestId("1,0")
  const bup = getByText("UP")
  const score = getByText(/Score:/i)
  const moves = getByText(/Moves:/i)
  expect(b00.textContent).toBe("E")
  fireEvent.click(b10)
  fireEvent.click(bup)
  cleanup()
  expect(b00.textContent).toBe("YE")
  expect(b10.textContent).toBe("")
  expect(score.textContent).toBe("Score: 2")
  expect(moves.textContent).toBe("Number of Moves: 1")
}
)

test('Reset', async() => {
  const { getByText, getByTestId } = render(<Home />)
  let m:Model = new Model(0)
  const b00 = getByTestId("0,0")
  const b10 = getByTestId("1,0")
  const b01 = getByTestId("0,1")
  const bup = getByText("UP")
  const bdown = getByText("DOWN")
  const bright = getByText("RIGHT")
  const bleft = getByText("LEFT")
  const reset = getByText("Reset")
  const fruits = getByText("Fruits")
  const animals = getByText("Animals")

  //check reset after move for intial config
  fireEvent.click(b10)
  fireEvent.click(bup)
  fireEvent.click(reset)
  expect(b00.textContent).toBe("E")
  expect(b10.textContent).toBe("Y")

  //check config change
  fireEvent.click(fruits)
  expect(b00.textContent).toBe("H")

  //check reset after move for changed config
  fireEvent.click(b00)
  fireEvent.click(bdown)

  expect(b00.textContent).toBe("")
  expect(b10.textContent).toBe("HY")
  fireEvent.click(reset)
  expect(b00.textContent).toBe("H")
  expect(b10.textContent).toBe("Y")

  //last congif change
  fireEvent.click(animals)
  expect(b00.textContent).toBe("E")

  //right button
  fireEvent.click(b00)
  fireEvent.click(bright)
  expect(b00.textContent).toBe("")
  expect(b01.textContent).toBe("EK")

  //left button
  fireEvent.click(reset)
  fireEvent.click(b01)
  fireEvent.click(bleft)
  expect(b01.textContent).toBe("")
  expect(b00.textContent).toBe("KE")

  cleanup()
})