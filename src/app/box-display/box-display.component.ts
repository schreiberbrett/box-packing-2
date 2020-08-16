import { Component, Input } from '@angular/core'
import { Box, range, computeSquareStyle } from 'src/models'

@Component({
    selector: 'app-box-display',
    templateUrl: './box-display.component.html',
    styleUrls: ['./box-display.component.css']
})
export class BoxDisplayComponent {
    @Input()
    box: Box

    computeSquareStyle = computeSquareStyle
    range = range

    computeGridStyle(): {'grid-template-rows': string, 'grid-template-columns': string} {
        return {
            'grid-template-rows': `repeat(${this.box.height}, 20px)`,
            'grid-template-columns': `repeat(${this.box.width}, 20px)`
        }
    }
}