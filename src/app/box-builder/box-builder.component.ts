import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Box, range, computeSquareStyle } from 'src/models'

@Component({
    selector: 'app-box-builder',
    templateUrl: './box-builder.component.html',
    styleUrls: ['./box-builder.component.css']
})
export class BoxBuilderComponent {
    @Input()
    id: number

    @Input()
    mode: 'Add' | 'Update' = 'Add'

    @Input()
    box: Box = {
        height: 0,
        width: 0,
        squares: []
    }

    @Output()
    boxChange: EventEmitter<Box> = new EventEmitter()

    occupy(i: number, j: number): void {
        this.box.squares[i][j] = this.id
    }

    occupyLeft(j: number): void {
        this.expandLeft()
        this.occupy(0, j)
    }

    occupyRight(j: number): void {
        this.expandRight()
        this.occupy(this.box.width - 1, j)
    }

    occupyBottom(i: number): void {
        this.expandBottom()
        this.occupy(i, this.box.height - 1)
    }

    occupyTop(i: number): void {
        this.expandTop()
        this.occupy(i, 0)
    }

    occupyTopLeft(): void {
        this.expandTop()
        this.expandLeft()
        this.occupy(0, 0)
    }

    occupyTopRight(): void {
        this.expandTop()
        this.expandRight()
        this.occupy(this.box.width - 1, 0)
    }

    occupyBottomLeft(): void {
        this.expandBottom()
        this.expandLeft()
        this.occupy(0, this.box.height - 1)
    }

    occupyBottomRight(): void {
        this.expandBottom()
        this.expandRight()
        this.occupy(this.box.width - 1, this.box.height - 1)
    }

    unoccupy(i: number, j: number): void {
        if (this.box.height === 1 && this.box.width === 1) {
            this.box = {
                height: 0,
                width: 0,
                squares: []
            }

            return
        }

        this.box.squares[i][j] = 0

        if (i === 0) {
            while (this.firstColumnEmpty()) {
                this.box = {
                    height: this.box.height,
                    width: this.box.width - 1,
                    squares: this.box.squares.slice(1, this.box.width)
                }
            }
        }

        if (i === this.box.width - 1) {
            while (this.lastColumnEmpty()) {
                this.box = {
                    height: this.box.height,
                    width: this.box.width - 1,
                    squares: this.box.squares.slice(0, this.box.width - 1)
                }
            }
        }

        if (j === 0) {
            while (this.firstRowEmpty()) {
                this.box = {
                    height: this.box.height - 1,
                    width: this.box.width,
                    squares: this.box.squares.map(row => row.slice(1, this.box.height))
                }
            }
        }

        if (j === this.box.height - 1) {
            while (this.lastRowEmpty()) {
                this.box = {
                    height: this.box.height - 1,
                    width: this.box.width,
                    squares: this.box.squares.map(row => row.slice(0, this.box.height - 1))
                }
            }
        }
    }

    firstColumnEmpty() {
        for(let j = 0; j < this.box.height; j++) {
            if (this.box.squares[0][j] !== 0) {
                return false
            }
        }

        return true
    }

    lastColumnEmpty() {
        for (let j = 0; j < this.box.height; j++) {
            if (this.box.squares[this.box.width - 1][j] !== 0) {
                return false
            }
        }

        return true
    }

    firstRowEmpty() {
        for (let i = 0; i < this.box.width; i++) {
            if (this.box.squares[i][0] !== 0) {
                return false
            }
        }

        return true
    }

    lastRowEmpty() {
        for (let i = 0; i < this.box.width; i++) {
            if (this.box.squares[i][this.box.height - 1] !== 0) {
                return false
            }
        }

        return true
    }

    computeGridStyle(): {'grid-template-rows': string, 'grid-template-columns': string} {
        return {
            'grid-template-rows': `repeat(${this.box.height + 3}, 80px)`,
            'grid-template-columns': `repeat(${this.box.width + 2}, 80px)`
        }
    }

    computeSquareStyle = computeSquareStyle
    range = range

    expandTop(): void {
        this.box = {
            height: this.box.height + 1,
            width: this.box.width,
            squares: this.box.squares.map(row => [0, ...row])
        }
    }

    expandRight(): void {
        this.box = {
            height: this.box.height,
            width: this.box.width + 1,
            squares: [...this.box.squares, this.range(this.box.height).map(_ => 0)]
        } 
    }

    expandLeft(): void {
        this.box = {
            height: this.box.height,
            width: this.box.width + 1,
            squares: [this.range(this.box.height).map(_ => 0), ...this.box.squares]
        }
    }

    expandBottom(): void {
        this.box = {
            height: this.box.height + 1,
            width: this.box.width,
            squares: this.box.squares.map(row => [...row, 0])
        }
    }

    clear(): void {
        this.box = {
            height: 0,
            width: 0,
            squares: []
        }
    }
}
