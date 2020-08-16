import { Component, OnInit } from '@angular/core';
import { Box, Maybe, solve, pack, range } from 'src/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  boxes: Box[] = []

  mode: 'Add' | 'Update' = 'Add'

  workingBox: Box = {
    height: 0,
    width: 0,
    squares: []
  }

  workingIndex = 0


  solution: Maybe<Box> = {kind: 'Nothing'}
  solutionState: 'Loading' | 'Done' = 'Done'

  solutionWidth: number = 1
  solutionHeight: number = 1

  createOrUpdate(box: Box) {
    if (this.mode === 'Add') {
      this.boxes = [...this.boxes, box]
      this.workingIndex++
    } else {
      this.boxes[this.workingIndex] = box
      this.mode = 'Add'
      this.workingIndex = this.boxes.length
    }

    this.workingBox = {
      height: 0,
      width: 0,
      squares: []
    }
  }

  edit(index: number) {
    this.mode = 'Update'
    this.workingBox = this.boxes[index]
    this.workingIndex = index
  }

  delete(index: number) {
    this.boxes.splice(index, 1)
  }

  solve() {
    let solutionSpace: Box = {
      width: this.solutionWidth,
      height: this.solutionHeight,
      squares: range(this.solutionWidth).map(_ => range(this.solutionHeight).map(_ => 0))
    }

    this.solution = pack(solutionSpace, this.boxes)
  }

  solveIgnoreBoxSize() {
    this.solution = solve(this.boxes)
  }
}
