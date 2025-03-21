import { expect, test } from 'vitest'
import { Model } from './model'
import { Coordinate } from './model'

test('Home1', async () => {
        let m:Model = new Model(0)
        expect(m.board.letters[0][0]).toBe("E")
    }
)
test('Home2', async () => {
    let m:Model = new Model(1)
    expect(m.board.letters[0][0]).toBe("E")
}
)
test('Home3', async () => {
    let m:Model = new Model(2)
    expect(m.board.letters[0][0]).toBe("H")
}
)
test('Coordinate', () => {
    let c1 = new Coordinate(3, 4)
    expect(c1.row).toBe(3)
    expect(c1.column).toBe(4)
}
)