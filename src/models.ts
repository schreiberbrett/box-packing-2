export type Box = {
    width: number
    height: number
    squares: number[][]
}

export function range(n: number): number[] {
    let result = []
    for (let i = 0; i < n; i++) {
        result.push(i)
    }

    return result
}


export function computeSquareStyle(box: Box, i: number, j: number): {'background-color': string, 'border-top': string, 'border-bottom': string, 'border-left': string, 'border-right': string} {
    return {
        'background-color': box.squares[i][j] === 0 ? 'white' : lookupColor(box.squares[i][j]),
        'border-top': `${(j === 0 || box.squares[i][j] !== box.squares[i][j - 1]) ? 3 : 0}px solid black`,
        'border-bottom': `${j === box.height - 1 || box.squares[i][j] !== box.squares[i][j + 1] ? 3 : 0 }px solid black`,
        'border-left': `${(i === 0 || box.squares[i][j] !== box.squares[i - 1][j]) ? 3 : 0 }px solid black`,
        'border-right': `${(i === box.width - 1 || box.squares[i][j] !== box.squares[i + 1][j]) ? 3 : 0 }px solid black`,
    }
}

function lookupColor(id: number): string {
    const colors = [
        'pink',
        'lightgreen',
        'lightblue',
        'yellow',
        'orange',
        'purple',
        'goldenrod'
    ]

    return colors[id % colors.length]
}

export type Action = {
    kind: 'Edit' | 'Delete'
    index: number
}

export type Maybe<T> = {
    kind: 'Nothing'
} | {
    kind: 'Just'
    value: T
}

export function solve(boxes: Box[]): Maybe<Box> {
    if (boxes.length === 0) {
        return {
            kind: 'Nothing'
        }
    }

    const minimumWidth = Math.max(...boxes.map(box => box.width))
    const minimumHeight = Math.max(...boxes.map(box => box.height))

    // TODO: Replace 1000 with something better
    for (let i = 0; i < 1000; i++) {
        for (let j = 0; j <= i; j++) {
            const width = minimumWidth + j
            const height = minimumHeight + (i - j)
            const workingBox: Box = {
                width,
                height,
                squares: range(width).map(_ => range(height).map(_ => 0))
            }

            const result = pack(workingBox, boxes)
            if (result.kind === 'Just') {
                return result
            }
        }
    }
}


export function pack(box: Box, boxes: Box[]): Maybe<Box> {
    if (boxes.length === 0) {
        return {
            kind: 'Just',
            value: box
        }
    }

    const [first, ...rest] = boxes

    for (let i = 0; i < first.width; i++) {
        for (let j = 0;  j < first.height; j++) {
            if (canFit(i, j, box, first)) {
                const result = pack(place(i, j, box, first), rest)
                if (result.kind === 'Just') {
                    return result
                }
            }
        }
    }

    return {
        kind: 'Nothing'
    }
}

function place(widthOffset: number, heightOffset: number, outerBox: Box, innerBox: Box): Box {
    let result = {
        height: outerBox.height,
        width: outerBox.width,
        squares: range(outerBox.width).map(_ => range(outerBox.height).map(_ => 0))
    }

    for (let i = 0; i < outerBox.width; i++) {
        for (let j = 0; j < outerBox.height; j++) {
            result.squares[i][j] = outerBox.squares[i][j]
        }
    }

    for (let i = 0; i < innerBox.width; i++) {
        for (let j = 0; j < innerBox.height; j++) {
            let globalI = i + widthOffset
            let globalJ = j + heightOffset

            if (innerBox.squares[i][j] !== 0) {
                result.squares[globalI][globalJ] = innerBox.squares[i][j]
            }
        }
    }

    return result
}

function canFit(widthOffset: number, heightOffset: number, outerBox: Box, innerBox: Box) {
    for (let i = 0; i < innerBox.width; i++) {
        for (let j = 0; j < innerBox.height; j++) {
            let globalI = i + widthOffset
            let globalJ = j + heightOffset

            if (
                globalI >= outerBox.width ||
                globalJ >= outerBox.height ||
                (innerBox.squares[i][j] !== 0 && outerBox.squares[globalI][globalJ] !== 0)
            ) {
                return false
            }
        }
    }

    return true
}

function maxBy<T>(array: T[], fn: (t: T) => number): T {
    let maximumIndex = 0
    let maximumNumber = fn(array[0])

    for(let i = 1; i < array.length; i++) {
        const currentNumber = fn(array[i])
        if (currentNumber > maximumNumber) {
            maximumNumber = currentNumber
            maximumIndex = i
        }
    }

    return array[maximumIndex]
}

function sumBy<T>(array: T[], fn: (t: T) => number): number {
    let sum = 0

    for (let i = 0; i < array.length; i++) {
        sum += fn(array[i])
    }

    return sum
}