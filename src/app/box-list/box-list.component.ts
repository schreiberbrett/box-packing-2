import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Box, Action } from 'src/models'

@Component({
    selector: 'app-box-list',
    templateUrl: './box-list.component.html',
    styleUrls: ['./box-list.component.css']
})
export class BoxListComponent {
    @Input()
    boxes: Box[] = []

    @Output()
    edit: EventEmitter<number> = new EventEmitter()

    @Output()
    delete: EventEmitter<number> = new EventEmitter()
}